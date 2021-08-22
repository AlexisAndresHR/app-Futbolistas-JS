import React from "react";
import "../styles/Modal.css";
import ModalForm from "./ModalForm";

function Modal( props ) {
    return (
        <>
            <div className="modal-mod fade-mod" id="newFormModal" tabIndex="-1" aria-labelledby="newFormModalLabel" aria-hidden="true">
                { /* Modal div for the new register form */ }
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="newFormModalLabel"> {props.modalTitle} </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                onClick={ props.changeModalState } > </button>
                        </div>

                        <div className="modal-body">
                            { /* New register (entity) form */ }
                            <ModalForm inputsFormData={props.inputsFormData}
                                       formSelect={props.formSelect} formSelectId={props.formSelectId}
                                       formSelectOptions={props.formSelectOptions}
                                       handleFormInput={props.handleFormInput}
                                       entityObject={props.entityObject} />
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary"
                                onClick={ props.changeModalState } > Cancel
                            </button>
                            <button type="button" className="btn btn-success" id="send-register-data"
                                    onClick={ props.createRegister } > Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop-mod fade show"> </div>
        </>
    );
}

export default Modal;