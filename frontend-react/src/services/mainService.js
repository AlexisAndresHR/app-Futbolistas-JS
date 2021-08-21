/*
* File/code to make the requests to the data API and obtain the real registers
*/
const API_URL = "https://futbolistas-js-backend.vercel.app";

export const listData = async ( {entity = "players"} ) => {
    try {
        const response = await fetch(`${API_URL}/${entity}`);// Send the request with fetch()
        const apiData = await response.json();// Formats the response to JSON
        return apiData;
    }
    catch (error) {
        console.log({error});
    }
};
