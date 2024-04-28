import React from "react";
import "./CustomModal.scss";
const CustomModal = ({
  closeModal,
  title,
  description,
  primaryBtn,
  pirmaryTxt,
  deleteClass = false,
}) => {
  return (
    <>
      <div className="backDropModal" />
      <div className="customWrapper">
        {/* <h1 className="closeIcon">X</h1> */}
        <div className="textGrp">
          <button onClick={() => closeModal(false)}>
            <i class="fa-solid fa-xmark"></i>
          </button>
          <h5>{title ?? ""}</h5>
          <p>{description ?? ""}</p>
        </div>
        <div className="btnGrp">
          <button className="cancelBtn" onClick={() => closeModal(false)}>
            Cancel
          </button>
          <button
            className={deleteClass ? "deleteBtn" : "saveBtn"}
            onClick={primaryBtn}
          >
            {pirmaryTxt}
          </button>
        </div>
      </div>
    </>
  );
};

export default CustomModal;
