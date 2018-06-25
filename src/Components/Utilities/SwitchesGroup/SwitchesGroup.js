import React, { config, functions, actions, components } from 'react';
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
        const newValue = this.isRadio() ? option.value : !actions.reduxForm.getForm().values[name];
        this.setInputValues(newValue, option);
    }

    setInputValues = (value, option) => {
        const name = this.returnNameFromType(option);
        console.log("Set Input");
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

        const classInputText = classNames({
            'input-text-container': true
        });


        return (
            <ul className="switches-container">


                {props.switchesProps.options.map((option, index) => {

                    const name = this.returnNameFromType(option);
                    return (
                        
                        <label key={index} className={`${props.switchesProps.style}`} >
                            <components.SwitchesInput
                                index={index}
                                option={option}
                                key={index}
                                type={props.switchesProps.type}
                                name={name}
                                checked={this.checked}
                                onChange={this.handleChange}
                            />
                            {option.label}
                        </label>
                    )
                }

                )}

            </ul>
        )
    }
}


const mapStateToProps = (state, ownProps) => {

    return {
        submite: state.reduxForm.submite,
    };
}

export default withRouter(connect(
    mapStateToProps,
    null
)(SwitchesGroup));
