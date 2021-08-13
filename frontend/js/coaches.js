// HTML page components
const coachesTable = document.getElementById('coaches-list');
const indexField = document.getElementById('index-value');
const firstNameField = document.getElementById('first-name');
const lastNameField = document.getElementById('last-name');
const countryField = document.getElementById('country');
const teamField = document.getElementById('team');
const newCoachForm = document.getElementById('new-coach-form');
const registerCoachBtn = document.getElementById('new-coach-btn');

const url = "https://futbolistas-js-backend.vercel.app/coaches";

let coaches = [];// Initial variable for the coaches list
let action = 'Save';// Flag variable for the type of action (Save or Edit)


/**
 * Function that puts the list of Coaches in a table row
 */
async function listCoaches() {
    try {
        // Makes a request to the data API (backend) to load the real Coaches registers
        const response = await fetch(url);// Using fetch (HTTP requests)
        const coachesRegisters = await response.json();
        if (Array.isArray(coachesRegisters)) {
            coaches = coachesRegisters;// Assign the server registers to the local variable
        }

        if (coachesRegisters.length === 0) { // If the Coaches register is empty, shows an specific message in screen
            coachesTable.innerHTML = `
                <tr>
                    <td colspan="5"> There are not Coaches registered yet... </td>
                </tr>
            `;
            return;
        }

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
 * Save a new Coach data to be listed in the table
 * @param event
 */
async function submitCoachData(event) {
    event.preventDefault();
    try {
        const newRegister = {// Obtain the form fields data
            firstName: firstNameField.value,
            lastName: lastNameField.value,
            country: countryField.value,
            team: teamField.value
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
            listCoaches();// Reload the function to put in screen the updated coaches list (after the new register)
            // Reset the inputs to register more data again (4 lines)
            firstNameField.value = '';
            lastNameField.value = '';
            countryField.value = '';
            teamField.value = '';
            registerCoachBtn.innerHTML = 'Create';// Reset the modal form button
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

/**
 * Function (with async return) to delete/remove Coaches from the data API
 * @param index
 * @returns {(function(): void)|*}
 */
function deleteCoach(index) {
    const sendUrl = `${url}/${index}`;// Using a JS literal string
    return async function clickHandler2() {
        // Using array.filter, the item to be deleted is avoided and the others are added again
        //coaches = coaches.filter((coach, coachIndex) => coachIndex !== index);
        try {
            const response = await fetch(sendUrl, {
                method: "DELETE",
            });// Send a DELETE request to the data API

            if (response.ok)
                listCoaches();// Refresh the table of coaches
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

listCoaches();// Executes the function

newCoachForm.onsubmit = submitCoachData;// Prevent the default parameters sent (in URL) & redirect of the form data
registerCoachBtn.onclick = submitCoachData;// Save new coach (button action)
