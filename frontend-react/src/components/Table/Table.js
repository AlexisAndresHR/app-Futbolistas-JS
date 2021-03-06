import React from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

function Table( { registers = [], columnNames = [], editRegister = ()=>{}, deleteEntity = ()=>{} } ) {

    // The 'registers' var received throw function props contains the real API data
    //const columnNames = registers.length > 0 ? Object.keys(registers[0]) : [];

    return (
        <table className="table">
            <TableHeader columnNames={columnNames} />

            <tbody id="players-list">
                { /* Using the data props, puts the Players registers in table rows */ }
                {registers.map((objItem, index) =>
                    <TableRow entity={objItem} index={index}
                              columns={columnNames}
                              key={`row-${index}`}
                              editRegister={editRegister}
                              deleteEntity={deleteEntity} />
                )}
            </tbody>
        </table>
    );
}

export default Table;