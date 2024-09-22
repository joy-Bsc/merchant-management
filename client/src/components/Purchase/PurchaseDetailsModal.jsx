import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './CustomModal.css';
import { useSelector } from 'react-redux';


const PurchaseDetailsModal = ({ show, handleClose ,purchaseId}) => {
  let All = useSelector((state) => state.purchase.List);
 
  const purchase = All.find((item) => item._id === purchaseId);

  if (!purchase) {
    return null; // Return null if no purchase is found
  }
  

    // Find the specific Purchase by ID
  

  return (
    <Modal show={show} onHide={handleClose} backdropClassName="custom-modal-backdrop"
      dialogClassName="custom-modal-content">
      <Modal.Header closeButton>
        <Modal.Title>Purchase Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      
      <div>
          <p><strong>Supplier Name: </strong> {purchase.suppliers[0].Name}</p>
          <p><strong>Supplier Email: </strong> {purchase.suppliers[0].Email}</p>
          <p><strong>Supplier Phone: </strong> {purchase.suppliers[0].Phone}</p>
          <p><strong>Supplier Address: </strong> {purchase.suppliers[0].Address}</p>
          <p><strong>Entry Date: </strong> {purchase.suppliers[0].CreatedDate}</p>
          <p><strong>User Email: </strong> {purchase.UserEmail}</p>
          <p><strong>Created Date: </strong> {purchase.CreatedDate}</p>
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

export default PurchaseDetailsModal;