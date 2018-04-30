import $ from 'jquery-lite';
import _ from "lodash";

const functions = {};

functions.isUndefinedOrNullOrEmpty = (element) => _.isEmpty(element) || element == null || element == undefined  ? true : false;

export default functions;