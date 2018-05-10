import React, { config } from 'react';

class SwitchesGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: '',
            checked: '',
            someCheked: false
        };
        this.inputProps = this.props.props;

        this.handleChange = this.handleChange.bind(this);
        this.setErrorInputDetails = this.setErrorInputDetails.bind(this);
        this.checked = this.checked.bind(this);
        // this.handleChange = this.handleChange.bind(this);
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

            // const algo = this.props.switchesProps.options.filter(option => option.value == true && option.groupName == this.props.switchesProps.groupName) ? this.setState({ someCheked: true }) : this.setState({ someCheked: false });
        }

        const name = this.returnNameFromType(option);
        value = this.props.switchesProps.type == "radio" ? value : checkedValue;

        const inputValue = {};

        inputValue[name] = value;

        setTimeout(() => {
            this.inputProps.actionsReduxForm.setValues(inputValue);
            this.setErrorInputDetails(value, option);
            if (this.props.switchesProps.type != "radio") {

                const cheked = this.props.switchesProps.options.map(option => this.inputProps.reduxForm.inputDetails[option.value].value).filter(val => val == true);

                cheked.length > 0 ? this.setState({ someCheked: true }) : this.setState({ someCheked: false })

                // console.log();
            }
            else{
                this.state.checked != '' ? this.setState({ someCheked: true }) : this.setState({ someCheked: false });
            }
        }, 500);



    }

    setErrorInputDetails = (value, option) => {
        // const resultError = this.setError();
        const name = this.returnNameFromType(option);
        // if (this.props.switchesProps.type != "radio") this.setState({ [name]: false })
        this.inputProps.actionsReduxForm.setInputDetails(this.setDetails(name, value, false, ''));
    }

    setError = () => {
        this.inputProps = this.props.props;
        if (this.inputProps.reduxForm.submite) {
            let result = {};
            if (this.inputProps.reduxForm.submite) {
                result = config.fieldValidations.getValidation(this.props.validate, this.inputProps.reduxForm.values, this.inputProps.reduxForm, this.props.required);
            }
            return result;
        }
    }

    setDetails = (name, value, invalid, error) => {
        const inputValueDetails = {};

        inputValueDetails[name] = {
            groupName: this.props.switchesProps.groupName,
            value: value,
            invalid: invalid,
            error: error
        }

        return inputValueDetails;
    }

    returnNameFromType = (option) => {
        const switchesProps = this.props.switchesProps;
        return switchesProps.type == "radio" ? switchesProps.nameGroup : option.value;
    }

    getInputDetail = () => {
        return (
            this.props.switchesProps.options.map((option, index) => {
                return option;
            })
        )
    };

    checked = (option) => {
        return this.props.switchesProps.type == "radio" ? option.value === this.state.checked : this.state[option.value] == true;
    }

    render() {
        const props = this.props;
        const inputProps = props.props;
        let value = inputProps.reduxForm.values[props.switchesProps.nameGroup];



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
                                checked={this.checked(option)}
                                onChange={(event) => this.handleChange(event.target.value, option)}
                            // checked={}
                            />
                            {option.label}
                        </label>
                    )
                }

                )}

                {/* {this.state.showError ? <label className="error-text">{this.state.error}</label> : null} */}
                {!this.state.someCheked ? <label className="error-text">Seleccione al menos uno.</label> : null}
                
            </ul>
        )
    }

}

export default SwitchesGroup;