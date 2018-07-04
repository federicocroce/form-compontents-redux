import React from 'react';
import $ from 'jquery-lite';
import _ from "lodash";
import ReactJson from 'react-json-view';

const divStyle = {margin: '20px 0'};

const functions = {};

functions.isUndefinedOrNullOrEmpty = (element) => typeof(element) != "function" ? _.isEmpty(element) : false || element == null || element == undefined  ? true : false;
functions.jsonView = (json) => <div style={divStyle}> <ReactJson  src={json} theme="monokai" /> </div>;




export default functions;