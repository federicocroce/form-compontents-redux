import React from 'react';
import Parser from 'html-react-parser';

const AsidePersonalData = props => {

    const personalData = props.personalData;

    return (
        <aside className="aside-left-container">
            {Object.keys(personalData.mainData).length != 0 ?
                <div className="img-profile-container">
                    {/*<img src={personalData.mainData.img}></img>*/}
                    <amp-img src={personalData.mainData.img} layout="responsive" width={personalData.mainData.width} height={personalData.mainData.height}></amp-img>
                    <div className="content-img">
                        <h1 className="name">{personalData.mainData.name}</h1>
                        <p>{personalData.mainData.position}</p>
                    </div>
                </div>
                : null}



            {personalData.list.length > 0 ?
                <section>
                    {personalData.list.map((data, index) => {
                        return (
                            <a href={data.link} key={index} className="container-detail-personal-data table">
                                <i className={data.icon}></i>
                                <div className="container-detail">
                                    <span className='text'>{Parser(data.content)}</span>
                                    <span className='text'>{Parser(data.subcontent)}</span>
                                </div>
                            </a>
                        );
                    })}
                </section>
                : null
            }

            {JSON.stringify(personalData.skills) != '{}' ?
                <section className="container-detail-personal-data table skills">
                    <i className={personalData.skills.main.icon}></i>
                    <div className="container-detail">
                        <span className='text'>{Parser(personalData.skills.main.content)}</span>

                        {personalData.skills.details.map((data, index) => {
                            return (
                                <div className='skill-container' key={index}>
                                    <span className='text'>{Parser(data.skill)}</span>
                                    <input type="range" min="0" max={personalData.skills.maxRate} defaultValue={data.rate} disabled='true' className="slider" id="myRange"/>
                                </div>
                            );
                        })}
                    </div>
                </section>
                : null
            }
        </aside>
    );
}

export default AsidePersonalData;