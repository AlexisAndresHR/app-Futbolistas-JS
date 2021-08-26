import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

function TableRow( props ) {
    return (
        <tr>
            <th scope="row"> {props.index} </th>
            { /* JS map function to show the corresponding value (according to the entity) into each row column */
            props.columns.map((column, _index) => (
                <td key={`col-${column}-${_index}`}> {props.entity[column]} </td>
            )) }
            <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-primary edit-item"
                            onClick={(e) => props.editRegister(e, props.index)} >
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button type="button" className="btn btn-danger delete-item"
                            onClick={(e) => props.deleteEntity(e, props.index)} >
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default TableRow;