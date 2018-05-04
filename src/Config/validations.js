import React, { functions, actions } from 'react';

const fieldValidations = {}

const required = params => value => !functions.isUndefinedOrNullOrEmpty(value) ? undefined : 'Ingrese ' + params;

// const required = (params) => value => value ? undefined : 'Ingrese ' + params;

const number = params => value => value && isNaN(Number(value)) ? params + ' solo puede ser numérica' : undefined;
// const number = params => value => value && isNaN(Number(value)) ? params + ' solo puede ser numérica' : undefined;

const notNumber = params => value => value && value.match(/\d/g) ? params + ' solo puede contener letras' : undefined;

const minValue = (min, label) => value => value && value < min ? label : undefined;

const test = params => value => params + value + 'algo';

fieldValidations.validations = {
    // age: [test('Su edad ')],
    age: [number('Su edad '), minValue(18, 'Su edad debe ser igual o mayor a ' + 18 + ' años'), required('su edad')],
    name: [notNumber('Su nombre'), required('su nombre')]
}

fieldValidations.getValidation = (validations, value, form, required) => {
    // if(!required) validations.splice(-1,1);
    let error = validations.map((val, index, array) => {
        if (index != array.length - 1) {
            return val(value);
        }
        else if (index == array.length - 1 && required) { // si el campo no esta requerido entonces no se ejecuta la ultima funcion
            return val(value)
        }
    }).filter(val => val != undefined);
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
