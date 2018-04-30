import storeHistory from './store.js';
import fieldValidations from './validations';
import linksRoutes from './appRoutes';
import firebaseApp from './firebase';
import fireStoreApp from './fireStore';


const config = {    
    storeHistory,
    fieldValidations,
    // linksRoutes: linksRoutes(),
    firebaseApp,
    fireStoreApp
}

export default config;