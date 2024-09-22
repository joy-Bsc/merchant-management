const CreateService = async (req, DataModel) => {
    try {
        let PostBody = req.body;
        PostBody.UserEmail = req.headers.email;

        
        
        let data = await DataModel.create(PostBody);
        return { status: "success", data: data }
    }
    catch (error) {
        console.log(error);
        return { status: "fail", data: error }
        
        
    }
}
module.exports = CreateService;