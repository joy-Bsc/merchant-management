const CheckAssociateService = async (QueryObject, AssociateModel) => {
    try {
        // Use aggregate to match documents based on the QueryObject
        const data = await AssociateModel.aggregate([
            { $match: QueryObject }
        ]);

        // Return true if there are matching documents, false otherwise
        return data.length > 0;
    } catch (error) {
        // Handle any errors and return false
        return false;
    }
}

module.exports = CheckAssociateService;
