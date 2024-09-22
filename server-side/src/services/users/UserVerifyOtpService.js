const UserVerifyOtpService = async(req, DataModel) => {
    try {
        let email = req.params.email;
        let OTPCode = req.params.otp;
        let status = 0;
        let statusUpdate = 1;
        let OTPCount = await DataModel.aggregate([
            { $match: { email: email, otp: OTPCode, status: status } },
            { $count: "total" }
        ]);
        if (OTPCount.length > 0 && OTPCount[0].total > 0) {
            let OTPUpdate = await DataModel.updateOne(
                { email: email, otp: OTPCode, status: status },
                { email: email, otp: OTPCode, status: statusUpdate }
            );
            return { status: "success", data: OTPUpdate }
        } else {
            return { status: "fail", data: "Invalid otp code" }
        }
    } catch (error) {
        return { status: "fail", data: error }
    }
}

module.exports = UserVerifyOtpService;
