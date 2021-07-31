/**
 * File that contains the code to connect the server functions with the corresponding file
 */
const resources = require("./resources");// Link the file that contains temporarily data to be shown in the app interfaces
const players = require("./routes/players");
const coaches = require("./routes/coaches");
const teams = require("./routes/teams");
const trainings = require("./routes/trainings");

module.exports = {
    route: (data, callback) => {
        callback(200, { message: "You're in /route" });
    },
    // Give/connects the data with the corresponding file
    // The callback is the data that will be returned
    players: players(resources.players),// Players
    coaches: coaches(resources.coaches),// Coaches
    teams: teams(resources.teams),// Teams
    trainings: trainings(resources.trainings),// Teams
    // Response in case of a non-existent app route
    notFound: (data, callback) => {
        callback(404, { message: "Not found" });
    },
};
