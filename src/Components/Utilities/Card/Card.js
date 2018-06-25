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
                value: item.email
            },
            {
                key: 'Género',
                value: item.genero
            },
            {
                key: 'Checkbox 1',
                value: item.checkbox1 != undefined ? item.checkbox1.toString() : ''
            },
            {
                key: 'Checkbox 2',
                value: item.checkbox2 != undefined ? item.checkbox2.toString() : ''
            },
            {
                key: 'Checkbox 3',
                value: item.checkbox3 != undefined ? item.checkbox3.toString() : ''
            },
            {
                key: 'Color',
                value: item.color.value
            }
        ]
    }


    let backColor = {
        backgroundColor: '#CFD8DC'
    };

    if (item.color.data) {
        const back = item.color.data.color;

        backColor = {
            backgroundColor: back
        }
    }

    return (
        <div className='card' style={backColor}>
            <i className='icon-delete' onClick={() => props.removeItem(props.item.id)}></i>
            <div onClick={() => props.onClick(item)}>
                <h2>{item.nombre}</h2>
                <components.KeyValue data={dataFormated()} />
            </div>
        </div>
    )
};

export default Card;
