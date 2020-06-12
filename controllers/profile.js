// validate profile input
const validateProfileInput = require('../validation/profile');
const Profile = require('../models/Profile');
const checkfile = require('../middlewares/checkfile');
const deleteFile = require('../utils/file').deleteFile;


exports.getProfile = (req, res) => {
    Profile.findOne({ 'user': req.user.id })
        .populate('user', ['username', 'email'])
        .then(profile => {
            res.json(profile);
        })
        .catch(err => console.log(err));
}

exports.postCreateAndUpdateProfile = (req, res) => {
    const image = req.file;
    const { fullname, email, phone, address, dateofbirth, nationality, gender } = req.body;
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    if (!checkfile(image)) {
        errors.image = 'image type is not supported, please upload jpg, jpeg or png';
        return res.status(400).json(errors);
        // res.json('image type is not supported, please upload jpg, jpeg or png');
    }
    // image path
    console.log(image.path);
    // create new profile
    Profile.findOne({ 'user': req.user.id })
        .then(isProfile => {
            if (isProfile) {
                // update profile
                isProfile.fullname = fullname;
                isProfile.email = email;
                isProfile.phone = phone;
                isProfile.address = address;
                isProfile.dateofbirth = dateofbirth;
                isProfile.nationality = nationality;
                isProfile.gender = gender;
                if (image) {
                    isProfile.avatar = image.path;
                    deleteFile(isProfile.avatar);
                }
                isProfile.save()
                    .then(result => {
                        res.json(result);
                    })
                    .catch(err => console.log(err));
                // errors.profile = 'Profile already exists for this user';
                // res.status(401).json(errors);
            } else {
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

