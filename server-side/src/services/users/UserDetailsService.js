const UserDetailsService = async(req,DataModel) => {
    try {
        let data = await DataModel.aggregate([{$match:{email:req.headers['email']}}]);
        return {status: "success", data: data}

    } catch (error) {
        return {status: "fail", data: error}
    }
}
module.exports=UserDetailsService;