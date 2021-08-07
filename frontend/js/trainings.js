// HTML page components
const trainingsTable = document.getElementById('trainings-list');
const indexField = document.getElementById('index-value');
const teamField = document.getElementById('team');
const placeField = document.getElementById('place');
const dateField = document.getElementById('date');
const hourSelect = document.getElementById('hour');
const newTrainingForm = document.getElementById('new-training-form');
const registerTrainingBtn = document.getElementById('new-training-btn');

const url = "http://localhost:5000/trainings";

let trainings = [
    {
        team: "FC Barcelona",
        place: "Ciutat Esportiva Joan Gamper",
        date: "July 20",
        hour: "11:00 am"
    }
];// Initial variable for the trainings list
let action = 'Save';// Flag variable for the type of action (Save or Edit)


/**
 * Function that puts the list of Trainings in a table row
 */
async function listTrainings() {
    try {
        // Makes a request to the data API (backend) to load the real Trainings registers
        const response = await fetch(url);// Using fetch (HTTP requests)
        const trainingsRegisters = await response.json();
        if (Array.isArray(trainingsRegisters)) {
            trainings = trainingsRegisters;// Assign the server registers to the local variable
        }

        if (trainingsRegisters.length === 0) { // If the Trainings register is empty, shows an specific message in screen
            trainingsTable.innerHTML = `
                <tr>
                    <td colspan="5"> There are not Trainings registered yet... </td>
                </tr>
            `;
            return;
        }

        let htmlTrainings = trainings.map((training, index) =>
            `<tr>
            <th scope="row"> ${index} </th>
            <td> ${training.team} </td>
            <td> ${training.place} </td>
            <td> ${training.date} </td>
            <td> ${training.hour} </td>
            <td>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <!--<button type="button" class="btn btn-primary edit-item" data-index=$//{index}> <i class="fas fa-edit"></i> </button>-->
                    <button type="button" class="btn btn-primary edit-item" data-bs-toggle="modal" data-bs-target="#newFormModal"> <i class="fas fa-edit"></i> </button>
                    <button type="button" class="btn btn-danger delete-item"> <i class="fas fa-trash-alt"></i> </button>
                </div>
            </td>
        </tr>`
        ).join("");
        trainingsTable.innerHTML = htmlTrainings;// Assign the table rows to the HTML component (with innerHTML property)

        // Assign an onclick function to each button on the Trainings table (edit data)
        Array.from(document.getElementsByClassName('edit-item')).forEach(
            (editButton, index) => editButton.onclick = editTrainingData(index)
            // closure structure to invoke the function giving the status of the button
        );
        // Assign an onclick function to each button on the Trainings table (delete training)
        Array.from(document.getElementsByClassName('delete-item')).forEach(
            (deleteButton, index) => deleteButton.onclick = deleteTraining(index)
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
 * Save a new Training data to be listed in the table
 * @param event
 */
async function submitTrainingData(event) {
    event.preventDefault();
    try {
        const newRegister = {// Obtain the form fields data
            team: teamField.value,
            place: placeField.value,
            date: dateField.value,
            hour: hourSelect.value
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
            listTrainings();// Reload the function to put in screen the updated Trainings list (after the new register)
            // Reset the inputs to register more data again (4 lines)
            teamField.value = '';
            placeField.value = '';
            dateField.value = '';
            hourSelect.value = 'Select an Hour';
            registerTrainingBtn.innerHTML = 'Create';// Reset the modal form button
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
 * Function that lets edit the data of a registered Training
 * @param index
 * @returns {(function(): void)|*}
 */
function editTrainingData(index) {
    return function clickHandler() {
        const training = trainings[index];
        teamField.value = training.team;// Assign the values to the form fields
        placeField.value = training.place;
        dateField.value = training.date;
        hourSelect.value = training.hour;
        indexField.value = index;

        registerTrainingBtn.innerHTML = 'Edit';
        // After opens the modal window to see the values in the form and edit it...
        action = 'Edit';
    }
}

/**
 * Function (with async return) to delete/remove Trainings from the data API
 * @param index
 * @returns {(function(): void)|*}
 */
function deleteTraining(index) {
    const sendUrl = `${url}/${index}`;// Using a JS literal string
    return async function clickHandler2() {
        // Using array.filter, the item to be deleted is avoided and the others are added again
        //trainings = trainings.filter((training, trainingIndex) => trainingIndex !== index);
        try {
            const response = await fetch(sendUrl, {
                method: "DELETE",
            });// Send a DELETE request to the data API

            if (response.ok)
                listTrainings();// Refresh the table of Trainings
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

listTrainings();// Executes the function

newTrainingForm.onsubmit = submitTrainingData;// Prevent the default parameters sent (in URL) & redirect of the form data
registerTrainingBtn.onclick = submitTrainingData;// Save new training (button action)
