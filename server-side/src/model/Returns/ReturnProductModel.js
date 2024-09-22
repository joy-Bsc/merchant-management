const mongoose = require('mongoose');
const DataSchema = mongoose.Schema({
    UserEmail:{type:String},
    ReturnID:{type:mongoose.Schema.Types.ObjectId},
    ProductID:{type:mongoose.Schema.Types.ObjectId},
    Quantity:{type:Number},
    UnitCost:{type:Number},
    Total:{type:Number},
    CreatedDate:{type:Date,default:Date.now()}
},{versionKey:false});

const ReturnProductModel = mongoose.model('returnproducts', DataSchema);
module.exports = ReturnProductModel;
