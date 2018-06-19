import React, { config, functions, actions } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

class Input extends React.Component {

    constructor(props) {
        super(props);
        this.state = { error: '', focus: false };
    }


    componentWillMount() {
        this.setInputValues("");
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
        this.setState({ focus: false });
        if(onBlur) onBlur();
    }

    setInputValues = (value) => {
        actions.reduxForm.setValues({ [this.props.name]: value });
        actions.reduxForm.setInputDetails(this.setErrorInputDetails(value));
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
        if (!functions.isUndefinedOrNullOrEmpty(this.props.validate)) resultValidations = this.setError(value);
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
        const props = this.props;

        if(props.error == undefined) props.error = false;

        const value = props.value != undefined ? props.value : '';

        return (

            <div className={`input-text-container ${props.inputDetails != undefined && props.submite && props.inputDetails.invalid && props.error? 'input-error' : ''} ${props.style}`}>
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



                {
                    props.inputDetails && props.submite ?
                        <div className={`validations-container ${this.state.focus ? "visible" : ''}`}>
                            {
                                props.showAllValidations ?
                                    props.inputDetails.validations.map((validation, index) => {
                                        // console.log(validation);

                                        const classValidationsText = classNames({
                                            'validation-text': true,
                                            'error-text': validation.invalid && props.submite && props.error,
                                            'succes-text': !validation.invalid && props.submite && !props.error,
                                        });
                                        return (
                                            <label key={index} className={classValidationsText}>{validation.msg}</label>
                                        )
                                    })
                                    :
                                    props.inputDetails.validations && props.inputDetails.validations[0].invalid ? <label className="validation-text error-text">{props.inputDetails.validations[0].msg}</label> : null
                            }
                        </div>
                        : null
                }
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    const inputDetails = state.reduxForm.inputDetails[ownProps.name];
    return {
        value: state.reduxForm.values[ownProps.name],
        submite: state.reduxForm.submite,
        inputDetails: state.reduxForm.inputDetails[ownProps.name]
    };
}

export default withRouter(connect(
    mapStateToProps,
    null
)(Input));
