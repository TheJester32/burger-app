import React from "react";
import modalStyles from "./modal.module.css";

function ModalOverlay({ handleClose }) {
  return (
    <div className={modalStyles.overlay} onClick={handleClose} />
  );
}

export default ModalOverlay;