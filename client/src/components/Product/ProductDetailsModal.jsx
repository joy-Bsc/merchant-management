import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './CustomModal.css';
import { useSelector } from 'react-redux';

const ProductDetailsModal = ({ show, handleClose }) => {
  let All = useSelector((state) => state.product.List);
 
  
  

  // Find the specific product by ID
  

  return (
    <Modal show={show} onHide={handleClose} backdropClassName="custom-modal-backdrop"
      dialogClassName="custom-modal-content">
      <Modal.Header closeButton>
        <Modal.Title>Product Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {All.map((item, i) => (
          <div key={i}>
            <p><strong>Brand Name: </strong> {item.brands && item.brands[0] ? item.brands[0].Name : ""}</p>
            <p><strong>Category Name: </strong> {item.categories && item.categories[0] ? item.categories[0].Name : ""}</p>
            <p><strong>Name: </strong> {item.Name}</p>
            <p><strong>Unit: </strong> {item.Unit}</p>
            <p><strong>Details: </strong> {item.Details}</p>
            <p><strong>UserEmail: </strong> {item.UserEmail}</p>
            <p><strong>Created Date: </strong> {item.CreatedDate}</p>
            {/* Add more fields as necessary */}
          </div>
        ) )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductDetailsModal;