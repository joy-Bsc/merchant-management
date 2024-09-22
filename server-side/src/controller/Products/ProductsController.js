const DataModel = require('../../model/Products/ProductsModel');
const CheckAssociateService = require('../../services/common/CheackAssociateService');
const CreateService = require('../../services/common/CreateService');
const DeleteService = require('../../services/common/DeleteService');
const DetailsByIDService = require('../../services/common/DetailsByIDService');
const DropDownService = require('../../services/common/DropDownService');
const ListTwoJoinService = require('../../services/common/ListTwoJoinService');
const UpdateService = require('../../services/common/UpdateService');
const ReturnProductsModel = require('../../model/Returns/ReturnProductModel');
const PurchaseProductsModel = require('../../model/Purchases/PurchaseProductsModel');
const SaleProductsModel = require('../../model/Sales/SaleProductsModel');
const mongoose = require('mongoose');

exports.CreateProducts = async (req, res) => {
    let response = await CreateService(req, DataModel);
    res.status(200).json(response);
}

exports.UpdateProducts = async (req, res) => {
    let response = await UpdateService(req, DataModel);
    res.status(200).json(response);
}

exports.ProductsList=async (req, res) => {
    let SearchRgx = {"$regex": req.params.searchKeyword, "$options": "i"}
    let JoinStage1={$lookup: {from: "brands", localField: "BrandID", foreignField: "_id", as: "brands"}};
    let JoinStage2= {$lookup: {from: "categories", localField: "CategoryID", foreignField: "_id", as: "categories"}};
    let SearchArray=[{Name: SearchRgx},{Unit: SearchRgx},{Details: SearchRgx},{'brands.Name':SearchRgx},{'categories.Name':SearchRgx}]
    let Result=await ListTwoJoinService(req,DataModel,SearchArray,JoinStage1,JoinStage2);
    res.status(200).json(Result)
}

exports.ProductsDropDown = async (req, res) => {
    let response = await DropDownService(req, DataModel,{_id:1,Name:1});
    res.status(200).json(response);
}

exports.ProductsDetailsByID = async (req, res) => {
    let response = await DetailsByIDService(req, DataModel);
    res.status(200).json(response);
    }

    exports.DeleteProducts = async (req, res) => {
        let DeleteID = req.params.id;
        const ObjectID = mongoose.Types.ObjectId;
        let CheckReturnAssociate= await CheckAssociateService({ProductID:new ObjectID(DeleteID)},ReturnProductsModel);
        let CheckPurchaseAssociate= await CheckAssociateService({ProductID:new ObjectID(DeleteID)},PurchaseProductsModel);
        let CheckSaleAssociate= await CheckAssociateService({ProductID:new ObjectID(DeleteID)},SaleProductsModel);

    if(CheckReturnAssociate){
        res.status(200).json({status: "associate", data: "Associate with Return"})
    }
    else if(CheckPurchaseAssociate){
        res.status(200).json({status: "associate", data: "Associate with Purchase"})
    }
    else if(CheckSaleAssociate){
        res.status(200).json({status: "associate", data: "Associate with Sale"})
    }
    else{
        let Result=await DeleteService(req,DataModel);
        res.status(200).json(Result)
    }
        }
    

