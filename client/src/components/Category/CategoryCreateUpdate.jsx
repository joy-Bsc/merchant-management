import React, { Fragment, useEffect } from 'react';
import Store from '../../redux/store/Store';
import { OnChangeCategoryInput } from '../../redux/state-slice/category-slice';
import { useSelector } from 'react-redux';
import { CreateCategoriesRequest, FillCategoriesFormRequest } from '../../APIRequest/CategoryAPIRequest';
import { useNavigate } from 'react-router-dom';
import { errorToast, isEmpty } from '../../helper/FormHelper';
import { useState } from 'react';
const CategoryCreateUpdate = () => {
    let FormValue = useSelector((state) => state.category.FormValue);
    
    const navigate = useNavigate();
    let[ObjectID,SetObjectID]=useState(0);
    useEffect(() => {
        let params = new URLSearchParams(window.location.search);
        let id = params.get("id");
        if(id!==null){
        SetObjectID(id);
        (async()=>{
            await FillCategoriesFormRequest(id);

    })()}
    }, [])

    const SaveChange= async()=>{
        if(isEmpty(FormValue.Name)){
            errorToast(" Name is required");
        }
        
        else{
            await CreateCategoriesRequest(FormValue,ObjectID);
        
            navigate("/CategoryListPage")
            
        
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
                                    <h5>Save Category </h5>
                                    <hr className="bg-light" />
                                    <div className="col-4 p-2">
                                        <label htmlFor="" className="form-label">Categories Name</label>
                                            <input onChange={(e)=>{Store.dispatch(OnChangeCategoryInput({Name:"Name",Value:e.target.value}))}} value={FormValue.Name} type="text" className="form-control form-control-sm" />
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

export default CategoryCreateUpdate;