import React, { components } from 'react';

const MainRightSection = props => {

    return (
        <section className="main-right-section">

            {props.content.map((data, index) => {
                return (
                    data.list.length > 0 ?
                        <section key={index} className="table">
                            <i className={data.generic.icon}></i>

                            <i className='icon-playlist_add actions-item add-icon' onClick={() => data.createItem()}></i>

                            <div className="container-detail">
                                <h2>{data.generic.title}</h2>
                                {data.list.map((item, index) => { return <article key={index}><components.ContentCard item={item} removeItem={data.removeItem} /></article> })}
                            </div>
                        </section>
                        : null
                );
            })}

        </section >
    );
}

export default MainRightSection;