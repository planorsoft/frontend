const validations = {
    name: {
        required: true,
        maxLength: 64,
    },
    address: {
        required: true,
        maxLength: 128,
    },
    city: {
        required: true,
        maxLength: 64,
    },
    district: {
        maxLength: 64,
    },
    postCode: {
        maxLength: 16,
    },
    country: {
        required: true,
        maxLength: 64,
    },
    phoneNumber: {
        maxLength: 64,
    },
    website: {
        maxLength: 64,
    },
    governmentId: {
        required: true,
        maxLength: 64,
    },
};

export default validations;