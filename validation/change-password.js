const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateChangePassword(data) {
    let errors = {};
   
    data.email = !isEmpty(data.email) ? data.email : '';

    data.current_password = !isEmpty(data.current_password) ? data.current_password : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : '';
    
    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }
    if(Validator.isEmpty(data.current_password)) {
        errors.current_password = 'Current Password is required';
    }

    if(!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'Password must have 6 chars';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    if(!Validator.equals(data.password, data.password_confirm)) {
        errors.password_confirm = 'New Password and Confirm Password must match';
    }
    if(Validator.equals(data.password, data.current_password)) {
        errors.current_password = 'Current Password and New Password are not equals';
    }

    if(Validator.isEmpty(data.password_confirm)) {
        errors.password_confirm = 'Password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}