import React, { config, functions, actions } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

class SwitchesGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = { error: '', focus: false };
    }


    componentWillMount() {
        const value = this.isRadio() ? '' : false;
        this.setInputValues(value);
    }

    handleChange = (value) => {
        this.setInputValues(value);
    }

    onFocus = () => {
        this.setState({ focus: true });
    }

    onBlur = () => {
        this.setState({ focus: false });
    }

    setInputValues = (value, option) => {
        // this.props.switchesProps.options.map((option, index) => {

            const newValue = this.isRadio() ? value : option;
            const name = this.returnNameFromType(option);

            // this.setErrorInputDetails(value, option);
            actions.reduxForm.setValues({ [name]: newValue });
            // actions.reduxForm.setInputDetails(this.setErrorInputDetails(value));
        // })
    };

    isRadio = () =>  this.props.switchesProps.type == "radio" ? true : false;

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
    };

    returnNameFromType = (option) => {
        const switchesProps = this.props.switchesProps;
        return switchesProps.type == "radio" ? switchesProps.groupName : option.value;
    }

    getInputDetail = () => {
        return (
            this.props.switchesProps.options.map((option, index) => {
                return option;
            })
        )
    };

    checked = (option, value) => {
        return this.props.switchesProps.type == "radio" ? option.value === value : this.state[option.value] == true;
    }


    render() {
        const props = this.props;
        const value = props.value != undefined ? props.value : '';


        const classInputText = classNames({
            'input-text-container': true,
            'input-error': props.inputDetails != undefined && props.submite ? props.inputDetails.invalid : false,
        });


        return (
            <ul className="switches-container">


                {props.switchesProps.options.map((option, index) => {
                    // let value = inputProps.reduxForm.values[option.name];
                    return (
                        <label key={index}  >
                            <input
                                className={index}
                                key={index}
                                type={props.switchesProps.type}
                                name={this.returnNameFromType(option)}
                                value={option.value}
                                checked={this.checked(option, value)}
                                onChange={(event) => this.handleChange(event.target.value, option)}
                            // checked={}
                            />
                            {option.label}
                        </label>
                    )
                }

                )}

                {/* {this.state.showError ? <label className="error-text">{this.state.error}</label> : null} */}
                {/* {!this.state.someCheked ? <label className="error-text">Seleccione al menos uno.</label> : null} */}

            </ul>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    // console.log(ownProps.name);
    const groupName = ownProps.switchesProps.groupName;
    const inputDetails = state.reduxForm.inputDetails[groupName];

    const value = () => {
        if (ownProps.switchesProps.type == "radio") {
            return state.reduxForm.values[groupName];
        }
        else {
            const values = [];
            ownProps.switchesProps.options.map((option) => {
                values.push(state.reduxForm.values[option.value]);
            });
            return values;
        }
    };



    return {
        value: value(),
        submite: state.reduxForm.submite,
        inputDetails: state.reduxForm.inputDetails[groupName]
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
)(SwitchesGroup));
