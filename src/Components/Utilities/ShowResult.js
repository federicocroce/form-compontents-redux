import React, { actions, components, config, functions } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Parser from 'html-react-parser';
import classNames from 'classnames';


const ShowResult = (props) => {
    return (
        <div>
            {functions.jsonView(props.reduxForm)}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        reduxForm: state.reduxForm
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actionsReduxForm: actions.actionsReduxForm
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ShowResult));
