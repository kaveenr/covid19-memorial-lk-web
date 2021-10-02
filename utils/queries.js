import axios from "axios";

export async function fetchEntries(page = 1, filter, locale) {
    const { data } = await axios.get(`/api/entries`, {
        params: {
            offset: page,
            locale: locale,
            ...filter 
        }
    });
    return data;
}