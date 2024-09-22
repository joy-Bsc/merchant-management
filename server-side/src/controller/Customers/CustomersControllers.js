const DataModel = require('../../model/Customers/CustomersModel')
const CreateService = require('../../services/common/CreateService');
const UpdateService = require('../../services/common/UpdateService');
const ListService = require('../../services/common/ListService');
const DropDownService = require('../../services/common/DropDownService');
const DetailsByIDService = require('../../services/common/DetailsByIDService');
const CheckAssociateService = require('../../services/common/CheackAssociateService');
const DeleteService = require('../../services/common/DeleteService');
const SalesModel = require('../../model/Sales/SalesModel');
const mongoose = require('mongoose');

exports.CreateCustomer = async (req, res) => {
    let response = await CreateService(req, DataModel);
    res.status(200).json(response);
}

exports.UpdateCustomer = async (req, res) => {
    let response = await UpdateService(req, DataModel);
    res.status(200).json(response);
}

exports.CustomerList = async (req, res) => {
    let SearchRgx = {$regex: req.params.searchKeyword, $options: 'i'};
    let SearchArray = [{CustomerName:SearchRgx},{Phone:SearchRgx},{Email:SearchRgx},{Address:SearchRgx}];
    let response = await ListService(req, DataModel,SearchArray);
    res.status(200).json(response);
}

exports.CustomerDropDown = async (req, res) => {
    let response = await DropDownService(req, DataModel,{_id:1,CustomerName:1});
    res.status(200).json(response);
}

exports.CustomerDetailsByID = async (req, res) => {
    let response = await DetailsByIDService(req, DataModel);
    res.status(200).json(response);
    }

    exports.DeleteCustomer = async (req, res) => {
        let DeleteID = req.params.id;
        const ObjectID = mongoose.Types.ObjectId;
        let CheckAssociate = await CheckAssociateService({CustomerID: new ObjectID(DeleteID)},SalesModel);
        if(CheckAssociate){
            res.status(200).json({Status:"associate",data:"Associate with Sales"});
        }
        else{
            let response = await DeleteService(req, DataModel);
            res.status(200).json(response);
        }
        }
 
