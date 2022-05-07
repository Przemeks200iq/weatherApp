import { baseURL } from "./apiKey.js";

export const getInformation = async (location) => {
    try {
        const response = await fetch(`${baseURL}${location}`);

        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            throw response.json();
        }
    } catch (err) {
        return err;
    }
};
