/**
 * validations can be required, minLength, maxLength, email, float, number
 * @param {object} validations 
 * @param {object} item 
 * @returns errors
 */
const validate = (validations, item) => {
    let errors = {};
    for (const key in validations) {
        if (Object.hasOwnProperty.call(validations, key)) {
            const element = validations[key];
            if (element.required && !item[key]) {
                errors[key] = `Lütfen bir değer giriniz.`;
            }
            if (element.minLength && item[key] && item[key].length < element.minLength) {
                errors[key] = `En az ${element.minLength} karakter olmalıdır. `;
            }
            if (element.maxLength && item[key] && item[key].length > element.maxLength) {
                errors[key] = `En fazla ${element.maxLength} karakter olmalıdır. `;
            }
            if (element.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(item[key])) {
                errors[key] = `Geçerli bir e-posta adresi olmalıdır. `;
            }
            if (element.float && !/^[+-]?([0-9]*[.])?[0-9]+$/.test(item[key])) {
                errors[key] = `Ondalıklı sayı olmalıdır.`;
            }
            if (element.number && !/^[0-9]+$/.test(item[key])) {
                errors[key] = `Sadece rakamlardan oluşmalıdır.`;
            }
        }
    }
    return errors;
};

export default validate;