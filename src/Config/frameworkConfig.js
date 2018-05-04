import React from 'react';

// import Home from '../Components/Sections/Home';

//////////////  COMPONENTS //////////////////
// import Button from '../Components/Utilities/Button';
// import NavigationBar from '../Components/Utilities/NavigationBar';
// import InputText from '../Components/Utilities/InputText';
// import KeyValue from '../Components/Utilities/KeyValue';
// import Spinner from '../Components/Utilities/Spinner';
// import GMaps from '../Components/Utilities/GMaps/GMaps';
// import GMapsSearchBox from '../Components/Utilities/GMaps/GMapsSearchBox';
// import SwitchesGroup from '../Components/Utilities/SwitchesGroup';
// import UploadImg from '../Components/Utilities/UploadImg';
// import Combobox from '../Components/Utilities/Combobox';


import Index from '../Components/Sections/Index';
// import Home from '../Components/Sections/Home';
// import Card from '../Components/Sections/Card';
// import CardDetails from '../Components/Sections/CardDetails';
// import CardsGrid from '../Components/Sections/CardsGrid';
// import User from '../Components/Sections/User';
// import UserDetail from '../Components/Sections/UserDetail';
// import UsersList from '../Components/Sections/UsersList';
// import UserSection from '../Components/Sections/Users/UserSection';
// import UserLoadData from '../Components/Sections/Users/UserLoadData';
// import List from '../Components/Sections/Users/List';
// import Item from '../Components/Sections/Users/Item';
///////////////////////////////////////////////////////////////

//////////////// CONFIG /////////////////////
import storeHistory from './store.js';
import fieldValidations from './validations';
import linksRoutes from './appRoutes';
import firebaseApp from './firebase';
import fireStoreApp from './fireStore';
///////////////////////////////////////////

//////////// ACTIONS ///////////////////////
import actions from "../Actions/indexActions";
import components from "../Components/indexComponents";
import config from "./indexConfig";
import functions from "./indexFunctions";


const frameworkConfig = props => {
    

    Object.assign(React, {
        functions : functions,
        config: config,
        components : components,
        actions: actions        
    });


    //////////////  FUNCTIONS //////////////////
    // React.functions.isUndefinedOrNullOrEmpty = (element) => _.isEmpty(element) || element == null || element == undefined  ? true : false;
    ///////////////////////////////////////////

    // React.config = config;

    // React.actions = actions;
    //////////////  COMPONENTS //////////////////

    // React.components = components;

    ///////////////////////////////////////////

    ///////// CONFIG //////////////////
    
    // React.config.storeHistory = storeHistory;
    // React.config.fieldValidations = fieldValidations;
    // React.config.linksRoutes = linksRoutes;    
    // React.config.firebaseApp = firebaseApp;
    // React.config.fireStoreApp = fireStoreApp;
    // console.log(React.config);
    ///////////////////////////////////////////////

    //////////// ACTIONS ////////////////////
    
    ///////////////////////////////////////////////
    
    // console.log(React);

}

export default frameworkConfig;


