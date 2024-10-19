import React from "react";
import $ from "jquery";

function handleClose(modalId){
  $("#"+modalId).hide()
}
const notifModal = ({ modalId , modalData}) => {
  return (
    <div
      className="modal"
      id={modalId}
      data-backdrop="static"
      tabIndex="-1"
      role="dialog"
      aria-labelledby={modalId}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable" role="document">
        <div className="modal-content">
          <div className="modal-header p-4">
            <button
              type="button"
              className="btn-close close left"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => handleClose(modalId)}
            >
            </button>
            <h6 className="modal-title" id="staticBackdropLabel">
              اعلانات
            </h6>
          </div>
          <div className="modal-body my-4" dir="rtl">
            {Array.isArray(modalData) && modalData.map(item=>(
                <div className="col-12 my-2">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                </div>
            ))}
          </div>
          <div className="modal-footer p-3">
            <button
              type="button"
              className="btn btn-outline-danger font-weight-bold py-2"
              data-dismiss="modal"
              onClick={() => handleClose(modalId)}
              
            >
              <i className="fas fa-times px-1"></i>
              بستن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default notifModal;
