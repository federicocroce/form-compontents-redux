import React, { config } from 'react';

class SwitchesGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: '',
            checked: ''
        };
        this.inputProps = this.props.props;
    }


    componentWillMount() {
        this.props.switchesProps.options.map((option, index) => {            
            const value = this.props.switchesProps.type == "radio" ? '' : false;            
            this.setErrorInputDetails(value, option);
        })
    }

    componentDidUpdate(prevProps) {
        this.inputProps = this.props.props;
        // if (this.inputProps.reduxForm.submite != prevProps.props.reduxForm.submite) {
        //     this.handleChange(this.inputProps.reduxForm.values[this.props.switchesProps.name]);
        // }
    }

    handleChange = (value, option) => {

        let checkedValue = false;

        if (this.props.switchesProps.type == "radio") {
            this.setState({ checked: value });
        }
        else {
            checkedValue = !this.state[option.value];
            this.setState({ [option.value]: checkedValue });
        }

        const name = this.returnNameFromType(option);
        value = this.props.switchesProps.type == "radio" ? value : checkedValue;

        const inputValue = {};

        inputValue[name] = value;

        setTimeout(() => {
            this.inputProps.actionsReduxForm.setValues(inputValue);
        }, 500);


    }

    setErrorInputDetails = (value, option) => {
        // const resultError = this.setError();
        const name = this.returnNameFromType(option);
        if (this.props.switchesProps.type != "radio") this.setState({ [name]: false })
        this.inputProps.actionsReduxForm.setInputDetails(this.setDetails(name, value, false, ''));
    }

    // setError = () => {
    //     this.inputProps = this.props.props;
    //     if (this.inputProps.reduxForm.submite) {
    //         let result = {};
    //         if (this.inputProps.reduxForm.submite) {
    //             result = config.fieldValidations.getValidation(this.props.validate, this.inputProps.reduxForm.values[this.props.switchesProps.name], this.inputProps.reduxForm, this.props.required);
    //         }
    //         return result;
    //     }
    // }

    setDetails = (name, value, invalid, error) => {
        const inputValueDetails = {};

        inputValueDetails[name] = {
            value: value,
            invalid: invalid,
            error: error
        }

        return inputValueDetails;
    }

    returnNameFromType = (option) => {
        const switchesProps = this.props.switchesProps;
        return switchesProps.type == "radio" ? switchesProps.name : option.value;
    }

    getInputDetail = () => {
        return (
            this.props.switchesProps.options.map((option, index) => {
                return option;
            })
        )
    };


    render() {
        const props = this.props;
        const inputProps = props.props;
        let value = inputProps.reduxForm.values[props.switchesProps.name];

        const checked = (option) => this.props.switchesProps.type == "radio" ? option.value === this.state.checked : this.state[option.value] == true;

        return (
            <ul className="switches-container">


                {props.switchesProps.options.map((option, index) => {
                    // let value = inputProps.reduxForm.values[option.name];
                    return (
                        <label key={index}  >
                            <input
                                key={index}
                                type={props.switchesProps.type}
                                name={this.returnNameFromType(option)}
                                value={option.value}
                                checked={checked(option)}
                                onChange={(event) => this.handleChange(event.target.value, option)}
                            // checked={}
                            />
                            {option.label}
                        </label>
                    )
                }

                )}

                {/* {this.state.showError ? <label className="error-text">{this.state.error}</label> : null} */}
                <label className="error-text">Seleccione</label>
            </ul>
        )
    }

}

export default SwitchesGroup;