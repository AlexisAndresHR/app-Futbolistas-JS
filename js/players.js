// HTML page components
const playersTable = document.getElementById('players-list');
const firstNameField = document.getElementById('first-name');
const lastNameField = document.getElementById('last-name');
const positionSelect = document.getElementById('position');
const teamField = document.getElementById('team');
const newPlayerForm = document.getElementById('new-player-form');
const registerPlayerBtn = document.getElementById('new-player-btn');

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
    playersTable.innerHTML = htmlPlayers;// Assign the table rows to the HTML component (with innerHTML property)
}

function submitPlayerData(event) {
    event.preventDefault();
    const newRegister = {
        firstName: firstNameField.value,
        lastName: lastNameField.value,
        position: positionSelect.value,
        team: teamField.value
    };
    players.push(newRegister);
    listPlayers();// Reload the function to put in screen the updated players list (after the new register)

    // Reset the inputs to register more data again (4 lines)
    firstNameField.value = '';
    lastNameField.value = '';
    positionSelect.value = 'Position';
    teamField.value = '';
}

listPlayers();// Executes the function

newPlayerForm.onsubmit = submitPlayerData;// Prevent the default parameters sent (in URL) & redirect of the form data
registerPlayerBtn.onclick = submitPlayerData;// Save new player (button action)
