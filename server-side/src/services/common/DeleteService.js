const DeleteService = async (Request, Model) => {
    try {
        // Extract ID and UserEmail from Request
        const DeleteID = Request.params.id;
        const UserEmail = Request.headers['email'];

        // Construct the query object
        const QueryObject = {};
        QueryObject._id = DeleteID;
        QueryObject.UserEmail = UserEmail;

        
        let Delete = await Model.deleteMany(QueryObject);

        if(Delete.deletedCount === 0) {
            return { status: "fail", data: "No document found for deletion" };
        }
        else {
            return { status: "success", data: Delete };
        }
        
    } catch (error) {
        // Return fail status along with the error
        return { status: "fail", data: error };
    }
}

module.exports = DeleteService;
