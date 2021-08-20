import React from "react";
import { useState } from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

function Table() {

    // React state for the Players Table
    const [players, setPlayers] = useState([
        {
            firstName: "Jose de Jesus",
            lastName: "Corona",
            position: "Goalkeeper",
            team: "Cruz Azul FC"
        },
    ]);

    const columnNames = players.length > 0 ? Object.keys(players[0]) : [];

    return (
        <table className="table">
            <TableHeader columnNames={columnNames} />

            <tbody id="players-list">
                { /* Throw the useState function, puts the Players registers in table rows */ }
                {players.map((player, index) =>
                    <TableRow player={player} index={index} />
                )}
            </tbody>
        </table>
    );
}

export default Table;