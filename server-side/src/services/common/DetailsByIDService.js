const mongoose = require("mongoose");

const DetailsByIDService = async (Request, DataModel) => {
    try {
        // Extract ID and UserEmail from Request
        const DetailsID = Request.params.id;
        const UserEmail = Request.headers['email'];

        // Convert ID to ObjectId
        const ObjectId = mongoose.Types.ObjectId;

        // Construct the query object
        const QueryObject = {};
        QueryObject._id = new ObjectId(DetailsID);
        QueryObject.UserEmail = UserEmail;

        // Use aggregate to match the query object
        const data = await DataModel.aggregate([
            { $match: QueryObject }
        ]);

        // Return success status along with the retrieved data
        return { status: "success", data: data };
    } catch (error) {
        // Return fail status along with the error
        console.log(error);
        
        return { status: "fail", data: error };
    }
}

module.exports = DetailsByIDService;
