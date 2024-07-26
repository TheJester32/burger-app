import React from "react";
import modalStyles from "./modal.module.css";
import PropTypes from "prop-types";

function ModalOverlay({ handleClose }) {
  return (
    <div className={modalStyles.overlay} onClick={handleClose} />
  );
}

ModalOverlay.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default ModalOverlay;