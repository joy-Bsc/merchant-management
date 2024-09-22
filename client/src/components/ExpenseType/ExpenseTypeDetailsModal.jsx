import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './CustomModal.css';

const ExpenseTypeDetailsModal = ({ show, handleClose, ExpenseTypeDetails }) => {
    
  return (
    <Modal show={show} onHide={handleClose} backdropClassName="custom-modal-backdrop"
    dialogClassName="custom-modal-content">
      <Modal.Header closeButton>
        <Modal.Title>Expense Type Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {ExpenseTypeDetails ? (
          <div>
            <p><strong>Name: </strong> {ExpenseTypeDetails.Name}</p>
            <p><strong>Email: </strong> {ExpenseTypeDetails.UserEmail}</p>
            <p><strong>ID : </strong> {ExpenseTypeDetails._id}</p>
            
            <p><strong>Created Date: </strong> {ExpenseTypeDetails.CreatedDate}</p>
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

export default ExpenseTypeDetailsModal;