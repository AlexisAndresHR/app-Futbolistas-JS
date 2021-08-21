import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

function TableRow( props ) {
    return (
        <tr>
            <th scope="row"> {props.index} </th>
            <td> {props.entity.firstName} </td>
            <td> {props.entity.lastName} </td>
            <td> {props.entity.position} </td>
            <td> {props.entity.team} </td>
            <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-primary edit-item" data-bs-toggle="modal"
                            data-bs-target="#newFormModal">
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button type="button" className="btn btn-danger delete-item">
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default TableRow;