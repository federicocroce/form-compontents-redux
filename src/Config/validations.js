import React, { functions, actions } from 'react';

const fieldValidations = {}

const required = params => value => !functions.isUndefinedOrNullOrEmpty(value) ? undefined : 'Ingrese ' + params;

// const required = (params) => value => value ? undefined : 'Ingrese ' + params;

const number = params => value => value && isNaN(Number(value)) ? params + ' solo puede ser numérica' : undefined;

const notNumber = params => value => value && !isNaN(Number(value)) ? params + ' solo puede contener letras' : undefined;

const minValue = (min, label) => value => value && value < min ? label : undefined;

const test = params => value => params + value + 'algo';

fieldValidations.validations = {
    // age: [test('Su edad ')],
    age: [number('Su edad '), minValue(18, 'Su edad debe ser igual o mayor a 18 años'), required('su edad')],
    name: [notNumber('Su nombre'), required('su nombre')]
}

fieldValidations.getValidation = (validations, value, form) => {
    let error = validations.map((val, index) => val(value)).filter(val => val != undefined);
    let invalid = !functions.isUndefinedOrNullOrEmpty(error) ? true : false;
    
    return {
        error,
        invalid
    }
}


export default fieldValidations;



// const formatValidateArray = (validate) => {
//     if (!validate) return;

//     var validateFunction = [];

//     validate.map((functionName, index) => {
//         validateFunction.push(eval(functionName));
//     })

//     return validateFunction;
// }
