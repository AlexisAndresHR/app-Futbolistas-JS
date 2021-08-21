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
                            { /* New player register form */ }
                            <ModalForm inputsFormData={props.inputsFormData}
                                       formSelect={props.formSelect}
                                       formSelectOptions={props.formSelectOptions} />
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                                onClick={ props.changeModalState } > Cancel
                            </button>
                            <button type="submit" form="new-player-form" className="btn btn-success" id="new-player-btn"
                                    data-bs-dismiss="modal"> Create
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