"use strict";

import React, { functions, actions } from 'react';

const fieldValidations = {}

const setObjetError = (name, msg, invalid) => { return { name, msg, invalid } };

fieldValidations.requiredSelectPicker = (selected, msg) => value => {
    return selected ? setObjetError("requiredSelectPicker", msg, false) : setObjetError("requiredSelectPicker", msg, true)
};

fieldValidations.required = params => value => functions.isValue(value) ? setObjetError("required", params, false) : setObjetError("required", params, true);

const required = params => value => functions.isValue(value) ? setObjetError("required", params, false) : setObjetError("required", params, true);

// const required = (params) => value => value ? undefined : 'Ingrese ' + params;

const number = params => value => value && isNaN(Number(value)) ? setObjetError("number", params, true) : setObjetError("number", params, false);
// const number = params => value => value && isNaN(Number(value)) ? params + ' solo puede ser numérica' : undefined;

const notNumber = params => value => value && value.match(/\d/g) ? setObjetError("notNumber", params, true) : setObjetError("notNumber", params, false);

const email = params => value => functions.isValue(value) && value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/) ? setObjetError("email", params, false) : setObjetError("email", params, true);

const minValue = (min, msg) => value => value && value < min ? setObjetError("minValue", msg, true) : setObjetError("minValue", msg, false);

// const maxValue = (max, msg) => value => value && value > max ? setObjetError("maxValue", msg, true) : setObjetError("maxValue", msg, false);

// const someSelected = (min, label) => value => value && value < min ? label : undefined;

// const requiredSelected = (min, label) => value => value && value < min ? label : undefined;




// const minValue = (min) => {
//     console.log(min);
// }
// const maxValue = (max) => {
//     console.log(max);
// }


const requiredSelected = params => array => array.length == 0 ? setObjetError("requiredSelected", params, true) : setObjetError("requiredSelected", params, false);

fieldValidations.validations = {

    // age: (min, max) => [number('Su edad solo puede ser numérica'), minValue(min, 'Su edad debe ser igual o mayor a ' + min + ' años')]
    age: (min) => new Set([number('Su edad solo puede ser numérica'), minValue(min, 'Su edad debe ser igual o mayor a ' + min + ' años'), required('Ingrese su edad')]),
    name: () => new Set( [notNumber('Su nombre solo puede contener letras'), required('Ingrese su nombre')]),
    city: () => new Set( [notNumber('Su localidad solo puede contener letras'), required('Ingrese su localidad')]),
    cheked: () => new Set( [requiredSelected('Seleccione al menos uno')]),
    selectPicker: () => new Set( [required('Seleccione un item')]),
    email: () => new Set( [email('Email inválido'), required('Ingrese un email')])
}


// fieldValidations.getAllValidations = (validationsFunctions, value, required) => {

//     let validations = validationsFunctions.map((val, index, array) => {
//         let validation = {};

//         const result = val(value);

//         const validationResult = functions.isValue(result) ? undefined : result.name == "required" && required || result.name != "required" ? result : null;

//         if (!functions.isValue(validationResult))
//             validation = {
//                 msg: validationResult.msg,
//                 invalid: validationResult.invalid
//             }

//         return validation;

//     });

//     let invalid = !functions.isValue(validations.filter(val => {
//         return val.invalid
//     })) ? true : false;

//     return {
//         validations,
//         invalid
//     }
// };



fieldValidations.getAllValidations = (validationsFunctions, value, required) => {

    // validationsFunctions.add(fieldValidations.required('Campo Requerido'));

    let validations = [...validationsFunctions].map((val, index, array) => {
        let validation = {};

        const result = val(value);

        const validationResult = !functions.isValue(result) ? undefined : result.name == "required" && required || result.name != "required" ? result : null;

        if (functions.isValue(validationResult))
            validation = {
                msg: validationResult.msg,
                invalid: validationResult.invalid
            }

        return validation;

    });

    let invalid = functions.isValue(validations.filter(val => {
        return val.invalid
    })) ? true : false;

    return {
        validations,
        invalid
    }
};


fieldValidations.getOneValidation = (validationsFunctions, value, required) => {
    let validations = [...validationsFunctions].map((val, index, array) => {
        let validation = {};

        const result = val(value);

        const validationResult = !functions.isValue(result) ? undefined : result.name == "required" && required || result.name != "required" ? result : null;

        if (functions.isValue(validationResult))
            validation = {
                msg: validationResult.msg,
                invalid: validationResult.invalid
            }

        return validation;
    }).filter(val => {
        return val != undefined
    });

    let invalid = functions.isValue(validations.filter(val => {
        return val.invalid
    })) ? true : false;

    return {
        validations,
        invalid
    }
}





export default fieldValidations;

