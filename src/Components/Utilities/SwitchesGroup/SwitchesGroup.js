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
        const inputValueDetails = {};
        const inputValue = {};
        if (this.props.switchesProps == "radio") {
            inputValue[this.props.switchesProps.name] = ''
            this.inputProps.actionsReduxForm.setInputDetails(this.setDetails(this.props.switchesProps.name, '', true, ''));
            this.inputProps.actionsReduxForm.setValues(inputValue);
        }
        else {
            this.props.switchesProps.options.map((option, index) => {
                // this.inputProps.actionsReduxForm.setValues('');
                inputValue[option.value] = ''
                
                this.inputProps.actionsReduxForm.setInputDetails(this.setDetails(this.returnNameFromType(option), false, true, ''));
            })
        }

    }

    componentDidUpdate(prevProps) {
        this.inputProps = this.props.props;
        if (this.inputProps.reduxForm.submite != prevProps.props.reduxForm.submite) {
            this.handleChange(this.inputProps.reduxForm.values[this.props.switchesProps.name]);
        }

        // if(!this.props.required) this.props.validate.splice(-1,1);

        // console.log(this.inputProps.reduxForm);
    }

    handleChange = (value) => {
        this.setState({ checked: value });
        const inputValue = {};
        // setTimeout(function () {
        inputValue[this.props.switchesProps.name] = value;
        this.inputProps.actionsReduxForm.setValues(inputValue);
        const result = this.setError();
        this.setState({ error: result.error });
        this.inputProps.actionsReduxForm.setInputDetails(this.setDetails(this.props.switchesProps.name, value, result.invalid, result.error));

        // }, 0.1);



        // this.inputProps.actionsReduxForm.setInputDetails(this.setDetails(this.returnNameFromType(option), value, result.invalid, result.error));
    }

    setError = () => {
        let result = {};
        if (this.inputProps.reduxForm.submite) {
            result = config.fieldValidations.getValidation(this.props.validate, this.inputProps.reduxForm.values[this.props.switchesProps.name], this.inputProps.reduxForm, this.props.required);
        }
        return result;
    }

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
                                checked={option.value === this.state.checked}
                                onChange={(event) => this.handleChange(event.target.value)}
                            // checked={}
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

export default SwitchesGroup;