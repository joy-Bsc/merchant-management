const ParentModel = require('../../model/Returns/ReturnsModel');
const ChildsModel = require('../../model/Returns/ReturnProductModel');
const CreateParentChildService = require('../../services/common/CreateParentChildService');
const ListOneJoinService = require('../../services/common/ListOneJoinService');
const DeleteParentChildsService = require('../../services/common/DeleteParentChildsService');


exports.CreateReturns= async (req,res)=>{
    let response = await CreateParentChildService(req,ParentModel,ChildsModel,'ReturnID');
    res.status(200).json(response);
}

exports.ReturnsList=async (req, res) => {
    let SearchRgx = {"$regex": req.params.searchKeyword, "$options": "i"}
    let JoinStage={$lookup: {from: "customers", localField: "CustomerID", foreignField: "_id", as: "customers"}};
    let SearchArray=[{Note: SearchRgx},{'customers.Name': SearchRgx},{'customers.Address': SearchRgx},{'customers.Phone': SearchRgx},{'customers.Email': SearchRgx}]
    let Result=await ListOneJoinService(req,ParentModel,SearchArray,JoinStage);
    res.status(200).json(Result)
}

exports.ReturnsDelete=async (req, res) => {
    let response = await DeleteParentChildsService(req,ParentModel,ChildsModel,'ReturnID');
    res.status(200).json(response)
}
