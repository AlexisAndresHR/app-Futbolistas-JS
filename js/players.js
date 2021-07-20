// HTML page components
const playersTable = document.getElementById('players-list');
const indexField = document.getElementById('index-value');
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
let action = 'Save';// Flag variable for the type of action (Save or Edit)


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
                    <!--<button type="button" class="btn btn-primary edit-item" data-index=$//{index}> <i class="fas fa-edit"></i> </button>-->
                    <button type="button" class="btn btn-primary edit-item" data-bs-toggle="modal" data-bs-target="#newFormModal"> <i class="fas fa-edit"></i> </button>
                    <button type="button" class="btn btn-danger delete-item"> <i class="fas fa-trash-alt"></i> </button>
                </div>
            </td>
        </tr>`
    ).join("");
    playersTable.innerHTML = htmlPlayers;// Assign the table rows to the HTML component (with innerHTML property)

    // Assign an onclick function to each button on the players table (edit data)
    Array.from(document.getElementsByClassName('edit-item')).forEach(
        (editButton, index) => editButton.onclick = editPlayerData(index)
        // closure structure to invoke the function giving the status of the button
    );
    // Assign an onclick function to each button on the players table (delete player)
    Array.from(document.getElementsByClassName('delete-item')).forEach(
        (deleteButton, index) => deleteButton.onclick = deletePlayer(index)
        // closure structure to invoke the function giving the status of the button
    );
}

/**
 * Save a new player data to be listed in the table
 * @param event
 */
function submitPlayerData(event) {
    event.preventDefault();
    const newRegister = {// Obtain the form fields data
        firstName: firstNameField.value,
        lastName: lastNameField.value,
        position: positionSelect.value,
        team: teamField.value
    };
    switch (action) {
        case 'Save':
            players.push(newRegister);
            action = 'Save';
            break;
        case 'Edit':
            players[indexField.value] = newRegister;
            action = 'Save';
            break;
        default:
            // none
            break;
    }
    listPlayers();// Reload the function to put in screen the updated players list (after the new register)

    // Reset the inputs to register more data again (4 lines)
    firstNameField.value = '';
    lastNameField.value = '';
    positionSelect.value = 'Position';
    teamField.value = '';
    registerPlayerBtn.innerHTML = 'Create';// Reset the modal form button
}

/**
 * Function that lets edit the data of a registered Player
 * @param index
 * @returns {(function(): void)|*}
 */
function editPlayerData(index) {
    return function clickHandler() {
        const player = players[index];
        firstNameField.value = player.firstName;// Assign the values to the form fields
        lastNameField.value = player.lastName;
        positionSelect.value = player.position;
        teamField.value = player.team;
        indexField.value = index;

        registerPlayerBtn.innerHTML = 'Edit';
        // After opens the modal window to see the values in the form and edit it...
        action = 'Edit';
    }
}

function deletePlayer(index) {
    return function clickHandler2() {
        // Using array.filter, the item to be deleted is avoided and the others are added again
        players = players.filter((player, playerIndex) => playerIndex !== index);
        listPlayers();// Refresh the table of players
    }
}

listPlayers();// Executes the function

newPlayerForm.onsubmit = submitPlayerData;// Prevent the default parameters sent (in URL) & redirect of the form data
registerPlayerBtn.onclick = submitPlayerData;// Save new player (button action)
