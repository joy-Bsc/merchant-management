import React, { Fragment, useEffect, useRef } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCartCheck } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { CreateSaleRequest, CustomerDropDownRequest, ProductDropDownRequest } from '../../APIRequest/SaleAPIRequest';
import { errorToast, isEmpty } from '../../helper/FormHelper';
import Store from '../../redux/store/Store';
import { OnChangeSaleInput, RemoveSaleItem, SetSaleItemList } from '../../redux/state-slice/sale-slice';
import { useNavigate } from 'react-router-dom';
const SalesCreateUpdate = () => {
    let productRef,qtyRef,unitPriceRef = useRef(null);

    let SaleFormValues = useSelector((state) => state.sale.SaleFormValues);
    let CustomerDropDown = useSelector((state) => state.sale.CustomerDropDown);
    let ProductDropDown = useSelector((state) => state.sale.ProductDropDown);
    let SaleItemList = useSelector((state) => state.sale.SaleItemList);
    const navigate = useNavigate();

     useEffect(() => {
        (async () => {
             await  CustomerDropDownRequest();
        })();

        (async () => {
             await  ProductDropDownRequest();
        })();
    }, [])

    const OnAddCart=()=>{
        let productValue = productRef.value;
        let qtyValue = qtyRef.value;
        let unitPriceValue = unitPriceRef.value;
        let productName = productRef.selectedOptions[0].text;
        
        if(isEmpty(productValue)){
            errorToast("Product is required");
        }
        else if(isEmpty(qtyValue)){
            errorToast("Quantity is required");
        }
        else if(isEmpty(unitPriceValue)){
            errorToast("Unit Price is required");
        }
        else{
            let item = {
                "ProductID":productValue,
                "ProductName":productName,
                "Quantity":qtyValue,
                "UnitPrice":unitPriceValue,
                "Total":(parseInt(qtyValue) * parseInt(unitPriceValue))

        }
        Store.dispatch(SetSaleItemList(item));
    }
    }

   
   const CreateNewSale =async()=>{
   let result = await CreateSaleRequest(SaleFormValues,SaleItemList);
    if(result){
         navigate("/SaleListPage");
    }
     
   }
     
    return (
        <Fragment>
            <div className="container-s">
                <div className="row ">
                    <div className="col-12 col-md-4 col-lg-4 md-3"style={{width:'95%'}}>
                        <div className=" card h-100">
                            <div className=" card-body">
                            <div className="row">
                                <h5>Create Sales</h5>
                                <hr className="bg-light" />
                                <div className="col-12 p-1">
                                    <label htmlFor="Customer" className="form-label">Customer</label>
                                    <select onChange={(e)=>{Store.dispatch(OnChangeSaleInput({Name:"CustomerID",Value:e.target.value}))}} className='form-select form-select-sm'style={{ width: '300px' }} name="" id="">
                                        <option value="">Select Customer</option>
                                        {Array.isArray(CustomerDropDown) && CustomerDropDown.map((item, index) => (
                                            <option key={index.toLocaleString()} value={item._id}>{item.CustomerName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-12 p-1">
                                    <label  htmlFor="vat" className="form-label">Vat/Tax</label>
                                    <input onChange={(e)=>{Store.dispatch(OnChangeSaleInput({Name:"VatTax",Value:e.target.value}))}} className='form-control form-control-sm' type="text" />
                                </div>
                                <div className="col-12 p-1">
                                    <label htmlFor="discount" className="form-label">Discount</label>
                                    <input onChange={(e)=>{Store.dispatch(OnChangeSaleInput({Name:"Discount",Value:e.target.value}))}} className='form-control form-control-sm' type="text" />
                                </div>
                                <div className="col-12 p-1">
                                    <label htmlFor="Other cost" className="form-label">Other Cost</label>
                                    <input onChange={(e)=>{Store.dispatch(OnChangeSaleInput({Name:"OtherCost",Value:e.target.value}))}} className='form-control form-control-sm' type="text" />
                                </div>
                                <div className="col-12 p-1">
                                    <label htmlFor="ship" className="form-label">Shipping Cost</label>
                                    <input onChange={(e)=>{Store.dispatch(OnChangeSaleInput({Name:"ShippingCost",Value:e.target.value}))}} className='form-control form-control-sm' type="text" />
                            </div>
                            <div className="col-12 p-1">
                                <label htmlFor="Total" className="form-label">Grand Total</label>
                                <input onChange={(e)=>{Store.dispatch(OnChangeSaleInput({Name:"GrandTotal",Value:e.target.value}))}} className='form-control form-control-sm' type="text" />
                                </div>
                                <div className="col-12 p-1">
                                <label htmlFor="Note" className="form-label">Note</label>
                                <input onChange={(e)=>{Store.dispatch(OnChangeSaleInput({Name:"Note",Value:e.target.value}))}} className='form-control form-control-sm' type="text" />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-4 p-2">
                                    <button onClick={CreateNewSale} className="btn btn-sm my-3 btn-success">Create</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <div className="col-12 col-md-8 col-lg-8 mb-3">
                    <div className="card h-100">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-6 p-1">
                                    <label htmlFor="Product" className="form-label">Select Product</label>
                                    <select ref={(input)=>productRef=input} className='form-select form-select-sm' name="" id="">
                                        <option value="">Select Product</option>
                                        {Array.isArray(ProductDropDown) && ProductDropDown.map((item, index) => (
                                            <option ref={productRef} key={index.toLocaleString()} value={item._id}>{item.Name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-2 p-1">
                                    <label htmlFor="Quantity" className="form-label">Quantity</label>
                                    <input ref={(input)=>qtyRef=input} className='form-control form-control-sm' type="number" />
                            </div>
                            <div className="col-2 p-1">
                                    <label htmlFor="price" className="form-label">Unit Price</label>
                                    <input ref={(input)=>unitPriceRef=input} className='form-control form-control-sm' type="number" />
                            </div>
                            <div className="col-2 p-1">
                                    <label htmlFor="price" className="form-label">Total</label>
                            <button onClick={OnAddCart} className="btn w-100 btn-success btn-sm">
                                <BsCartCheck />
                                </button>
                                </div>     
                           </div>
                           <div className="row">
                            <div className="col-12">
                                <div className="table-responsive table-section">
                                    <table className="table-sm text-center table">
                                        <thead className="sticky-top bg-white">
                                            <tr>
                                                <th>Name</th>
                                                <th>Quantity</th>
                                                <th>Unit Price</th>
                                                <th>Total</th>
                                                <th>Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                           {
                                            SaleItemList.map((item,index)=>(
                                                <tr key={index.toLocaleString()}>
                                                    <td>{item.ProductName}</td>
                                                    <td>{item.Quantity}</td>
                                                    <td>{item.UnitPrice}</td>
                                                    <td>{item.Total}</td>
                                                    <td><button onClick={()=>{Store.dispatch(RemoveSaleItem(index))}} className="btn btn-sm btn-danger"><AiOutlineDelete/></button></td>
                                                </tr>
                                            ))

                                           }
                                        </tbody>
                                    </table>
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


export default SalesCreateUpdate;