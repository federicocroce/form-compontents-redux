import React from 'react';

const KeyValue = (props) => {

    return (
        <div className='key-value'>
            {props.data.map((item, index) => {
                return (
                    <div className='container table' key={index}>
                        <label>{item.key}</label>
                        <label>{item.value}</label>
                    </div>
                )
            })
            }
        </div>
    )
};

export default KeyValue;
