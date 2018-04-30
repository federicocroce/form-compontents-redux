import React from 'react';
import $ from 'jquery-lite'


import ReactTestUtils from 'react-dom/test-utils';

const generateKeyValue = (data) => {
    if ($.isEmptyObject(data)) return;
    return Object.keys(data).map((element, index) => {
        return (
            <div key={index}>
                <label>{data[element].key}</label>
                <label>{data[element].value}</label>
            </div>
        )
    })
};

class KeyValue extends React.Component {

    componentDidUpdate(prevProps, prevState) {
        // setCurrentPosition(gMapsElements.map, gMapsElements.markers, gMapsElements.infoWindow);

        if (this.props.dataKeyValue !== prevProps.dataKeyValue) {
            // this.loadMap();
            this.forceUpdate();
        }
    }

    render() {
        return (
            <div className="value-key-location">
                {generateKeyValue(this.props.dataKeyValue)}
            </div>
        )
    }
}


export default KeyValue;