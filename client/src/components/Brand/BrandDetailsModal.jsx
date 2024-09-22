import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './CustomModal.css';

const BrandDetailsModal = ({ show, handleClose, BrandDetails }) => {
    
  return (
    <Modal show={show} onHide={handleClose} backdropClassName="custom-modal-backdrop"
    dialogClassName="custom-modal-content">
      <Modal.Header closeButton>
        <Modal.Title>Brand Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {BrandDetails ? (
          <div>
            <p><strong>Name: </strong> {BrandDetails.Name}</p>
            <p><strong>Email: </strong> {BrandDetails.UserEmail}</p>
            <p><strong>ID : </strong> {BrandDetails._id}</p>
            
            <p><strong>Created Date: </strong> {BrandDetails.CreatedDate}</p>
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

export default BrandDetailsModal;