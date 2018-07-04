import React from 'react';

const Spinner = props => {

    return (
        <div className="loading loader">
            <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div></div>
            </div>
        </div>
    );
}

export default Spinner;