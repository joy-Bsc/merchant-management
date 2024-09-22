const DataModel = require('../../model/users/UsersModel');
const OTPSModel = require('../../model/users/OTPSModel');
const UserCreateService = require('../../services/Users/UserCreateService');
const UserLoginService = require('../../services/Users/UserLoginService');
const UserUpdateService = require('../../services/Users/UserUpdateService');
const UserDetailsService = require('../../services/Users/UserDetailsService');
const UserResetPassService = require('../../services/Users/UserResetPassService');
const UserVerifyOtpService = require('../../services/Users/UserVerifyOtpService');
const UserVerifyEmailService = require('../../services/Users/UserVerifyEmailService');

exports.Registration = async (req, res) => {
    let response = await UserCreateService(req, DataModel);
    res.status(200).send(response);
}

exports.Login = async (req, res) => {
    let response = await UserLoginService(req, DataModel);
    res.status(200).send(response);
}

exports.ProfileUpdate = async (req, res) => {
    let response = await UserUpdateService(req, DataModel);
    res.status(200).send(response);
}

exports.ProfileDetails = async (req, res) => {
    let response = await UserDetailsService(req, DataModel);
    res.status(200).send(response);
}

exports.RecoverResetPassword = async (req, res) => {
    let response = await UserResetPassService(req, DataModel);
    res.status(200).send(response);
}

exports.RecoverVerifyOtp = async (req, res) => {
    let response = await UserVerifyOtpService(req, OTPSModel);
    res.status(200).send(response);
}

exports.RecoverVerifyEmail = async (req, res) => {
    let response = await UserVerifyEmailService(req, DataModel);
    res.status(200).send(response);
}
