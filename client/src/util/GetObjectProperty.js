export const getFieldValue = (object, key) => {
    const keys = key.split(".");
    let value = object;

    keys.forEach(nestedKey => {
        value = value[nestedKey];
    });

    return value;
};