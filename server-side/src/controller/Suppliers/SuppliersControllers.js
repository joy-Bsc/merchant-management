const DataModel = require('../../model/Suppliers/SuppliersModel');
const CreateService = require('../../services/common/CreateService');
const UpdateService = require('../../services/common/UpdateService');
const ListService = require('../../services/common/ListService');
const DropDownService = require('../../services/common/DropDownService');
const DetailsByIDService = require('../../services/common/DetailsByIDService');
const CheckAssociateService = require('../../services/common/CheackAssociateService');
const DeleteService = require('../../services/common/DeleteService');
const PurchasesModel = require('../../model/Purchases/PurchasesModel');
const mongoose = require('mongoose');

exports.CreateSuppliers = async (req, res) => {
let response = await CreateService(req, DataModel);
res.status(200).json(response);
}

exports.UpdateSuppliers = async (req, res) => {
let response = await UpdateService(req, DataModel);
res.status(200).json(response);
}

exports.SuppliersList = async (req, res) => {
let SearchRgx = {$regex: req.params.searchKeyword, $options: 'i'};
let SearchArray = [{Name:SearchRgx},{Phone:SearchRgx},{Email:SearchRgx},{Address:SearchRgx}];
let response = await ListService(req, DataModel,SearchArray);
res.status(200).json(response);
}


exports.SuppliersDropDown = async (req, res) => {
let response = await DropDownService(req, DataModel,{_id:1,Name:1});
res.status(200).json(response);
}

exports.SuppliersDetailsByID = async (req, res) => {
    let response = await DetailsByIDService(req, DataModel);
    res.status(200).json(response);
    }

    exports.DeleteSupplier=async (req, res) => {
        let DeleteID=req.params.id;
        const ObjectId = mongoose.Types.ObjectId;
        let CheckAssociate= await CheckAssociateService({SupplierID: new ObjectId(DeleteID)},PurchasesModel);
        if(CheckAssociate){
            res.status(200).json({status: "associate", data: "Associate with Purchases"})
        }
        else{
            let Result=await DeleteService(req,DataModel);
            res.status(200).json(Result)
        }
    } 
