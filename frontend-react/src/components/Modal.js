import React from "react";

function Modal() {
    return (
        <div className="modal fade" id="newFormModal" tabIndex="-1" aria-labelledby="newFormModalLabel" aria-hidden="true">
            { /* Modal div for the new register form */ }
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="newFormModalLabel"> New Player </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">

                        { /* New player register form */ }
                        <form id="new-player-form">
                            <input type="hidden" id="index-value" />
                            <div className="form-row">
                                <input type="text" className="form-control" placeholder="First name" id="first-name"
                                       name="first-name" />
                            </div>
                            <div className="form-row">
                                <input type="text" className="form-control" placeholder="Last name" id="last-name"
                                       name="last-name" />
                            </div>
                            <div className="form-row">
                                <select className="form-control" id="position">
                                    <option> Position</option>
                                    <option> Goalkeeper</option>
                                    <option> Defense</option>
                                    <option> Midfielder</option>
                                    <option> Forward</option>
                                </select>
                            </div>
                            <div className="form-row">
                                <input type="text" className="form-control" placeholder="Team" id="team" name="team" />
                            </div>
                        </form>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"> Cancel</button>
                        <button type="submit" form="new-player-form" className="btn btn-success" id="new-player-btn"
                                data-bs-dismiss="modal"> Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;