import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './CustomModal.css';
import { useSelector } from 'react-redux';


const ReturnDetailsModal = ({ show, handleClose , returnId }) => {
  let All = useSelector((state) => state.return.List);
 
  const ret = All.find((ret) => ret._id === returnId);

  if (!ret) {
    return null; // Return null if no return is found
  }
  

    // Find the specific Return by ID
  

  return (
    <Modal show={show} onHide={handleClose} backdropClassName="custom-modal-backdrop"
      dialogClassName="custom-modal-content">
      <Modal.Header closeButton>
        <Modal.Title>Return Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      
          <div>
            <p><strong>Customer Name: </strong> {ret.customers[0].CustomerName}</p>
            <p><strong>Customer Email: </strong> {ret.customers[0].Email}</p>
            <p><strong>Customer Phone: </strong> {ret.customers[0].Phone}</p>
            <p><strong>Customer Address </strong> {ret.customers[0].Address}</p>
            <p><strong>Entry date: </strong> {ret.customers[0].CreatedDate}</p>
            <p><strong>UserEmail: </strong> {ret.UserEmail}</p>
            <p><strong>Created Date: </strong> {ret.CreatedDate}</p>
            {/* Add more fields as necessary */}
          </div>
       
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReturnDetailsModal;