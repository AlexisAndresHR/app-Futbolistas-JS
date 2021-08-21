import React from "react";

function TableHeader( props ) {
    if (props.columnNames.length === 0) return false;

    return (
        <thead className="table-dark">
            <tr>
                <th scope="col" key={0}>#</th>
                { props.columnNames.map((column, index) => (
                    <th scope="col" key={index+1}> {column} </th>
                )) }
                <th scope="col">  </th>
            </tr>
        </thead>
    );
}

export default TableHeader;