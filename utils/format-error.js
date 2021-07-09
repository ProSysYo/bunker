const FormatError = (errors) => {
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
    const result = extractedErrors.reduce((acc, item) => {
        Object.keys(item).forEach(key => {
            if (acc.hasOwnProperty.call(key)) {
                acc[key] += ', ' + item[key];
            } else {
                acc[key] = item[key];
            }
        });
        return acc;
    }, {});

    return result
}

module.exports = {FormatError}