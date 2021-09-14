import axios from "axios";

export async function fetchEntries(page = 1) {
    const { data } = await axios.get(`/api/entries?offset=${page}`)
    return data;
}