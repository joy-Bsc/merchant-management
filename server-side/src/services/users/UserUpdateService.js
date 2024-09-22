const UserUpdateService = async (req, DataModel) => {
    try {
        let data = await DataModel.updateOne({ email: req.headers.email }, req.body);
        return { status: "success", data: data }
    } catch (error) {
        return { status: "fail", data: error }
    }
}

module.exports = UserUpdateService;
