/**
 * Code for the Trainings requests processing
 */
module.exports = function trainingsHandler(trainings) {
    return {
        // Trainings method GET
        get: (data, callback) => {
            if (typeof data.index !== "undefined") {
                console.log("Handler trainings", { data });
                if (trainings[data.index]) {
                    // If founds the data index, returns the specific index register
                    return callback(200, trainings[data.index]);
                }
                return callback(404, {
                    message: `The training register # ${data.index} doesn't exists`,// Returns error message if doesn't find the index
                });
            }
            callback(200, trainings);// Returns all the data registers (Trainings)
        },
        // Trainings method POST
        post: (data, callback) => {
            trainings.push(data.payload);// Adds the new Training register
            callback(201, data.payload);// Returns the 201 response code with the inserted register to the client
        },
        // Trainings method PUT (update/modify)
        put: (data, callback) => {
            if (typeof data.index !== "undefined") {
                if (trainings[data.index]) {
                    trainings[data.index] = data.payload;// Puts the new payload (register) in the index position (update)
                    return callback(200, trainings[data.index]);// Returns the success response, register updated
                }
                return callback(404, {
                    message: `The training register # ${data.index} doesn't exists`,// Returns error message if doesn't find the index
                });
            }
            callback(400, { message: "Index not-set" });// Shows a error message for index parameter not-set
        },
        // Trainings method DELETE
        delete: (data, callback) => {
            if (typeof data.index !== "undefined") {
                if (trainings[data.index]) {
                    // array.filter process to "regenerate" the data array without the element with index n
                    trainings = trainings.filter(
                        (_train, num) => num != data.index
                    );
                    return callback(204, {
                        message: `Training with ID ${data.index} has been deleted`,// Returns a success response, register deleted
                    });
                }
                return callback(404, {
                    message: `The training register # ${data.index} doesn't exists`,// Returns error message if doesn't find the index
                });
            }
            callback(400, { message: "Index not-set" });// Shows a error message for index parameter not-set
        },
    };

};
