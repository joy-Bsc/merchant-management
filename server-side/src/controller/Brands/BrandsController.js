const DataModel = require('../../model/Brands/BrandsModel');
const CreateService = require('../../services/common/CreateService');
const UpdateService = require('../../services/common/UpdateService');
const ListService = require('../../services/common/ListService');
const DropDownService = require('../../services/common/DropDownService');
const DetailsByIDService = require('../../services/common/DetailsByIDService');
const { default: mongoose } = require('mongoose');
const CheckAssociateService = require('../../services/common/CheackAssociateService');
const ProductsModel = require('../../model/Products/ProductsModel');
const DeleteService = require('../../services/common/DeleteService');

exports.CreateBrand = async (req, res) => {
let response = await CreateService(req, DataModel);
res.status(200).json(response);
}

exports.UpdateBrand = async (req, res) => {
let response = await UpdateService(req, DataModel);
res.status(200).json(response);
}

exports.BrandList = async (req, res) => {
let SearchRgx = {$regex: req.params.searchKeyword, $options: 'i'};
let SearchArray = [{Name:SearchRgx}];
let response = await ListService(req, DataModel,SearchArray);
res.status(200).json(response);
}

exports.BrandDropDown = async (req, res) => {
let response = await DropDownService(req, DataModel,{_id:1,Name:1});
res.status(200).json(response);
}

exports.BrandDetailsByID = async (req, res) => {
    let response = await DetailsByIDService(req, DataModel);
    res.status(200).json(response);
    }

exports.DeleteBrand = async (req, res) => {
    let DeleteID = req.params.id;
    const ObjectID = mongoose.Types.ObjectId;
    let CheckAssociate = await CheckAssociateService({BrandID: new ObjectID(DeleteID)},ProductsModel);
    if(CheckAssociate){
        res.status(200).json({Status:"associate",data:"Associate with Products"});
    }
    else{
        let response = await DeleteService(req, DataModel);
        res.status(200).json(response);
    }
    }   
    


