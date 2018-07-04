import React from 'react';
import Parser from 'html-react-parser';

const KeyValue = (props) => {

    return (
        <div className='key-value'>
            {props.data.map((item, index) => {
                item.value = item.value == undefined ? '' : item.value
                return (
                    <div className='container table' key={index}>
                        <label>{item.key}</label>
                        <span>{Parser(item.value)}</span>
                    </div>
                )
            })
            }
        </div>
    )
};

export default KeyValue;
