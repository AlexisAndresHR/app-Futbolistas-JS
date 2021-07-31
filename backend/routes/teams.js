/**
 * Code for the Teams requests processing
 */
module.exports = function teamsHandler(teams) {
    return {
        // Teams method GET
        get: (data, callback) => {
            if (typeof data.index !== "undefined") {
                console.log("Handler teams", { data });
                if (teams[data.index]) {
                    // If founds the data index, returns the specific index register
                    return callback(200, teams[data.index]);
                }
                return callback(404, {
                    message: `The team # ${data.index} doesn't exists`,// Returns error message if doesn't find the index
                });
            }
            callback(200, teams);// Returns all the data registers (Teams)
        },
        // Teams method POST
        post: (data, callback) => {
            teams.push(data.payload);// Adds the new Team register
            callback(201, data.payload);// Returns the 201 response code with the inserted register to the client
        },
        // Teams method PUT (update/modify)
        put: (data, callback) => {
            if (typeof data.index !== "undefined") {
                if (teams[data.index]) {
                    teams[data.index] = data.payload;// Puts the new payload (register) in the index position (update)
                    return callback(200, teams[data.index]);// Returns the success response, register updated
                }
                return callback(404, {
                    message: `The team # ${data.index} doesn't exists`,// Returns error message if doesn't find the index
                });
            }
            callback(400, { message: "Index not-set" });// Shows a error message for index parameter not-set
        },
        // Teams method DELETE
        delete: (data, callback) => {
            if (typeof data.index !== "undefined") {
                if (teams[data.index]) {
                    // array.filter process to "regenerate" the data array without the element with index n
                    teams = teams.filter(
                        (_team, num) => num != data.index
                    );
                    return callback(204, {
                        message: `Team ID ${data.index} has been deleted`,// Returns a success response, register deleted
                    });
                }
                return callback(404, {
                    message: `The team # ${data.index} doesn't exists`,// Returns error message if doesn't find the index
                });
            }
            callback(400, { message: "Index not-set" });// Shows a error message for index parameter not-set
        },
    };

};
