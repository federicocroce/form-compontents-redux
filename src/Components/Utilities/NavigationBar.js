import React from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';

// import AppBar from 'material-ui/AppBar';

// import PhotoGrid from './PhotoGrid'




const NavigationBar = props => {

    const linksRoutes = props.linksRoutes;

    const data = props.data;

    const generateLinks = (linksRoutes) => {
        return linksRoutes.map((route, index) => (
            linksRoutes[index].show != false ? <li  key={index}><NavLink exact={linksRoutes[index].exact} to={linksRoutes[index].path} > {linksRoutes[index].name}</NavLink></li> : null
        ))
    };

    const generateRutes = (linksRoutes, data) => {
        return linksRoutes.map((route, index) => {
            return <Route exact={linksRoutes[index].exact} path={linksRoutes[index].path} key={index} component={linksRoutes[index].component} data={data}></Route>
        })
    };

    return (
        <div>
            <ul>{generateLinks(linksRoutes)}</ul>
            {generateRutes(linksRoutes, data)}
        </div>
    );

}

export default NavigationBar;