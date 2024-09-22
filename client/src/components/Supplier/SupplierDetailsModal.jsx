import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './CustomModal.css';

const SupplierDetailsModal = ({ show, handleClose, SupplierDetails }) => {
    
  return (
    <Modal show={show} onHide={handleClose} backdropClassName="custom-modal-backdrop"
    dialogClassName="custom-modal-content">
      <Modal.Header closeButton>
        <Modal.Title>Supplier Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {SupplierDetails ? (
          <div>
            <p><strong>Name: </strong> {SupplierDetails.Name}</p>
            <p><strong>Email: </strong> {SupplierDetails.Email}</p>
            <p><strong>Phone: </strong> {SupplierDetails.Phone}</p>
            <p><strong>Address: </strong> {SupplierDetails.Address}</p>
            <p><strong>Created Date: </strong> {SupplierDetails.CreatedDate}</p>
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

export default SupplierDetailsModal;