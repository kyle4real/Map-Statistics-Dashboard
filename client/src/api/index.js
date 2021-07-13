import axios from "axios";

const url = "https://disease.sh/v3/covid-19";

export const getAllCountries = async () => {
    const { data } = await axios.get(`${url}/countries`);
    return data;
};

export const getOneCountry = async (country) => {
    const { data } = await axios.get(`${url}/countries/${country}`);
    return data;
};

export const getHistory = async (country, days = 30) => {
    const { data } = await axios.get(`${url}/historical/${country}?lastdays=${days}}`);
    return data;
};
