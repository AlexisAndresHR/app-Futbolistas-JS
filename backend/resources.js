/**
 * Here is the temporary data to be returned when a determined route is accessed
 */
module.exports = {
    players: [
        { firstName: "Jose de Jesus", lastName: "Corona", position: "Goalkeeper", team: "Cruz Azul FC" },
        { firstName: "Marc-Andre", lastName: "Ter Stegen", position: "Goalkeeper", team: "FC Barcelona" },
        { firstName: "Santiago", lastName: "Gimenez", position: "Forward", team: "Cruz Azul FC" },
        { firstName: "Memphis", lastName: "Depay", position: "Forward", team: "FC Barcelona" },
    ],
    coaches: [
        { firstName: "Juan", lastName: "Reynoso", country: "Peru", team: "Cruz Azul FC" },
        { firstName: "Ronald", lastName: "Koeman", country: "Holland", team: "FC Barcelona" },
    ],
    teams: [
        { name: "Cruz Azul FC", country: "Mexico", stadium: "Azteca", league: "Liga MX" },
        { name: "FC Barcelona", country: "Spain", stadium: "Camp Nou", league: "La Liga" },
    ],
    trainings: [
        { team: "Cruz Azul FC", place: "La Noria", date: "July 23", hour: "17:00 pm" },
        { team: "FC Barcelona", place: "Ciutat Esportiva Joan Gamper", date: "July 23", hour: "14:00 pm" },
        { team: "FC Barcelona", place: "Ciutat Esportiva Joan Gamper", date: "July 24", hour: "10:00 am" },
        { team: "Cruz Azul FC", place: "La Noria", date: "July 24", hour: "09:00 am" },
    ],
};
