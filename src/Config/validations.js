const fieldValidations = {}

const required = params => value => value ? undefined : 'Ingrese ' + params;

const number = params => value => value && isNaN(Number(value)) ? params + ' solo puede ser numérica' : undefined;

const notNumber = params => value => value && !isNaN(Number(value)) ? params + ' solo puede contaner letras' : undefined;

const minValue = (min, label) => value => value && value < min ? label : undefined;



fieldValidations.validations = {
    age: [number('Su edad '), minValue(18, 'Su edad debe ser igual o mayor a 18 años'), required('su edad')],
    name: [notNumber('Su nombre'), required('su nombre')]
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
