import React, { config, functions, actions, components } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class Input extends React.Component {

    constructor(props) {
        super(props);
        this.state = { error: '', focus: false };
    }


    componentWillMount() {
        this.setInputValues("");
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        actions.reduxForm.setInputDetails(this.setErrorInputDetails(nextProps.value));
    }

    handleChange = (value, onChange) => {
        this.setInputValues(value);
        if(onChange) onChange(value);
    }

    onFocus = (onFocus) => {
        this.setState({ focus: true });
        if(onFocus) onFocus();
    }

    onBlur = (onBlur) => {
        setTimeout(() => {
            this.setState({ focus: false });
        }, 300);
        if(onBlur) onBlur();
    }

    setInputValues = (value) => {
        actions.reduxForm.setValues({ [this.props.name]: value });
    }

    setError = (value) => {
        const resultError = this.props.showAllValidations ? config.fieldValidations.getAllValidations(this.props.validate, value, this.props.required) : config.fieldValidations.getOneValidation(this.props.validate, value, this.props.required);
        return resultError;
    }

    setErrorInputDetails = (value) => {
        let resultValidations = {
            invalid: false,
            error: ''
        }
        // var val = functions.isValue(this.props.validate);
        if (functions.isValue(this.props.validate)) resultValidations = this.setError(value);
        return this.setDetails(value, resultValidations.invalid, resultValidations.validations);
    }


    setDetails = (value, invalid, validations) => {
        return {
            [this.props.name]: {
                value,
                invalid,
                validations
            }
        }
    }


    render() {
        let props = this.props;

        let error = props.error != undefined ? props.error : false;
        // if(props.error == undefined) props.error = false;

        const value = props.value != undefined ? props.value : '';

        const inputDetails = actions.reduxForm.getForm().inputDetails[props.name];

        return (

            <div className={`input-text-container ${inputDetails != undefined && props.submite && inputDetails.invalid || error? 'input-error' : ''} ${props.style}`}>
                <div className='custom-input'>
                    <input
                        className="inputMaterial"
                        placeholder=" "
                        type="text"
                        value={value}
                        onChange={(event) => this.handleChange(event.target.value, props.onChange)}
                        onFocus={() => this.onFocus(props.onFocus)}
                        onBlur={() => this.onBlur(props.onBlur)}
                    />
                    <label className="floating">{props.placeholderFloating}</label>
                    <div className="container-placeholder">
                        <label className="placeholder">{props.customPlaceholder}</label>
                    </div>
                    <hr />
                </div>

                <components.ValidationsError inputDetails={inputDetails} submite={props.submite} showAllValidations={props.showAllValidations} focus={this.state.focus}/>
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    const inputDetails = state.reduxForm.inputDetails[ownProps.name];
    return {
        value: state.reduxForm.values[ownProps.name],
        submite: state.reduxForm.submite
    };
}

export default withRouter(connect(
    mapStateToProps,
    null
)(Input));
