import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './CustomModal.css';

const CategoryDetailsModal = ({ show, handleClose, CategoryDetails }) => {
    
  return (
    <Modal show={show} onHide={handleClose} backdropClassName="custom-modal-backdrop"
    dialogClassName="custom-modal-content">
      <Modal.Header closeButton>
        <Modal.Title>Category Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {CategoryDetails ? (
          <div>
            <p><strong>Name: </strong> {CategoryDetails.Name}</p>
            <p><strong>Email: </strong> {CategoryDetails.UserEmail}</p>
            <p><strong>ID : </strong> {CategoryDetails._id}</p>
            
            <p><strong>Created Date: </strong> {CategoryDetails.CreatedDate}</p>
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

export default CategoryDetailsModal;