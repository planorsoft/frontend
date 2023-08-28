const validations = {
    code: {
        required: true,
        maxLength: 64,
    },
    symbol: {
        maxLength: 64,
    },
    rate: {
        required: true,
        float: true,
    },
};

export default validations;