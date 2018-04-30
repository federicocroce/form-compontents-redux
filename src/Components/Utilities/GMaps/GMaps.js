/* global google */

import React from 'react';

// import { setCurrentPlace } from '../../../Actions/actionsCreator';

import KeyValue from '../KeyValue';
import GMapsSearchBox from './GMapsSearchBox';

import { connect } from "react-redux";

import $ from 'jquery-lite'

var currentPlace = null;

const initAutocomplete = (mapElement) => {
    // var map = new google.maps.Map($("#map"), {
    var map = new google.maps.Map(mapElement, {
        center: { lat: -33.8688, lng: 151.2195 },
        zoom: 13,
        mapTypeId: 'roadmap'
    });

    return map;

    // Create the search box and link it to the UI element.
    // var input = $("#pac-input");


    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    // map.addListener('bounds_changed', function () {
    //     searchBox.setBounds(map.getBounds());
    // });


    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.

};


const setCurrentPosition = (mapElements) => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            var icon = {
                url: "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            mapElements.infoWindow.setPosition(pos);

            mapElements.infoWindow.setContent('Location found.');

            mapElements.markers.push(new google.maps.Marker({
                map: mapElements.map,
                icon: icon,
                title: pos.name,
                position: pos
            }));

            mapElements.map.setCenter(pos);
        }, function () {
            handleLocationError(true, mapElements.infoWindow, mapElements.map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, mapElements.infoWindow, mapElements.map.getCenter());
    }
}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}


const renderSerchBox = (params) => {
    return params.props.searchBox ? <GMapsSearchBox map={params.gMapsElements}/> : null;
}
const renderKeyValue = (props) => {
    return props.gMaps && props.keyValuePlace && props.gMaps.currentPlace ? <KeyValue dataKeyValue={props.gMaps.currentPlace.keyValue} /> : null;
}


class GMaps extends React.Component {


    // componentDidUpdate(prevProps, prevState) {
    //     // setCurrentPosition(gMapsElements.map, gMapsElements.markers, gMapsElements.infoWindow);

    //     if (this.props.gMaps.currentPlace !== prevProps.gMaps.currentPlace) {
    //         // this.loadMap();
    //         this.forceUpdate()
    //     }
    // }

    

    componentDidMount() {

        this.gMapsElements = {};

        // var mapElement = document.getElementById('map');
        // var input = document.getElementById('pac-input');
        this.gMapsElements.markers = [];

        this.gMapsElements.map = initAutocomplete(document.getElementById('map'));

        this.gMapsElements.infoWindow = new google.maps.InfoWindow({ map: this.gMapsElements.map });

        this.props.currentLocation ? setCurrentPosition(this.gMapsElements) : null;

        // if (this.props.gMaps !== gMapsElements) {
            this.props.initGMaps(this.gMapsElements);
        // }
    }

    render() {

        const test ="test";

        return (
            <div style={{ height: `500px` }}>
                {renderKeyValue(this.props)}
                {renderSerchBox(this)}
                <div id="map"></div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        gMaps: state.maps.gMapsElements
    };
}


const mapDispatchToProps = dispatch => {
    return {
        initGMaps(gMapsElements) {
            dispatch(React.actions.actionsGMaps.initGMaps(gMapsElements));
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GMaps);

// export default GMaps;

