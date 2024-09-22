import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './CustomModal.css';
import { useSelector } from 'react-redux';


const SaleDetailsModal = ({ show, handleClose ,saleId}) => {
  let All = useSelector((state) => state.sale.List);
 
    const sale = All.find((sale) => sale._id === saleId);
  

    if (!sale) {
      return null; // Return null if no sale is found
    }
  

  return (
    <Modal show={show} onHide={handleClose} backdropClassName="custom-modal-backdrop"
      dialogClassName="custom-modal-content">
      <Modal.Header closeButton>
        <Modal.Title>Sale Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      
          <div >
            <p><strong>Customer Name: </strong> {sale.customers[0].CustomerName}</p>
            <p><strong>Customer Email: </strong> {sale.customers[0].Email}</p>
            <p><strong>Customer Phone: </strong> {sale.customers[0].Phone}</p>
            <p><strong>Customer Address </strong> {sale.customers[0].Address}</p>
            <p><strong>Entry date: </strong> {sale.customers[0].CreatedDate}</p>
            <p><strong>UserEmail: </strong> {sale.UserEmail}</p>
            <p><strong>Created Date: </strong> {sale.CreatedDate}</p>
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

export default SaleDetailsModal;