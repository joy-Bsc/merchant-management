const DropDownService = async (req, DataModel,Projection) => {
    try {
        let UserEmail = req.headers.email;
        let data = await DataModel.aggregate([{$match:{UserEmail:UserEmail}},{$project:Projection}]);
        return { status: "success", data: data }
    }
    catch (error) {
        return { status: "fail", data: error }
    }
}
module.exports = DropDownService;