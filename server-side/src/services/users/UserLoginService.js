const CreateToken = require('../../utility/CreateToken');
const UserLoginService = async (req, DataModel) => {
    try {
        let data = await DataModel.aggregate([{ $match: req.body }, { $project: { _id:0,email: 1, firstName: 1, lastName: 1,mobile:1,photo:1 } }]);
        if (data.length > 0) {
            let token = await CreateToken(data[0]['email']);
            return { status: "success", token: token,data: data[0] }
        } else {
            return { status: "fail", data: "Invalid Email or Password" }
        }
    }
        catch (error) {
            return { status: "fail", data: error }
        }
    }
    module.exports = UserLoginService;