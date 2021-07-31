/**
 * Code for the Coaches requests processing
 */
module.exports = function coachesHandler(coaches) {
    return {
        // Coaches method GET
        get: (data, callback) => {
            if (typeof data.index !== "undefined") {
                console.log("Handler coaches", { data });
                if (coaches[data.index]) {
                    // If founds the data index, returns the specific index register
                    return callback(200, coaches[data.index]);
                }
                return callback(404, {
                    message: `The coach # ${data.index} doesn't exists`,// Returns error message if doesn't find the index
                });
            }
            callback(200, coaches);// Returns all the data registers (Coaches)
        },
        // Coaches method POST
        post: (data, callback) => {
            coaches.push(data.payload);// Adds the new Coach register
            callback(201, data.payload);// Returns the 201 response code with the inserted register to the client
        },
        // Coaches method PUT (update/modify)
        put: (data, callback) => {
            if (typeof data.index !== "undefined") {
                if (coaches[data.index]) {
                    coaches[data.index] = data.payload;// Puts the new payload (register) in the index position (update)
                    return callback(200, coaches[data.index]);// Returns the success response, register updated
                }
                return callback(404, {
                    message: `The coach # ${data.index} doesn't exists`,// Returns error message if doesn't find the index
                });
            }
            callback(400, { message: "Index not-set" });// Shows a error message for index parameter not-set
        },
        // Coaches method DELETE
        delete: (data, callback) => {
            if (typeof data.index !== "undefined") {
                if (coaches[data.index]) {
                    // array.filter process to "regenerate" the data array without the element with index n
                    coaches = coaches.filter(
                        (_coach, num) => num != data.index
                    );
                    return callback(204, {
                        message: `Coach ID ${data.index} has been deleted`,// Returns a success response, register deleted
                    });
                }
                return callback(404, {
                    message: `The coach # ${data.index} doesn't exists`,// Returns error message if doesn't find the index
                });
            }
            callback(400, { message: "Index not-set" });// Shows a error message for index parameter not-set
        },
    };

};
