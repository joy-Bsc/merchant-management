const mongoose = require("mongoose");

const DeleteParentChildsService = async (req, ParentModel, ChildsModel, JoinPropertyName) => {
    const session = await mongoose.startSession();

    try {
        // Begin Transaction
        await session.startTransaction();

        // Parent and Child Deletion
        const DeleteID = req.params.id;
        const UserEmail = req.headers['email'];

        // Query objects for parent and child deletion
        const ChildQueryObject = {
            [JoinPropertyName]: DeleteID,
            UserEmail: UserEmail
        };

        const ParentQueryObject = {
            _id: DeleteID,
            UserEmail: UserEmail
        };

        // First Process: Delete Child Documents
        const ChildsDelete = await ChildsModel.deleteMany(ChildQueryObject).session(session);

        // Second Process: Delete Parent Document
        const ParentDelete = await ParentModel.deleteOne(ParentQueryObject).session(session);

        // Commit Transaction
        await session.commitTransaction();
        session.endSession();

        return { status: "success", Parent: ParentDelete, Childs: ChildsDelete };
    } catch (error) {
        // Rollback Transaction and handle errors
        await session.abortTransaction();
        session.endSession();
        return { status: "fail", data: error.message || "An error occurred during deletion" };
    }
}

module.exports = DeleteParentChildsService;
