"use strict";

import React, { functions, actions } from 'react';

const fieldValidations = {}

const setObjetError = (name, msg, invalid) => { return { name, msg, invalid } };

fieldValidations.requiredSelectPicker = (selected, msg) => value => { 
    return selected ? setObjetError("requiredSelectPicker", msg, false) : setObjetError("requiredSelectPicker", msg, true)
};

const required = params => value => !functions.isUndefinedOrNullOrEmpty(value) ? setObjetError("required", params, false) : setObjetError("required", params, true);

// const required = (params) => value => value ? undefined : 'Ingrese ' + params;

const number = params => value => value && isNaN(Number(value)) ? setObjetError("number", params, true) : setObjetError("number", params, false);
// const number = params => value => value && isNaN(Number(value)) ? params + ' solo puede ser numérica' : undefined;

const notNumber = params => value => value && value.match(/\d/g) ? setObjetError("notNumber", params, true) : setObjetError("notNumber", params, false);

const minValue = (min, msg) => value => value && value < min ? setObjetError("minValue", msg, true) : setObjetError("minValue", msg, false);

// const someSelected = (min, label) => value => value && value < min ? label : undefined;

// const requiredSelected = (min, label) => value => value && value < min ? label : undefined;

const requiredSelected = params => array => array.length == 0 ? setObjetError("requiredSelected", params, true) : setObjetError("requiredSelected", params, false);


fieldValidations.validations = {
    age: [number('Su edad solo puede ser numérica'), minValue(18, 'Su edad debe ser igual o mayor a ' + 18 + ' años'), required('Ingrese su edad')],
    name: [notNumber('Su nombre solo puede contener letras'), required('Ingrese su nombre')],
    city: [notNumber('Su localidad solo puede contener letras'), required('Ingrese su localidad')],
    cheked: [requiredSelected('Seleccione al menos uno')],
    selectPicker: [required('Ingrese su localidad')],
};


fieldValidations.getAllValidations = (validationsFunctions, value, required) => {

    let validations = validationsFunctions.map((val, index, array) => {
        let validation = {};

        const result = val(value);

        const validationResult = functions.isUndefinedOrNullOrEmpty(result) ? undefined : result.name == "required" && required || result.name != "required" ? result : null;

        if (!functions.isUndefinedOrNullOrEmpty(validationResult))
            validation = {
                msg: validationResult.msg,
                invalid: validationResult.invalid
            }

        return validation;

    });

    let invalid = !functions.isUndefinedOrNullOrEmpty(validations.filter(val => {
        return val.invalid
    })) ? true : false;

    return {
        validations,
        invalid
    }
};


fieldValidations.getOneValidation = (validationsFunctions, value, required) => {
    let validations = validationsFunctions.map((val, index, array) => {
        let validation = {};

        const result = val(value);

        const validationResult = functions.isUndefinedOrNullOrEmpty(result) ? undefined : result.name == "required" && required || result.name != "required" ? result : null;

        if (!functions.isUndefinedOrNullOrEmpty(validationResult))
            validation = {
                msg: validationResult.msg,
                invalid: validationResult.invalid
            }

        return validation;
    }).filter(val => {
        return val != undefined
    });

    let invalid = !functions.isUndefinedOrNullOrEmpty(validations.filter(val => {
        return val.invalid
    })) ? true : false;

    return {
        validations,
        invalid
    }
}





// fieldValidations.getValidation = (validations, value, required) => {
//     // if(!required) validations.splice(-1,1);
//     let error = validations.map((val, index, array) => {
//         const result = val(value);

//         // if(functions.isUndefinedOrNullOrEmpty(result)) return undefined;

//         const a = functions.isUndefinedOrNullOrEmpty(result) ? undefined : result.name == "required" && required || result.name != "required" ? result.msg : null;
//         return a;
//         // if (index != array.length - 1) {
//         //     return val(value);
//         // }
//         // else if (index == array.length - 1 && required) { // si el campo no esta requerido entonces no se ejecuta la ultima funcion
//         //     return val(value)
//         // }
//     }).filter(val => {
//        return val != undefined
//     });
//     let invalid = !functions.isUndefinedOrNullOrEmpty(error) ? true : false;

//     return {
//         error,
//         invalid
//     }
// }


export default fieldValidations;


// const formatValidateArray = (validate) => {
//     if (!validate) return;

//     var validateFunction = [];

//     validate.map((functionName, index) => {
//         validateFunction.push(eval(functionName));
//     })

//     return validateFunction;
// }
