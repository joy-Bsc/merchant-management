import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { errorToast, isEmpty } from '../../helper/FormHelper';
import { SalesByDateRequest } from '../../APIRequest/ReportAPIRequest';
import exportFromJSON from 'export-from-json'; // Corrected import statement
import CurrencyFormat from 'react-currency-format';
import moment from 'moment';

const SaleReport = () => {
    const fromRef = useRef();
    const toRef = useRef();
    const DataList = useSelector((state) => state.report.SalesByDateList);

    const CreateReport = async () => {
        const fromRefValue = fromRef.current.value;
        const toRefValue = toRef.current.value;
        if (isEmpty(fromRefValue)) {
            errorToast("From Date is required");
        } else if (isEmpty(toRefValue)) {
            errorToast("To Date is required");
        } else {
            await SalesByDateRequest(fromRefValue, toRefValue);
           
        }
    };

    const OnExport = (exportType, data) => {
        const fileName = 'SaleReport';
        if (data.length > 0) {
            const ReportData = data.map((item) => {
                console.log("Item:", item);
                const categoryName = item.Type[0].Name;
                
                return {
                    "Amount": item.Amount,
                    "Note": item.Note,
                    "Category": categoryName,
                    "Date": moment(item.CreatedDate).format('MMMM Do YYYY')
                };
            });
            exportFromJSON({ data: ReportData, fileName, exportType });
        }
    };

    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-12 mb-13">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <h5>Sale Report by Date</h5>
                                <hr className="bg-light" />
                                <div className="col-4 p-2">
                                    <label htmlFor="fromDate" className="form-label">Date From:</label>
                                    <input ref={fromRef} className='form-control form-control-sm' type="date" id="fromDate" />
                                </div>
                                <div className="col-4 p-2">
                                    <label htmlFor="toDate" className="form-label">Date To:</label>
                                    <input ref={toRef} className='form-control form-control-sm' type="date" id="toDate" />
                                </div>
                                <div className="col-4 p-2">
                                    <button onClick={CreateReport} className="btn btn-sm my-4 btn-success">Create Report</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {DataList.length > 0 ? (
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col">
                                        <h6>Total: {DataList[0]['Total'].length > 0 ? <CurrencyFormat value={DataList[0]['Total'][0]['TotalAmount']} displayType={'text'} thousandSeparator={true} prefix={'$'} /> : 0}</h6>
                                        <button onClick={() => OnExport('csv', DataList[0]['Rows'])} className='btn btn-sm my-2 btn-success mr-10'>Download CSV</button> 
                                        <button onClick={() => OnExport('xls', DataList[0]['Rows'])} className='btn btn-sm my-2 btn-success ml-10'>Download XLS</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col">
                                        <h6>Please Enter a date to see reports</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SaleReport;