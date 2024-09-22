import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './CustomModal.css';
import { useSelector } from 'react-redux';

const ExpenseDetailsModal = ({ show, handleClose, ExpenseDetails }) => {
  let All = useSelector((state) => state.expense.List);

  return (
    <Modal show={show} onHide={handleClose} backdropClassName="custom-modal-backdrop"
      dialogClassName="custom-modal-content">
      <Modal.Header closeButton>
        <Modal.Title>Expense Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {ExpenseDetails ? (
          <div>
             {
              All.filter(item => {
                console.log("Checking item:", item);
                return item.TypeID === ExpenseDetails.TypeID;
              }).map((item, index) => (
                <p key={index}><strong>Name: </strong> {item.Type && item.Type[0] ? item.Type[0].Name : ""}</p>
              ))
            }
            
            <p><strong>Email: </strong> {ExpenseDetails.UserEmail}</p>
            <p><strong>Amount: </strong> {ExpenseDetails.Amount}</p>
            <p><strong>Note: </strong> {ExpenseDetails.Note}</p>
            <p><strong>Created Date: </strong> {ExpenseDetails.CreatedDate}</p>
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

export default ExpenseDetailsModal;