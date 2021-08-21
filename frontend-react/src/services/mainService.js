/*
* File/code to make the requests to the data API and obtain the real registers
*/
const API_URL = "https://futbolistas-js-backend.vercel.app";

/*
* Method to get/obtain the registers (GET)
*/
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

// Method to create a new register or update one that already exists (POST or PUT)
export const createDataRegister = async ( {entity = "players", dataObject = {}, method, objectId = null} ) => {
    try {
        let url = null;
        if (method === "PUT" && objectId)
            url = `${API_URL}/${entity}/${objectId}`;
        else if (method === "POST")
            url = `${API_URL}/${entity}`;

        console.log( method );
        console.log( url );
        if (!url)
            throw new Error("The parameters aren't right to be sent");

        const response = await fetch(url, {
            method,
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(dataObject),
            mode: "cors",
        });// Send the request with fetch()
        const apiData = await response.json();// Formats the response to JSON
        return apiData;
    }
    catch (error) {
        console.log({error});
    }
};
