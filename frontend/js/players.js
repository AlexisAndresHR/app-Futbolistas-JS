// HTML page components
const playersTable = document.getElementById('players-list');
const indexField = document.getElementById('index-value');
const firstNameField = document.getElementById('first-name');
const lastNameField = document.getElementById('last-name');
const positionSelect = document.getElementById('position');
const teamField = document.getElementById('team');
const newPlayerForm = document.getElementById('new-player-form');
const registerPlayerBtn = document.getElementById('new-player-btn');

const url = "https://futbolistas-js-backend.vercel.app/players";

let players = [];// Initial variable for the players list
let action = 'Save';// Flag variable for the type of action (Save or Edit)


/**
 * Function that puts the list of players in a table row (now async)
 */
async function listPlayers() {

    try {
        // Makes a request to the data API (backend) and load the real Players registers
        const response = await fetch(url);// Using fetch (HTTP requests)
        const playersRegisters = await response.json();
        if (Array.isArray(playersRegisters)) {
            players = playersRegisters;// Assign the server registers to the local variable
        }

        if (playersRegisters.length === 0) { // If the Players register is empty, shows an specific message in screen
            playersTable.innerHTML = `
                <tr>
                    <td colspan="5"> There are not Players registered yet... </td>
                </tr>
            `;
            return;
        }

        const htmlPlayers = players.map((player, index) =>
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
    catch (error) {
        //throw error;
        await Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error
        });
        console.log( {error} );
    }
}

/**
 * Save a new player data to be listed in the table
 * @param event
 */
async function submitPlayerData(event) {
    event.preventDefault();
    try {
        const newRegister = {// Obtain the form fields data
            firstName: firstNameField.value,
            lastName: lastNameField.value,
            position: positionSelect.value,
            team: teamField.value
        };
        let sendMethod = 'POST';
        let sendUrl = url;
        // Validates the type of action to be done
        if (action === 'Save') {
            // players.push(newRegister);
            action = 'Save';
        }
        else if (action === 'Edit') {
            sendMethod = 'PUT';
            sendUrl = sendUrl + "/" + indexField.value;
            // players[indexField.value] = newRegister;
            action = 'Save';
        }

        // Send the new register data to the API with fetch()
        const response = await fetch(sendUrl, {
            method: sendMethod,
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(newRegister)
        });

        if (response.ok) {
            listPlayers();// Reload the function to put in screen the updated players list (after the new register)

            // Reset the inputs to register more data again (4 lines)
            firstNameField.value = '';
            lastNameField.value = '';
            positionSelect.value = 'Position';
            teamField.value = '';
            registerPlayerBtn.innerHTML = 'Create';// Reset the modal form button
        }
    }
    catch (error) {
        // To show a SweetAlert2 responsive window alert
        await Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error
        });
        console.log( {error} );
    }
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

/**
 * Function (with async return) to delete/remove Players registers from the data API
 * @param index
 * @returns {(function(): void)|*}
 */
function deletePlayer(index) {
    const sendUrl = `${url}/${index}`;
    return async function clickHandler2() {
        // Using array.filter, the item to be deleted is avoided and the others are added again
        //players = players.filter((player, playerIndex) => playerIndex !== index);
        try {
            const response = await fetch(sendUrl, {
                method: "DELETE",
            });

            if (response.ok) {
                listPlayers();// Refresh the table of players (after the elimination)
            }
        }
        catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error
            });
            console.log( {error} );
        }
    }
}

listPlayers();// Executes the function

newPlayerForm.onsubmit = submitPlayerData;// Prevent the default parameters sent (in URL) & redirect of the form data
registerPlayerBtn.onclick = submitPlayerData;// Save new player (button action)


/**
 * Makes a request to the data API (backend) and load the real Players registers
 */
/* function loadPlayersData() {
    // Using fetch (HTTP requests)
    fetch("http://localhost:5000/players")
        .then((response) => {
            if (response.ok)
                return response.json();// If the response is 'ok', is converted into a legible JSON
        })
        .then((playersRegisters) => {
            console.log({ playersRegisters });
        });
} */

