import React, { config, functions, actions } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class SwitchesInput extends React.Component {
    render() {
        const props = this.props;
        const value = props.value != undefined ? props.value : '';
        const isRadio = () => props.type == "radio" ? true : false;

        const checked = (option) => {
            return isRadio() ? option.value === value : props.value;
        }

        return (
            <input
                className={props.index}
                checked={checked(props.option)}
                value={props.name}
                key={props.index}
                type={props.type}
                name={props.name}
                onChange={(event) => props.onChange(event.target.value, props.option)}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {

    return {
        value: state.reduxForm.values[ownProps.name]
    };
}

export default withRouter(connect(
    mapStateToProps,
    null
)(SwitchesInput));

