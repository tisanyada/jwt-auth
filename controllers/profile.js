// validate profile input
const Profile = require('../models/Profile');

const validateProfileInput = require('../validation/profile');
const imageUpload = require('../middlewares/checkfile').imageUpload;
const imageUpdate = require('../middlewares/checkfile').imageUpdate;
const deleteFile = require('../utils/file').deleteFile;


exports.getProfile = (req, res) => {
    Profile.findOne({ 'user': req.user.id })
        .populate('user', ['username', 'email'])
        .then(profile => {
            res.json(profile);
        })
        .catch(err => console.log(err));
}

exports.postCreateProfile = (req, res) => {
    const image = req.file;
    const { fullname, email, phone, address, dateofbirth, nationality, gender } = req.body;
    const { errors, isValid } = validateProfileInput(req.body);
    Profile.findOne({ 'user': req.user.id })
        .then(isProfile => {
            if (isProfile) {
                errors.profile = 'Profile already exists for this user';
                res.status(401).json(errors);
            } else {
                if (!isValid) {
                    return res.status(400).json(errors);
                }
                if (!imageUpload(image)) {
                    errors.image = 'profile image is required or file type is not supported, please upload jpg, jpeg or png';
                    return res.status(400).json(errors);
                }
                const profile = new Profile({
                    user: req.user.id,
                    fullname,
                    email,
                    phone,
                    address,
                    dateofbirth,
                    nationality,
                    gender,
                    avatar: image.path
                });
                profile.save()
                    .then(result => {
                        res.json(result);
                    })
                    .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
}


exports.postUpdateProfile = (req, res) => {
    const image = req.file;
    const { fullname, email, phone, address, dateofbirth, nationality, gender } = req.body;
    const { errors, isValid } = validateProfileInput(req.body);
    Profile.findOne({ 'user': req.user.id })
        .then(profile => {

            if (!isValid) {
                return res.status(400).json(errors);
            }

            profile.fullname = fullname;
            profile.email = email;
            profile.phone = phone;
            profile.address = address;
            profile.dateofbirth = dateofbirth;
            profile.nationality = nationality;
            profile.gender = gender;

            if (!imageUpload(image)) {
                errors.image = 'file type is not supported, please upload jpg, jpeg or png';
                return res.status(400).json(errors);
            } else {
                deleteFile(profile.avatar);
                profile.avatar = image.path;
            }
            return profile.save();
        })
        .then(result => {
            res.json(result);
        })
        .catch(err => console.log(err));
}
