import React, { components } from 'react';
import classNames from 'classnames';

const Header = (props) => {
    const headerProps = props.headerProps,
    state = props.state;
    return (
        <header>
            <div className={classNames({ "container-actions": true }, { 'active': state.activeActions })}>
                <i className='icon-chat' onClick={() => headerProps.setToast('Fede')}></i>
                <i className='icon-brightness_medium' onClick={() => headerProps.setThem()}></i>
                <i className="icon-print" onClick={() => window.print()}></i>
                <i className={headerProps.loginClass} onClick={() => headerProps.toogleAuth()}></i>
            </div>
            <i className='icon-menu' onClick={() => headerProps.setActiveMenu()}></i>
        </header>
    );
}

export default Header;