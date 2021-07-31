// HTML page components
const teamsTable = document.getElementById('teams-list');
const indexField = document.getElementById('index-value');
const nameField = document.getElementById('name');
const countryField = document.getElementById('country');
const stadiumField = document.getElementById('stadium');
const leagueField = document.getElementById('league');
const newTeamForm = document.getElementById('new-team-form');
const registerTeamBtn = document.getElementById('new-team-btn');

let teams = [
    {
        name: "FC Barcelona",
        country: "Spain",
        stadium: "Camp Nou",
        league: "La Liga"
    }
];// Initial variable for the Teams list
let action = 'Save';// Flag variable for the type of action (Save or Edit)


/**
 * Function that puts the list of teams in a table row
 */
function listTeams() {
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

/**
 * Save a new Team data to be listed in the table
 * @param event
 */
function submitTeamData(event) {
    event.preventDefault();
    const newRegister = {// Obtain the form fields data
        name: nameField.value,
        country: countryField.value,
        stadium: stadiumField.value,
        league: leagueField.value
    };
    switch (action) {
        case 'Save':
            teams.push(newRegister);
            action = 'Save';
            break;
        case 'Edit':
            teams[indexField.value] = newRegister;
            action = 'Save';
            break;
        default:
            // none
            break;
    }
    listTeams();// Reload the function to put in screen the updated Teams list (after the new register)

    // Reset the inputs to register more data again (4 lines)
    nameField.value = '';
    countryField.value = '';
    stadiumField.value = '';
    leagueField.value = '';
    registerTeamBtn.innerHTML = 'Create';// Reset the modal form button
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

function deleteTeam(index) {
    return function clickHandler2() {
        // Using array.filter, the item to be deleted is avoided and the others are added again
        teams = teams.filter((team, teamIndex) => teamIndex !== index);
        listTeams();// Refresh the table of Teams
    }
}

listTeams();// Executes the function

newTeamForm.onsubmit = submitTeamData;// Prevent the default parameters sent (in URL) & redirect of the form data
registerTeamBtn.onclick = submitTeamData;// Save new Team (button action)
