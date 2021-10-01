import axios from "axios";

export async function fetchEntries(page = 1, filter) {
    const { data } = await axios.get(`/api/entries`, {
        params: {
            offset: page,
            ...filter 
        }
    });
    return data;
}