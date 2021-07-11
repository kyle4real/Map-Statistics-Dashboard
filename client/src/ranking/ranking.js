export const rankAllCountries = (data, type) => {
    let sorted = data.sort((a, b) => b[type] - a[type]);
    sorted.forEach((country, index) => {
        country.rank = index + 1;
    });
    console.log(sorted);
    return sorted;
};
