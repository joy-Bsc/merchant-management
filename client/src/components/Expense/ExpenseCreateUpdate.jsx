import React, { Fragment, useEffect } from 'react';
import Store from '../../redux/store/Store';
import { OnChangeExpenseInput } from '../../redux/state-slice/expense-slice';
import { useSelector } from 'react-redux';
import { CreateExpenseRequest, ExpenseTypeDropDownRequest, FillExpenseFormRequest } from '../../APIRequest/ExpenseAPIRequest';
import { useNavigate } from 'react-router-dom';
import { errorToast, isEmail, isEmpty } from '../../helper/FormHelper';
import { useState } from 'react';
const ExpenseCreateUpdate = () => {
    let FormValue = useSelector((state) => state.expense.FormValue);
    let ExpenseTypeDropDown = useSelector((state) => state.expense.ExpenseTypeDropDown);
    console.log("edrop", ExpenseTypeDropDown);
    console.log("FormValue", FormValue);
    
    
    const navigate = useNavigate();
    let[ObjectID,SetObjectID]=useState(0);
    useEffect(() => {
        (async () => {
             await  ExpenseTypeDropDownRequest();
        })();

        
        let params = new URLSearchParams(window.location.search);
        let id = params.get("id");
        if(id!==null){
        SetObjectID(id);
        (async()=>{
            await FillExpenseFormRequest(id);

    })()}
    }, [])

    const SaveChange= async()=>{
        if(isEmpty(FormValue.TypeID)){
            errorToast("Expense Type is required");
        }
        else if(isEmpty(FormValue.Amount===0)){
            errorToast("Expense Amount required");
        }
       
        
        else{
            await CreateExpenseRequest(FormValue,ObjectID);
        
            navigate("/ExpenseListPage")
            
        
        }
        
    
    }
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <h5>Save Expense</h5>
                                    <hr className="bg-light" />
                                    <div className="col-4 p-2">
                                        <label htmlFor="" className="form-label">Expense Name</label>
                                        <select onChange={(e)=>{Store.dispatch(OnChangeExpenseInput({Name:"TypeID",Value:e.target.value}))}} value={FormValue.TypeID} className='form-select form-select-sm'>
                                            <option value="">Expense Type</option>
                                            {Array.isArray(ExpenseTypeDropDown) && ExpenseTypeDropDown.map((item, index) => (
                                            <option key={index.toLocaleString()} value={item._id}>{item.Name}</option>
                                        ))}
                                        </select>
                                        </div>
                                        <div className="col-4 p-2">
                                        <label htmlFor="" className="form-label">Expense Amount</label>
                                            <input onChange={(e)=>{Store.dispatch(OnChangeExpenseInput({Name:"Amount",Value:e.target.value}))}} value={FormValue.Amount} type="number" className="form-control form-control-sm" />
                                        </div>
                                        <div className="col-4 p-2">
                                        <label htmlFor="" className="form-label">Expense Note</label>
                                            <input onChange={(e)=>{Store.dispatch(OnChangeExpenseInput({Name:"Note",Value:e.target.value}))}} value={FormValue.Note} type="text" className="form-control form-control-sm" />
                                        </div>
                                        
                                    </div>
                                    <div className="row">
                                        <div className="col-4 p-4">
                                            <button onClick={SaveChange} className="btn btn-sm my-3 btn-success">Save Changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ExpenseCreateUpdate;