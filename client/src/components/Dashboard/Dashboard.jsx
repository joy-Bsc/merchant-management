import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ExpenseSummaryRequest, PurchaseSummaryRequest, ReturnSummaryRequest, SalesSummaryRequest } from '../../APIRequest/SummaryAPIRequest';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
    const [Expense, setExpense] = useState(null);
    const [Purchase, setPurchase] = useState(null);
    const [Sales, setSales] = useState(null);
    const [Return, setReturn] = useState(null);

    useEffect(() => {
        (async () => {
            let res = await ExpenseSummaryRequest();
            console.log("res", res);
            setExpense(res);
        })();

        (async () => {
            let res = await PurchaseSummaryRequest();
            console.log("res", res);
            setPurchase(res);
        })();

        (async () => {
            let res = await SalesSummaryRequest();
            console.log("res", res);
            setSales(res);
        })();

        (async () => {
            let res = await ReturnSummaryRequest();
            console.log("res", res);
            setReturn(res);
        })();
    }, []);

    return (
        <div className="container">
            
            <div className="row">
                {Expense && (
                    <div className="col-md-3 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Expense Total</h5>
                                <p className="card-text"><strong>$</strong>{Expense.Total[0].TotalAmount}</p>
                            </div>
                        </div>
                    </div>
                )}
                {Purchase && (
                    <div className="col-md-3 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Purchase Total</h5>
                                <p className="card-text"><strong>$</strong>{Purchase.Total[0].TotalAmount}</p>
                            </div>
                        </div>
                    </div>
                )}
                {Sales && (
                    <div className="col-md-3 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Sales Total</h5>
                                <p className="card-text"><strong>$</strong>{Sales.Total[0].TotalAmount}</p>
                            </div>
                        </div>
                    </div>
                )}
                {Return && (
                    <div className="col-md-3 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Return Total</h5>
                                <p className="card-text"><strong>$</strong>{Return.Total[0].TotalAmount}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="row">
                {Expense && (
                    <div className="col-md-6 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Expense Last 30 Days</h5>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={Expense.Last30Days.sort((a, b) => new Date(a._id) - new Date(b._id))}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="_id" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="TotalAmount" stroke="#8884d8" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                )}
                {Purchase && (
                    <div className="col-md-6 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Purchase Last 30 Days</h5>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={Purchase.Last30Days.sort((a, b) => new Date(a._id) - new Date(b._id))}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="_id" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="TotalAmount" stroke="#82ca9d" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                )}
                {Sales && (
                    <div className="col-md-6 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Sales Last 30 Days</h5>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={Sales.Last30Days.sort((a, b) => new Date(a._id) - new Date(b._id))}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="_id" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="TotalAmount" stroke="#ffc658" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                )}
                {Return && (
                    <div className="col-md-6 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Return Last 30 Days</h5>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={Return.Last30Days.sort((a, b) => new Date(a._id) - new Date(b._id))}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="_id" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="TotalAmount" stroke="#ff7300" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;