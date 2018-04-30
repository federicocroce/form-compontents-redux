import React from 'react';
import Parser from 'html-react-parser';

const ContentCard = props => {

    return (
        <div>
            <i className='icon-delete actions-item remove-icon' onClick={() => props.removeItem(props.item.id)}></i>
            <h3>{Parser(props.item.details.title)} {props.item.details.institution ? <a target="_blank" href={props.item.details.link}>@{Parser(props.item.details.institution)}</a> : null}</h3>
            <h4>{props.item.details.beginDate} - {props.item.details.endDate}</h4>

            {props.item.details.content.length > 0 ? props.item.details.content.map((item, index) => { return <li key={index}>{Parser(item)} </li> }) : null}
        </div>
    );
}

export default ContentCard;