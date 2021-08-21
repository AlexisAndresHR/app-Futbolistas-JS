import React from "react";
import "./styles/ActionsMenu.css";

function ActionsMenu( { changeModalState = () => {} } ) {
    return (
        <div className="actions_menu">
            <h2> Players </h2>
            <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#newFormModal"
                onClick={ changeModalState } >
                Create New
            </button> { /* Button that invokes the modal form */ }
        </div>
    );
}

export default ActionsMenu;