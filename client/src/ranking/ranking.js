export const rankAllCountries = (data) => {
    let sorted = data.sort((a, b) => b.cases - a.cases);
    sorted.forEach((country, index) => (country.rank = index + 1));
    return data;
};
