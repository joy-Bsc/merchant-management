const OTPSModel = require('../../model/users/OTPSModel');

const UserResetPassService = async (req, DataModel) => {

        let email = req.body.email;
        let OTPCode = req.body['OTP'];
        let NewPass = req.body['password'];
        let statusUpdate = 1;
        try {
            let OTPUsedCount = await OTPSModel.aggregate([{$match: {email: email, otp: OTPCode, status: statusUpdate}}, {$count: "total"}])
            if(OTPUsedCount.length > 0){
                let PassUpdate = await DataModel.updateOne({ email: email }, { password: NewPass });
                return { status: "success", data: PassUpdate }
            }
            else {
                return { status: "fail", data: "Invalid OTP code" }
            }

        }
        catch (error) {
            return { status: "fail", data: error }
        }
    }
module.exports = UserResetPassService;