export const rankAllCountries = (data, type) => {
    let sorted = data.sort((a, b) => b[type] - a[type]);
    const rankedObj = {};
    sorted.forEach((country, index) => {
        country.rank = index + 1;
        rankedObj[country.country] = index + 1;
    });
    return { sorted, rankedObj };
};
