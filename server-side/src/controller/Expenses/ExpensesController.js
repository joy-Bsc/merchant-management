const DataModel = require('../../model/Expenses/ExpensesModel');
const CreateService = require('../../services/common/CreateService');
const UpdateService = require('../../services/common/UpdateService');
const ListOneJoinService = require('../../services/common/ListOneJoinService');
const DeleteService = require('../../services/common/DeleteService');
const DetailsByIDService = require('../../services/common/DetailsByIDService');
const ProductsModel = require('../../model/Products/ProductsModel');
const mongoose = require('mongoose');
const CheckAssociateService = require('../../services/common/CheackAssociateService');
exports.CreateExpenses = async (req, res) => {
    let response = await CreateService(req, DataModel);
    res.status(200).json(response);
}

exports.UpdateExpenses = async (req, res) => {
    let response = await UpdateService(req, DataModel);
    res.status(200).json(response);
}

exports.ExpensesList=async (req, res) => {
    let SearchRgx = {"$regex": req.params.searchKeyword, "$options": "i"}
    let SearchArray=[{Note: SearchRgx},{'Type.Name': SearchRgx}]
    let JoinStage= {$lookup: {from: "expensetypes", localField: "TypeID", foreignField: "_id", as: "Type"}}
    let Result=await ListOneJoinService(req,DataModel,SearchArray,JoinStage);
    res.status(200).json(Result)
}

exports.ExpenseDetailsByID = async (req, res) => {
    let response = await DetailsByIDService(req, DataModel);
    res.status(200).json(response);
    }
    

    // exports.DeleteExpense = async (req, res) => {
    //     try {
    //         let DeleteID = req.params.id;
    //         const ObjectID =  mongoose.Types.ObjectId;
    //         let CheckAssociate = await CheckAssociateService({ BrandID: new ObjectID(DeleteID) }, ProductsModel);
            
    //         if (CheckAssociate) {
    //             res.status(200).json({ Status: "associate", data: "Associate with Products" });
    //         } else {
    //             let response = await DeleteService(req, DataModel);
    //             res.status(200).json(response);
    //         }
    //     } catch (error) {
    //         res.status(500).json({ Status: "fail", data: error.message });
    //     }
    // }

    exports.DeleteExpense = async (req, res) => {
        let Result = await DeleteService(req, DataModel);
        res.status(200).json(Result)
    }

