// HTML page components
const coachesTable = document.getElementById('coaches-list');
const indexField = document.getElementById('index-value');
const firstNameField = document.getElementById('first-name');
const lastNameField = document.getElementById('last-name');
const countryField = document.getElementById('country');
const teamField = document.getElementById('team');
const newCoachForm = document.getElementById('new-coach-form');
const registerCoachBtn = document.getElementById('new-coach-btn');

let coaches = [
    {
        firstName: "Juan",
        lastName: "Reynoso",
        country: "Peru",
        team: "Cruz Azul FC"
    }
];// Initial variable for the coaches list
let action = 'Save';// Flag variable for the type of action (Save or Edit)


/**
 * Function that puts the list of Coaches in a table row
 */
function listCoaches() {
    let htmlCoaches = coaches.map((coach, index) =>
        `<tr>
            <th scope="row"> ${index} </th>
            <td> ${coach.firstName} </td>
            <td> ${coach.lastName} </td>
            <td> ${coach.country} </td>
            <td> ${coach.team} </td>
            <td>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <!--<button type="button" class="btn btn-primary edit-item" data-index=$//{index}> <i class="fas fa-edit"></i> </button>-->
                    <button type="button" class="btn btn-primary edit-item" data-bs-toggle="modal" data-bs-target="#newFormModal"> <i class="fas fa-edit"></i> </button>
                    <button type="button" class="btn btn-danger delete-item"> <i class="fas fa-trash-alt"></i> </button>
                </div>
            </td>
        </tr>`
    ).join("");
    coachesTable.innerHTML = htmlCoaches;// Assign the table rows to the HTML component (with innerHTML property)

    // Assign an onclick function to each button on the coaches table (edit data)
    Array.from(document.getElementsByClassName('edit-item')).forEach(
        (editButton, index) => editButton.onclick = editCoachData(index)
        // closure structure to invoke the function giving the status of the button
    );
    // Assign an onclick function to each button on the coaches table (delete coach)
    Array.from(document.getElementsByClassName('delete-item')).forEach(
        (deleteButton, index) => deleteButton.onclick = deleteCoach(index)
        // closure structure to invoke the function giving the status of the button
    );
}

/**
 * Save a new Coach data to be listed in the table
 * @param event
 */
function submitCoachData(event) {
    event.preventDefault();
    const newRegister = {// Obtain the form fields data
        firstName: firstNameField.value,
        lastName: lastNameField.value,
        country: countryField.value,
        team: teamField.value
    };
    switch (action) {
        case 'Save':
            coaches.push(newRegister);
            action = 'Save';
            break;
        case 'Edit':
            coaches[indexField.value] = newRegister;
            action = 'Save';
            break;
        default:
            // none
            break;
    }
    listCoaches();// Reload the function to put in screen the updated coaches list (after the new register)

    // Reset the inputs to register more data again (4 lines)
    firstNameField.value = '';
    lastNameField.value = '';
    countryField.value = '';
    teamField.value = '';
    registerCoachBtn.innerHTML = 'Create';// Reset the modal form button
}

/**
 * Function that lets edit the data of a registered Coach
 * @param index
 * @returns {(function(): void)|*}
 */
function editCoachData(index) {
    return function clickHandler() {
        const coach = coaches[index];
        firstNameField.value = coach.firstName;// Assign the values to the form fields
        lastNameField.value = coach.lastName;
        countryField.value = coach.country;
        teamField.value = coach.team;
        indexField.value = index;

        registerCoachBtn.innerHTML = 'Edit';
        // After opens the modal window to see the values in the form and edit it...
        action = 'Edit';
    }
}

function deleteCoach(index) {
    return function clickHandler2() {
        // Using array.filter, the item to be deleted is avoided and the others are added again
        coaches = coaches.filter((coach, coachIndex) => coachIndex !== index);
        listCoaches();// Refresh the table of coaches
    }
}

listCoaches();// Executes the function

newCoachForm.onsubmit = submitCoachData;// Prevent the default parameters sent (in URL) & redirect of the form data
registerCoachBtn.onclick = submitCoachData;// Save new coach (button action)
