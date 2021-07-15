const parseTheData = (data) => {
    const values = Object.values(data);
    const mapped = values.map((curr, i) => curr - values[i - 1]).slice(1);
    return mapped;
};

export default parseTheData;
