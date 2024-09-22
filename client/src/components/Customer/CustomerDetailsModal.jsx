import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './CustomModal.css';

const CustomerDetailsModal = ({ show, handleClose, customerDetails }) => {
    
  return (
    <Modal show={show} onHide={handleClose} backdropClassName="custom-modal-backdrop"
    dialogClassName="custom-modal-content">
      <Modal.Header closeButton>
        <Modal.Title>Customer Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {customerDetails ? (
          <div>
            <p><strong>Name: </strong> {customerDetails.CustomerName}</p>
            <p><strong>Email: </strong> {customerDetails.Email}</p>
            <p><strong>Phone: </strong> {customerDetails.Phone}</p>
            <p><strong>Address: </strong> {customerDetails.Address}</p>
            <p><strong>Created Date: </strong> {customerDetails.CreatedDate}</p>
            {/* Add more fields as necessary */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomerDetailsModal;