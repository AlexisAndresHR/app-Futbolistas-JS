/**
 * Code for the Players requests processing
 */
module.exports = function playersHandler(players) {
    return {
        // Players method GET
        get: (data, callback) => {
            if (typeof data.index !== "undefined") {
                console.log("Handler players", { data });
                if (players[data.index]) {
                    // If founds the data index, returns the specific index register
                    return callback(200, players[data.index]);
                }
                return callback(404, {
                    message: `The player # ${data.index} doesn't exists`,// Returns error message if doesn't find the index
                });
            }
            callback(200, players);// Returns all the data registers (Players)
        },
        // Players method POST
        post: (data, callback) => {
            players.push(data.payload);// Adds the new Player register
            callback(201, data.payload);// Returns the 201 response code with the inserted register to the client
        },
        // Players method PUT (update/modify)
        put: (data, callback) => {
            if (typeof data.index !== "undefined") {
                if (players[data.index]) {
                    players[data.index] = data.payload;// Puts the new payload (register) in the index position (update)
                    return callback(200, players[data.index]);// Returns the success response, register updated
                }
                return callback(404, {
                    message: `The player # ${data.index} doesn't exists`,// Returns error message if doesn't find the index
                });
            }
            callback(400, { message: "Index not-set" });// Shows a error message for index parameter not-set
        },
        // Players method DELETE
        delete: (data, callback) => {
            if (typeof data.index !== "undefined") {
                if (players[data.index]) {
                    // array.filter process to "regenerate" the data array without the element with index n
                    players = players.filter(
                        (_player, num) => num != data.index
                    );
                    return callback(204, {
                        message: `Player ID ${data.index} has been deleted`,// Returns a success response, register deleted
                    });
                }
                return callback(404, {
                    message: `The player # ${data.index} doesn't exists`,// Returns error message if doesn't find the index
                });
            }
            callback(400, { message: "Index not-set" });// Shows a error message for index parameter not-set
        },
    };

};
