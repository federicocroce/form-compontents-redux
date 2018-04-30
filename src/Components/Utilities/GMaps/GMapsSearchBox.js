/* global google */

import React from 'react';

// import { initGMaps } from '../../../Actions/actionsCreator';
import InputText from "../InputText";

// import KeyValue from '../KeyValue';
// import GMaps from './GMaps';

import { connect } from "react-redux";

// import $ from 'jquery-lite'

var currentPlace = null;

// map.addListener('bounds_changed', function () {
//     searchBox.setBounds(map.getBounds());
// });

// const addListenerToMap = (props, searchBox) => {
//     searchBox.setBounds(props.gMapsElements.map.getBounds());
// };

const addListener = (props, searchBoxGmaps, searchBox) => {
    // searchBox.addListener('places_changed', function (currentPlaceState) {

    var newProps = props.map;
    var places = searchBoxGmaps.getPlaces();
    // var markers = [];

    if (places.length === 0) {
        return;
    }

    // Clear out the old props.markers.
    newProps.markers.forEach(function (marker) {
        marker.setMap(null);
    });
    // newProps.newProps.markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function (place) {
        if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
        }
        var icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.

        newProps.markers.push(new google.maps.Marker({
            map: newProps.map,
            icon: icon,
            title: place.name,
            position: place.geometry.location
        }));

        currentPlace = {
            "keyValue":{},
            "data":{},
            "formatted_address": places[0].formatted_address
        };
        // console.log(place.address_components);
        place.address_components.map((place, index) => {
            var types = place.types[0];

            switch (types) {
                case 'street_number':
                    currentPlace.keyValue.streetNumber = {
                        key: 'Número: ',
                        value: place.long_name
                    }
                    currentPlace.data.streetNumber = place.long_name;
                    break;
                case 'route':
                    currentPlace.keyValue.route = {
                        key: 'Dirección: ',
                        value: place.long_name
                    }
                    currentPlace.data.route = place.long_name;
                    // currentPlace.keyValue.route = place.long_name;
                    break;
                case 'sublocality_level_1':
                    currentPlace.keyValue.sublocality = {
                        key: 'Zona: ',
                        value: place.long_name
                    }
                    currentPlace.data.sublocality = place.long_name;
                    // currentPlace.keyValue.sublocality = place.long_name;
                    break;
                case 'locality':
                    currentPlace.keyValue.locality = {
                        key: 'Localidad: ',
                        value: place.short_name
                    }
                    currentPlace.data.locality = place.short_name;
                    // currentPlace.keyValue.locality = place.short_name;
                    break;
                case 'administrative_area_level_1':
                    currentPlace.keyValue.province = {
                        key: 'Provincia: ',
                        value: place.short_name
                    }
                    currentPlace.data.province = place.short_name;
                    // currentPlace.keyValue.province = place.long_name;
                    break;
                case 'country':
                    currentPlace.keyValue.country = {
                        key: 'País: ',
                        value: place.long_name
                    }
                    currentPlace.data.country = place.long_name;
                    // currentPlace.keyValue.country = place.long_name;
                    break;
                case 'postal_code':
                    currentPlace.keyValue.postalCode = {
                        key: 'Código Postal: ',
                        value: place.long_name
                    }
                    currentPlace.data.postalCode = place.long_name;
                    // currentPlace.keyValue.postalCode = place.long_name;
                    break;

                default:
                    return currentPlace
            }
        });

        var poly = new google.maps.Polyline({
            strokeColor: '#000000',
            strokeOpacity: 1.0,
            strokeWeight: 3
        });
        poly.setMap(newProps.map);

        newProps.infoWindow.setPosition(place.geometry.location);

        if (currentPlace.route && currentPlace.streetNumber)
            newProps.infoWindow.setContent(currentPlace.route.value + " " + currentPlace.streetNumber.value);

        if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
        } else {
            bounds.extend(place.geometry.location);
        }
    });
    var map = newProps.map;
    map.fitBounds(bounds);

    var gMapsElements = {
        currentPlace,
        markers: newProps.markers,
        map
    }
    // gMapsElements gMapsElements.markers

    props.initGMaps(gMapsElements);

};



class GMapsSearchBox extends React.Component {


    // componentDidMount() {

    //     // var mapElement = document.getElementById('map');
    //     // var input = document.getElementById('pac-input');
    //     // var markers = [];

    //     // var map = initAutocomplete(mapElement);

    //     // var infoWindow = new google.maps.InfoWindow({ map: map });
    //     var searchBox = new google.maps.places.SearchBox(document.getElementById('pac-input'));

    //     // setCurrentPosition(map, markers, infoWindow);
    //     searchBox.addListener('places_changed', addListener.bind(null, this.props, searchBox));
    //     // this.props.gMapsElements.map.addListener('bounds_changed', addListenerToMap.bind(null, this.props, searchBox));
    //     // map.addListener('bounds_changed', function () {

    //     // var place = currentPlace.map((object, index) =>
    //     //     <p key={index}> {JSON.stringify(object)} </p>
    //     // )
    // }

    componentDidUpdate(prevProps, prevState) {
        // setCurrentPosition(gMapsElements.map, gMapsElements.markers, gMapsElements.infoWindow);

        if (this.props.map) {
            var searchBox = document.getElementById('pac-input');
            var searchBoxGmaps = new google.maps.places.SearchBox(searchBox);
            searchBoxGmaps.addListener('places_changed', addListener.bind(null, this.props, searchBoxGmaps, searchBox));
        }
    }



    render() {

        // var a = false;

        return (
            <div>
                <div>
                    <InputText id="pac-input" name="adress" placeholderFloating="Escriba su dirección" customPlaceholder="ej: Av. 9 dejulio 1000, Buenos Aires"/>
                </div>
            </div>
        );
    }
}

/*
const GMapsSearchBox = (props) => {

                    props.componentDidMount();

                return (
        <div>
                    <input id="pac-input" type="text" placeholder="Search Box" />
                    <div id="map"></div>
                </div>
                );


}*/



const mapStateToProps = state => {
    return {
        gMapsElements: state.maps.gMapsElements
    };
}


const mapDispatchToProps = dispatch => {
    return {
        initGMaps(place) {
            dispatch(React.actions.actionsGMaps.initGMaps(place));
        }
    };
}

// initGMaps(gMapsElements) {
//             dispatch(initGMaps(gMapsElements));
//         }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GMapsSearchBox);

// export default GMapsSearchBox;

