const validator = require('validator');
const multer = require('multer');
const isEmpty = require('./isempty');


module.exports = function validateProfileInput(data, image) {
    let errors = {};

    data.fullname = !isEmpty(data.fullname) ? data.fullname : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.phone = !isEmpty(data.phone) ? data.phone : '';
    data.address = !isEmpty(data.address) ? data.address : '';
    data.dateofbirth = !isEmpty(data.dateofbirth) ? data.dateofbirth : '';
    data.nationality = !isEmpty(data.nationality) ? data.nationality : '';
    data.gender = !isEmpty(data.gender) ? data.gender : '';

    if (!validator.isLength(data.fullname, { min: 10, max: 30 })) {
        errors.fullname = 'fullname must be between 10 and 30 characters';
    }
    if (validator.isEmpty(data.fullname)) {
        errors.fullname = 'fullname is required';
    }


    if (!validator.isEmail(data.email)) {
        errors.email = 'invalid email address'
    }
    if (validator.isEmpty(data.email)) {
        errors.email = 'email is required';
    }

    if (validator.isEmpty(data.phone)) {
        errors.phone = 'phone number is required';
    }

    if (validator.isEmpty(data.address)) {
        errors.address = 'address is required';
    }

    if (validator.isEmpty(data.dateofbirth)) {
        errors.dateofbirth = 'date of birth is required';
    }

    if (validator.isEmpty(data.nationality)) {
        errors.nationality = 'nationality is required';
    }

    if (validator.isEmpty(data.gender)) {
        errors.gender = 'gender is required';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}