import React from 'react';
import Modals from './modals';

function IngredientDetails({ children, isOpen, handleClose }) {
  return (
    <Modals isOpen={isOpen} handleClose={handleClose}>
      {children}
    </Modals>
  );
}

export default IngredientDetails;