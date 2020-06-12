const validator = require('validator');
const passwordvalidator = require('password-validator');
const isEmpty = require('./isempty');


module.exports = function validateSignupInput(data) {
    let errors = {};

    const passwordschema = new passwordvalidator();
    passwordschema
        .has().uppercase();

    data.username = !isEmpty(data.username) ? data.username : '';
    data.fullname = !isEmpty(data.fullname) ? data.fullname : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';


    if (!validator.isLength(data.username, { min: 4, max: 15 })) {
        errors.username = 'username must be between four(4) and fifteen(15) characters';
    }
    if (validator.isEmpty(data.username)) {
        errors.username = 'username is required';
    }


    if (validator.isEmpty(data.fullname)) {
        errors.fullname = 'fullname is required';
    }


    if (!validator.isEmail(data.email)) {
        errors.email = 'invalid email address';
    }
    if (validator.isEmpty(data.email)) {
        errors.email = 'email is required';
    }


    if (!validator.isLength(data.password, { min: 6, max: 20 })) {
        errors.password = 'password must be between eight(8) and twenty(20) characters';
    }
    if(!passwordschema.validate(data.password)){
        errors.password = 'password must contain at least one uppercase letter'
    }
    if (!validator.equals(data.password, data.password2)) {
        errors.password = 'passwords do not match';
    }
    if (validator.isEmpty(data.password)) {
        errors.password = 'password is required';
    }
    if (validator.isEmpty(data.password2)) {
        errors.password2 = 'confirm password is required';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}