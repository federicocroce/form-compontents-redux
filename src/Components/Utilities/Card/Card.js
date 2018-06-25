import React, { components } from 'react';

const Card = (props) => {

    const item = props.item.data;

    const dataFormated = () => {

        return [
            {
                key: 'Edad',
                value: item.edad
            },
            {
                key: 'Mail',
                value: item.mail
            },
            {
                key: 'Genero',
                value: item.genero
            },
            {
                key: 'checkbox 1',
                value: item.checkbox1.toString()
            },
            {
                key: 'checkbox 2',
                value: item.checkbox2.toString()
            },
            {
                key: 'checkbox 3',
                value: item.checkbox3.toString()
            },
            {
                key: 'Color',
                value: item.color
            }
        ]
    }

    const back = '#eee';

    let backColor = {
        backgroundColor: back
    }

    return (
        <div className='card' style={backColor} onClick={() => props.onClick(item)}>
            <h2>{item.nombre}</h2>
            <components.KeyValue data={dataFormated()} />
        </div>
    )
};

export default Card;
