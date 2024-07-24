import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyles from "./modal.module.css";
import ModalOverlay from './modalOverlay';

function Modals({ children, isOpen, handleClose }) {
  useEffect(() => {
    const closeOnEscapeKey = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={modalStyles.modal}>
      <ModalOverlay handleClose={handleClose} />
      <div className={modalStyles.modal_content}>
        <CloseIcon type="primary" onClick={handleClose} />
        {children}
      </div>
    </div>,
    document.getElementById("react-modals")
  );
}

export default Modals;