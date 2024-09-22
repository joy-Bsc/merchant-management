import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { DeleteReturnRequest, ReturnListRequest } from "../../APIRequest/ReturnAPIRequest";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import moment from "moment";
import { DeleteAlert } from "../../helper/DeleteAlert";
import ReturnDetailsModal from "./ReturnDetailsModal";
const ReturnList = () => {
  let [searchKey, setSearchKey] = useState("0");
  let [perPageKey, setPerPageKey] = useState(5);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    ReturnListRequest(1, perPageKey, searchKey);
  }, [searchKey, perPageKey]);

  let ALLProduct = useSelector((state) => state.return.List);
  let Total = useSelector((state) => state.return.ListTotal);
  console.log("ALLProduct", ALLProduct);
  
  const handlePageClick = (event) => {
    ReturnListRequest(event.selected + 1, perPageKey, searchKey);
  };

  const searchData = () => {
    ReturnListRequest(1, perPageKey, searchKey);
  };

  const PageKeyOnChange = (e) => {
    setPerPageKey(parseInt(e.target.value));
    ReturnListRequest(1, e.target.value, searchKey);
  };

  const searchOnChange = (e) => {
    setSearchKey(e.target.value);
    if (e.target.value.length === 0) {
      setSearchKey("0");
      ReturnListRequest(1, perPageKey, "0");
    }
  };

  const DeleteReturn = async(id) => {
    let result = await DeleteAlert();
    if (result) {
      DeleteReturnRequest(id);
      let res = await DeleteReturnRequest(id);
    
    if(res){
      ReturnListRequest(1, perPageKey, searchKey);
    }
    }

  }
  const handleShowModal = async (id) => {
  
    
    try {
     
      setShowModal(true);
    } catch (error) {
      console.error("Failed to fetch Product details:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
   
  };


  return (
    <Fragment>
      <div className="container my-5">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-6">
                      <h5>Return List</h5>
                    </div>
                    <div className="col-2">
                      <select
                        onChange={PageKeyOnChange}
                        className="form-control mx-2 form-select-sm form-select form-control-sm"
                      >
                        <option value="5">5 Per Page</option>
                        <option value="10">10 Per Page</option>
                        <option value="20">20 Per Page</option>
                        <option value="30">30 Per Page</option>
                        <option value="50">50 Per Page</option>
                        <option value="100">100 Per Page</option>
                        <option value="200">200 Per Page</option>
                        <option value="200">200 Per Page</option>
                      </select>
                    </div>
                    <div className="col-4">
                      <div className="input-group mb-3">
                        <input
                          onChange={searchOnChange}
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Search.."
                          aria-label="Recipient's username"
                          aria-describedby="button-addon2"
                        />
                        <button
                          onClick={searchData}
                          className="btn  btn-outline-primary btn-sm mb-0"
                          type="button"
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="table-responsive data-table">
                        <table className="table">
                          <thead className="sticky-top bg-gray">
                            <tr>
                              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Serial no
                              </th>
                              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                Customer
                              </th>
                              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                Grand total
                              </th>
                              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Shipping Cost
                              </th>
                              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                               Vat/Tax
                              </th>
                              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Other Cost
                              </th>
                              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Discount
                              </th>
                              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Date
                              </th>
                              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {ALLProduct.map((item, i) => (
                             
                              <tr key={i}>
                                <td>
                                  <div className="d-flex px-2 py-1">
                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                      <h6 className="mb-0 text-xs">{i + 1}</h6>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <p className="text-xs font-weight-bold mb-0">
                                  {item.customers && item.customers.length > 0 ? item.customers[0].CustomerName : "N/A"}
                                  </p>
                                </td>
                                
                                <td>
                                  <p className="text-xs text-secondary mb-0">
                                    {item.GrandTotal}
                                  </p>
                                </td>
                                <td className="text-center">
                                  <p className="text-xs text-secondary mb-0">
                                    {item.ShippingCost}
                                  </p>
                                </td>
                                <td className="text-center">
                                  <p className="text-xs text-secondary mb-0">
                                    {item.VatTax}
                                  </p>
                                </td>
                                <td className="text-center">
                                  <p className="text-xs text-secondary mb-0">
                                    {item.OtherCost}
                                  </p>
                                </td>
                                <td className="text-center">
                                  <p className="text-xs text-secondary mb-0">
                                    {item.Discount}
                                  </p>
                                </td>
                                <td className="text-center">
                                  <p className="text-xs text-secondary mb-0">
                                  {moment(item.CreatedDate).format('MMMM Do, YYYY')}
                                  </p>
                                </td>
                                <td className="text-center">
                                <button onClick={() => handleShowModal(item._id)}  className="btn btn-outline-light text-success p-2 mb-0 btn-sm ms-2">
                                    <AiOutlineEye size={15} />
                                  </button>
                                  <ReturnDetailsModal
                                       show={showModal}
                                         handleClose={handleCloseModal}
                                          returnId={item._id}
                                         />
                                  
                                  <button onClick={()=>{DeleteReturn(item._id)}}  className="btn btn-outline-light text-danger p-2 mb-0 btn-sm ms-2">
                                    <AiOutlineDelete size={15} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="col-12 mt-5">
                      <nav aria-label="Page navigation example">
                        <ReactPaginate
                          previousLabel="<"
                          nextLabel=">"
                          pageClassName="page-item"
                          pageLinkClassName="page-link"
                          previousClassName="page-item"
                          previousLinkClassName="page-link"
                          nextClassName="page-item"
                          nextLinkClassName="page-link"
                          breakLabel="..."
                          breakClassName="page-item"
                          breakLinkClassName="page-link"
                          pageCount={Math.ceil(Total / perPageKey)}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={5}
                          onPageChange={handlePageClick}
                          containerClassName="pagination"
                          activeClassName="active"
                        />
                      </nav>
                    </div>
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

export default ReturnList;
