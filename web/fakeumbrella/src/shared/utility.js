import startCase from 'lodash/startCase';
import toLower from 'lodash/toLower';
import '@gouch/to-title-case';
import map from 'lodash/map';
import compact from 'lodash/compact';
import trim from 'lodash/trim';

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = ( value, rules ) => {
    let isValid = true;
    if ( !rules ) {
        return true;
    }

    if ( rules.required ) {
        isValid = value.trim() !== '' && isValid;
    }

    if ( rules.minLength ) {
        isValid = value.length >= rules.minLength && isValid
    }

    if ( rules.maxLength ) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if ( rules.isEmail ) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test( value ) && isValid
    }

    if ( rules.isNumeric ) {
        const pattern = /^\d+$/;
        isValid = pattern.test( value ) && isValid
    }

    if ( rules.minNumber ) {
        isValid = value >= rules.minNumber && isValid
    }

    return isValid;
}

export const addFormFeedback = ( value, rules ) => {
    let feedback = null;
    if ( !rules ) {
        return feedback;
    }

    if ( rules.required && value.trim() === '' ) {
        return 'This field is required.';
    }

    if ( rules.minLength && value.length <= rules.minLength) {
        return 'Should not be less than ' + rules.minLength + ' characters.';
    }

    if ( rules.maxLength && value.length >= rules.maxLength ) {
        return 'Should not be more than ' + rules.maxLength + ' characters.';
    }

    if ( rules.isEmail ) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!pattern.test( value )) {
            return 'Please provide a valid email.';
        }
    }

    if ( rules.isNumeric ) {
        const pattern = /^\d+$/;
        if (!pattern.test( value ) ) {
            return 'Please provide a number.';
        }
    }

    if ( value < rules.minNumber ) {
        return `Value cannot be less than ${rules.minNumber}`
    }

    return feedback;
}

export const formDataIsValid = ( formData ) => {
    let data = true;
    for ( let key in formData ) {
        if (formData[key].validation.required) {
            data = data && formData[key].valid;
        }
    }
    return data;
}

export const capitalize = string  => startCase(toLower(string));

export const getInitials = str => {
    if (str === undefined || str.length === 0) {
        return '';
    }
    else if (str === 'Unknown User') {
        return '?';
    }

    const matches = str.match(/\b(\w)/g);
    if (matches) {
        return matches.join('').slice(0,3);
    } else {
        return str;
    }
}

export const sumChars = str => {
    let sum = 0;
    for(let i = 0; i < str.length; i++) {
        sum += str.charCodeAt(i);
    }
    return sum;
}

export const toTitle = string => trim(string).replace(/\s\s+/g, ' ').toTitleCase();

export const joinClasses = classNames => compact(classNames).join(' ');

export const addIdToData = (object) => map(object, (val, key) => ({...val, id: key}));

export const removeWhitespace = str => str.replace(/ /g,'');

export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};