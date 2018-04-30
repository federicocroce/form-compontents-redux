import React from 'react';
import Parser from 'html-react-parser';

const Toast = props => {

    return (
        <div className='message-content'>
            {props.messages.map((data, index) => {
                return (
                    <div className={data.type} key={index}>
                        <span>{Parser(data.text)}</span>
                    </div>
                );
            })}
        </div>
    );
}

export default Toast;