import React from "react";

function TableHeader( props ) {
    if (props.columnNames.length === 0) return false;

    return (
        <thead className="table-dark">
            <tr>
                <th scope="col">#</th>
                { props.columnNames.map(column => (
                    <th scope="col"> {column} </th>
                )) }
                <th scope="col">  </th>
            </tr>
        </thead>
    );
}

export default TableHeader;