import React from 'react';
import ReactJson from 'react-json-view';

const divStyle = {margin: '20px 0'};

const functions = {};

functions.isFunction = (e) => typeof(e) == "function";

functions.isEmpty = (e) =>  e == "" || JSON.stringify(e) === '{}' || e.length == 0   ? true : false;
functions.isUndefinedOrNull = (e) =>   e == null || e == undefined ? true : false;


functions.isUndefinedOrNullOrEmpty = (e) => !functions.isFunction(e)  ? functions.isUndefinedOrNull(e) : false || functions.isEmpty(e) ? true : false;

functions.jsonView = (json) => <div style={divStyle}> <ReactJson  src={json} theme="monokai" /> </div>;




export default functions;