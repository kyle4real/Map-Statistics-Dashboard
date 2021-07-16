export const convertToRange = (max, min, value) => {
    const newValue = ((value - min) * (100 - 1)) / (max - min) + 1;
    return newValue;
};

export const unconvertRange = (max, min, value) => {
    const newValue = Math.floor(((value - 1) * (max - min)) / (100 - 1) + 1);
    return newValue;
};
