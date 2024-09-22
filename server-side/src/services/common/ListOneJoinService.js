const ListOneJoinService = async (Request, DataModel, SearchArray, JoinStage) => {
    try {
        let pageNo = Number(Request.params.pageNo) || 1;
        let perPage = Number(Request.params.perPage) || 10;
        let searchValue = Request.params.searchKeyword || "";
        let UserEmail = Request.headers['email'];
        let skipRow = (pageNo - 1) * perPage;

        let pipeline = [
            { $match: { UserEmail: UserEmail } },
            JoinStage,
            {
                $facet: {
                    Total: [{ $count: "count" }],
                    Rows: [{ $skip: skipRow }, { $limit: perPage }]
                }
            }
        ];

        if (searchValue !== "0" && searchValue !== "") {
            pipeline.splice(2, 0, { $match: { $or: SearchArray } });
        }

        let data = await DataModel.aggregate(pipeline);

        return { status: "success", data: data };
    } catch (error) {
        return { status: "fail", data: error.message };
    }
};

module.exports = ListOneJoinService;