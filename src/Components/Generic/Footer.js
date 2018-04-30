import React, { components } from 'react';

const Footer = props => {

    const footer = props.footer;

    return (
        <footer className="container-footer">
            {footer.list.length > 0 ?
                <section>
                    {footer.list.map((data, index) => {
                        return (
                            <a target="_blank" href={data.link} key={index} className="img-tecnologies">
                                <img src={data.img} width="40" height="40"></img>
                            </a>
                        );
                    })}
                </section>
                : null
            }
        </footer>
    );
}

export default Footer;