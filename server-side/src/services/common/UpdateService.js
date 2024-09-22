const UpdateService = async (req, DataModel) => {
    try {
        let UserEmail = req.headers.email;
        let id = req.params.id;
        let PostBody = req.body;
        let data = await DataModel.updateOne({ _id: id, UserEmail: UserEmail }, PostBody);
        return { status: "success", data: data }
    }
    catch (error) {
        return { status: "fail", data: error }
    }
}
module.exports = UpdateService;