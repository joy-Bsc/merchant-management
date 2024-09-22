const OTPSModel = require('../../model/users/OTPSModel');
const SendEmailUtility = require('../../utility/SendEmailUtility');

const UserVerifyEmailService = async (req, DataModel) => {
    try {
        let email = req.params.email;
        let OTPCode = Math.floor(100000 + Math.random() * 900000);
        let UserCount = await DataModel.aggregate([{ $match: { email: email }}, {$count:"total"} ]);
        if (UserCount.length > 0) {
            //otp insert
            await OTPSModel.create({ email: email, otp: OTPCode});
            let SendEmail = await SendEmailUtility(email, "Your Pin code is: "+OTPCode)
            return { status: "success", data:SendEmail }
        }
            else {
                return { status: "fail", data: "user not found" }
            }
        }
    catch (error) {
        return { status: "fail", data: error }  
    }

    }
module.exports = UserVerifyEmailService;