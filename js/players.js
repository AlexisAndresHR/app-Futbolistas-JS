const playersList = document.getElementById("players-list");
let players = [
    {
        firstName: "Jose de Jesus",
        lastName: "Corona",
        position: "Goalkeeper",
        team: "Cruz Azul FC"
    }
];// Initial variable for the players list

/**
 * Function that puts the list of players in a table row
 */
function listPlayers() {
    let htmlPlayers = players.map((player, index) =>
        `<tr>
            <th scope="row"> ${index} </th>
            <td> ${player.firstName} </td>
            <td> ${player.lastName} </td>
            <td> ${player.position} </td>
            <td> ${player.team} </td>
            <td>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-primary"> <i class="fas fa-edit"></i> </button>
                    <button type="button" class="btn btn-danger"> <i class="fas fa-trash-alt"></i> </button>
                </div>
            </td>
        </tr>`
    ).join("");
    playersList.innerHTML = htmlPlayers;// Assign the table rows to the HTML component (with innerHTML property)
}

listPlayers();// Executes the function