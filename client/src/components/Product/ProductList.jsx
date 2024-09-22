import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { ProductDetailsRequest, ProductListRequest, DeleteProduct, } from "../../APIRequest/ProductAPIRequest";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai';
import ProductDetailsModal from "./ProductDetailsModal";
import { DeleteAlert } from "../../helper/DeleteAlert";
const ProductList = () => {
  let [searchKey, setSearchKey] = useState("0");
  let [perPageKey, setPerPageKey] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [ProductDetails, setProductDetails] = useState(null);

  useEffect(() => {
    ProductListRequest(1, perPageKey, searchKey);
  }, [searchKey, perPageKey]);

  let ALLProduct = useSelector((state) => state.product.List);
  let Total = useSelector((state) => state.product.ListTotal);
  let BrandDropDown = useSelector((state) => state.product.BrandDropDown);
  let CategoryDropDown = useSelector((state) => state.product.CategoryDropDown);
  console.log("ALLProduct", ALLProduct);
  console.log("Brand", BrandDropDown);
  console.log("Category", CategoryDropDown);
  

  const handlePageClick = (event) => {
    ProductListRequest(event.selected + 1, perPageKey, searchKey);
  };

  const searchData = () => {
    ProductListRequest(1, perPageKey, searchKey);
  };

  const PageKeyOnChange = (e) => {
    setPerPageKey(parseInt(e.target.value));
    ProductListRequest(1, e.target.value, searchKey);
  };

  const searchOnChange = (e) => {
    setSearchKey(e.target.value);
    if (e.target.value.length === 0) {
      setSearchKey("0");
      ProductListRequest(1, perPageKey, "0");
    }
  };
  const handleShowModal = async (id) => {
    console.log("ID:", id);
    
    try {
      const details = await ProductDetailsRequest(id);
      console.log("Product Details:", details);
      
      setProductDetails(details);
      setShowModal(true);
    } catch (error) {
      console.error("Failed to fetch Product details:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setProductDetails(null);
  };

  const DeleteItem = async(id) => {
    let Result = await DeleteAlert();
    if (Result) {
     let DeleteResult = await DeleteProduct(id);
      if(DeleteResult){
        ProductListRequest(1, perPageKey, searchKey);
      }
    }
  }

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
                      <h5>Product List</h5>
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
                                Product Name
                              </th>
                              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                Brand
                              </th>
                              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                               Category
                              </th>
                              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                               Unit
                              </th>
                              
                              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Actions
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
                                    {item.Name}
                                  </p>
                                </td>
                                <td>
                                  <p className="text-xs font-weight-bold mb-0">
                                  {item.brands?item.brands[0].Name:""}
                                  </p>
                                </td>
                                <td className="text-center">
                                  <p className="text-xs text-secondary mb-0">
                                  {item.categories?item.categories[0].Name:""}
                                  </p>
                                </td>
                                
                                <td className="text-center">
                                  <p className="text-xs text-secondary mb-0">
                                    {item.Unit}
                                  </p>
                                </td>
                               
                                <td className="text-center">
                                  <Link to={`/ProductCreateUpdatePage?id=${item._id}`} className="btn text-info btn-outline-light p-2 mb-0 btn-sm">
                                  <AiOutlineEdit size={15} />
                                  </Link>
                                  <button onClick={() => handleShowModal(item._id)}  className="btn btn-outline-light text-success p-2 mb-0 btn-sm ms-2">
                                    <AiOutlineEye size={15} />
                                  </button>
                                  <ProductDetailsModal
                                       show={showModal}
                                         handleClose={handleCloseModal}
                                          ProductDetails={ProductDetails}
                                         />
                                  <button onClick={()=> DeleteItem(item._id)}  className="btn btn-outline-light text-danger p-2 mb-0 btn-sm ms-2">
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

export default ProductList;
