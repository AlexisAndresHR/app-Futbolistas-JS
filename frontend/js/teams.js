// HTML page components
const teamsTable = document.getElementById('teams-list');
const indexField = document.getElementById('index-value');
const nameField = document.getElementById('name');
const countryField = document.getElementById('country');
const stadiumField = document.getElementById('stadium');
const leagueField = document.getElementById('league');
const newTeamForm = document.getElementById('new-team-form');
const registerTeamBtn = document.getElementById('new-team-btn');

const url = "https://futbolistas-js-backend.vercel.app/teams";

let teams = [];// Initial variable for the Teams list
let action = 'Save';// Flag variable for the type of action (Save or Edit)


/**
 * Function that puts the list of teams in a table row
 */
async function listTeams() {
    try {
        // Makes a request to the data API (backend) to load the real Teams registers
        const response = await fetch(url);// Using fetch (HTTP requests)
        const teamsRegisters = await response.json();
        if (Array.isArray(teamsRegisters)) {
            teams = teamsRegisters;// Assign the server registers to the local variable
        }

        if (teamsRegisters.length === 0) { // If the Teams register is empty, shows an specific message in screen
            teamsTable.innerHTML = `
                <tr>
                    <td colspan="5"> There are not Teams registered yet... </td>
                </tr>
            `;
            return;
        }

        let htmlTeams = teams.map((team, index) =>
            `<tr>
            <th scope="row"> ${index} </th>
            <td> ${team.name} </td>
            <td> ${team.country} </td>
            <td> ${team.stadium} </td>
            <td> ${team.league} </td>
            <td>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <!--<button type="button" class="btn btn-primary edit-item" data-index=$//{index}> <i class="fas fa-edit"></i> </button>-->
                    <button type="button" class="btn btn-primary edit-item" data-bs-toggle="modal" data-bs-target="#newFormModal"> <i class="fas fa-edit"></i> </button>
                    <button type="button" class="btn btn-danger delete-item"> <i class="fas fa-trash-alt"></i> </button>
                </div>
            </td>
        </tr>`
        ).join("");
        teamsTable.innerHTML = htmlTeams;// Assign the table rows to the HTML component (with innerHTML property)

        // Assign an onclick function to each button on the teams table (edit data)
        Array.from(document.getElementsByClassName('edit-item')).forEach(
            (editButton, index) => editButton.onclick = editTeamData(index)
            // closure structure to invoke the function giving the status of the button
        );
        // Assign an onclick function to each button on the teams table (delete team)
        Array.from(document.getElementsByClassName('delete-item')).forEach(
            (deleteButton, index) => deleteButton.onclick = deleteTeam(index)
            // closure structure to invoke the function giving the status of the button
        );
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
 * Save a new Team data to be listed in the table
 * @param event
 */
async function submitTeamData(event) {
    event.preventDefault();
    try {
        const newRegister = {// Obtain the form fields data
            name: nameField.value,
            country: countryField.value,
            stadium: stadiumField.value,
            league: leagueField.value
        };

        let sendMethod = 'POST';
        let sendUrl = url;
        // Depending on the type of action (Save or Edit)
        if (action === 'Save'){
            action = 'Save';
        }
        else if (action === 'Edit'){
            sendMethod = 'PUT';
            sendUrl = `${sendUrl}/${indexField.value}`;
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

        if (response.ok){
            listTeams();// Reload the function to put in screen the updated Teams list (after the new register)

            // Reset the inputs to register more data again (4 lines)
            nameField.value = '';
            countryField.value = '';
            stadiumField.value = '';
            leagueField.value = '';
            registerTeamBtn.innerHTML = 'Create';// Reset the modal form button
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

/**
 * Function that lets edit the data of a registered Team
 * @param index
 * @returns {(function(): void)|*}
 */
function editTeamData(index) {
    return function clickHandler() {
        const team = teams[index];
        nameField.value = team.name;// Assign the values to the form fields
        countryField.value = team.country;
        stadiumField.value = team.stadium;
        leagueField.value = team.league;
        indexField.value = index;

        registerTeamBtn.innerHTML = 'Edit';
        // After opens the modal window to see the values in the form and edit it...
        action = 'Edit';
    }
}

/**
 * Function (with async return) to delete/remove Teams registers from the data API
 * @param index
 * @returns {(function(): void)|*}
 */
function deleteTeam(index) {
    const sendUrl = `${url}/${index}`;// Using a JS literal string
    return async function clickHandler2() {
        // Using array.filter, the item to be deleted is avoided and the others are added again
        //teams = teams.filter((team, teamIndex) => teamIndex !== index);
        try {
            const response = await fetch(sendUrl, {
                method: "DELETE",
            });// Send a DELETE request to the data API

            if (response.ok){
                listTeams();// Refresh the table of Teams
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

listTeams();// Executes the function

newTeamForm.onsubmit = submitTeamData;// Prevent the default parameters sent (in URL) & redirect of the form data
registerTeamBtn.onclick = submitTeamData;// Save new Team (button action)
