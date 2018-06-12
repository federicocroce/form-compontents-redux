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
        if (this.isRadio()) {
            this.setInputValues('');
        }
        else {
            this.props.switchesProps.options.map((option, index) => {
                this.setInputValues(false, option);
            });
        }

    }

    handleChange = (value, option) => {
        const name = this.returnNameFromType(option);
        const newValue = this.isRadio() ? value : !actions.reduxForm.getForm().values[name];
        this.setInputValues(newValue, option);
    }

    // onFocus = () => {
    //     this.setState({ focus: true });
    // }

    // onBlur = () => {
    //     this.setState({ focus: false });
    // }

    setInputValues = (value, option) => {
        const name = this.returnNameFromType(option);
        actions.reduxForm.setValues({ [name]: value });
        actions.reduxForm.setInputDetails(this.setErrorInputDetails(value, name));
    };

    isRadio = () => this.props.switchesProps.type == "radio" ? true : false;

    setError = (value) => {
        const resultError = this.props.showAllValidations ? config.fieldValidations.getAllValidations(this.props.validate, value, this.props.required) : config.fieldValidations.getOneValidation(this.props.validate, value, this.props.required);
        return resultError;
    }

    setErrorInputDetails = (value, name) => {
        let resultValidations = {
            invalid: false,
            error: ''
        }
        // if (!functions.isUndefinedOrNullOrEmpty(this.props.validate)) resultValidations = this.setError(value);
        // return this.setDetails(value, resultValidations.invalid, resultValidations.validations);
        return this.setDetails(name, value, resultValidations.invalid, resultValidations.validations);
    }


    setDetails = (name, value, invalid, validations) => {
        return {
            [name]: {
                groupName: this.props.switchesProps.groupName,
                value,
                invalid,
                validations
            }
        }
    };

    returnNameFromType = (option) => {
        return this.isRadio() ? this.props.switchesProps.groupName : option.value;
    }

    getInputDetail = () => {
        return (
            this.props.switchesProps.options.map((option, index) => {
                return option;
            })
        )
    };

    checked = (option, value, name) => {
        return this.isRadio() ? option.value === value : actions.reduxForm.getForm().values[name];
    }


    render() {
        const props = this.props;
        const value = props.value != undefined ? props.value : '';

        console.log(value);

        const classInputText = classNames({
            'input-text-container': true,
            'input-error': props.inputDetails != undefined && props.submite ? props.inputDetails.invalid : false,
        });


        return (
            <ul className="switches-container">


                {props.switchesProps.options.map((option, index) => {
                    // let value = inputProps.reduxForm.values[option.name];
                    const name = this.returnNameFromType(option);
                    return (
                        
                        <label key={index}  >
                            <components.SwitchesInput
                                index={index}
                                key={index}
                                type={props.switchesProps.type}
                                name={name}
                                value={option.value}
                                checked={this.checked}
                                onChange={this.handleChange}
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
            const values = {};
            // ownProps.switchesProps.options.map((option) => {
            //     values[state.reduxForm.values[option.value]];
            // });
            return values;
        }
    };



    return {
        values: ownProps.switchesProps.options.map((option) => {
            return [state.reduxForm.values[option.value]];
        }),
        value: state.reduxForm.values[groupName],
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
