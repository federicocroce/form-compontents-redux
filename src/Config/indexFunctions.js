import React from 'react';
import $ from 'jquery-lite';
import _ from "lodash";
import ReactJson from 'react-json-view';

const divStyle = { margin: '20px 0' };

const functions = {};

functions.isFunction = (e) => typeof (e) == "function";

// functions.isUndefinedOrNullOrEmpty = (element) => !functions.isFunction(element)  ? functions.isExist(element) : false || functions.isUndefinedOrNull(element)  ? true : false;


functions.isUndefinedOrNullOrEmpty = (element) => {
    if (functions.isFunction(element)) {
        return false
    }
    else if (functions.isExist(element)) {
        return true;
    }

    // !functions.isFunction(element)  ? _.isEmpty(element) : false || functions.isUndefinedOrNull(element)  ? true : false;
}



// functions.isUndefinedOrNullOrEmpty = (element) => !functions.isFunction(element)  ? _.isEmpty(element) : false || functions.isUndefinedOrNull(element)  ? true : false;





functions.isEmpty = (e) => e == "" || JSON.stringify(e) === '{}' || e.length == 0 ? true : false;
functions.isNull = (e) => e == null ? true : false;

functions.isExist = (e) => e == null || e == undefined || e == "" || JSON.stringify(e) === '{}' || e.length == 0 ? true : false;

functions.isUndefinedOrNull = (e) => e == null || e == undefined ? true : false;

functions.jsonView = (json) => <div style={divStyle}> <ReactJson src={json} theme="monokai" /> </div>;




export default functions;