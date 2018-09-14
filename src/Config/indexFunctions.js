import React from 'react';
import ReactJson from 'react-json-view';

const divStyle = { margin: '20px 0' };

const functions = {};

functions.isFunction = (e) => typeof (e) == "function";
functions.isObject = (e) => typeof (e) == "object";
functions.isEmpty = (e) => e == null || e == undefined || e == "" || e.length == 0 ? true : false;
functions.jsonView = (json) => <div style={divStyle}> <ReactJson src={json} theme="monokai" /> </div>;


functions.isValue = (element) =>
    functions.isFunction(element) ? true : // verifico si es una funcion
        functions.isEmpty(element) ? false : // verifico si existe y no esta vacio
            functions.isObject(element) && element.size == undefined && JSON.stringify(element) === '{}' ? false : // verifico si es objeto y si es Map
                element.size == 0 ? false : // si es map que sea mayor a 0
                    true;



// (() => {
//     if (!functions.isValue({})) console.log("Objeto vacio");
//     if (functions.isValue({ name: 1 })) console.log("Objeto");
//     if (!functions.isValue("")) console.log("String vacio");
//     if (functions.isValue("asd")) console.log("String");
//     if (!functions.isValue([])) console.log("Array vacio");
//     if (functions.isValue([1, 2, 3])) console.log("Array");
//     if (!functions.isValue(undefined)) console.log("Undefiend");
//     if (!functions.isValue(null)) console.log("null");
//     if (!functions.isValue(new Map())) console.log("Map vacio");
//     if (functions.isValue(new Map().set(1, "valor asociado con 'una cadena'"))) console.log("Map");
// })()


export default functions;