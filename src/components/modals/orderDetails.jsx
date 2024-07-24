import React from 'react';
import Modals from './modals';

function OrderDetailsModal({ children, isOpen, handleClose }) {
  return (
    <Modals isOpen={isOpen} handleClose={handleClose}>
      {children}
    </Modals>
  );
}

export default OrderDetailsModal;