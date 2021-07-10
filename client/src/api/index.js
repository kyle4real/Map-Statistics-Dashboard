import axios from "axios";

const url = "https://disease.sh/v3/covid-19/countries";

export const getAllCountries = async () => {
    const { data } = await axios.get(url);
    return data;
};
