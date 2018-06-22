import React, { config, functions, actions } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

const SwitchesInput = props => {
    console.log(props.value);
    const value = props.value != undefined ? props.value : '';
    // const value = props.value[props.name] != undefined ? props.value[props.name] : '';

    return (
        <input
            className={props.index}
            key={props.index}
            type={props.type}
            name={props.name}
            // value={value}
            // checked={props.checked(props.option, value, props.name)}
            onChange={(event) => props.onChange(event.target.value, props.option)}
        />
    );
}

const mapStateToProps = (state, ownProps) => {
    // console.log(ownProps.name);
    return {
        value: state.reduxForm.values[ownProps.name],
        // inputDetails: state.reduxForm.inputDetails[ownProps.name]
    };
}

const mapDispatchToProps = dispatch => {
    return {
        reduxForm: actions.reduxForm
    };
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(SwitchesInput));

