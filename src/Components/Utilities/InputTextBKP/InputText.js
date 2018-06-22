import React, { config, functions, actions } from 'react';

class Input extends React.Component {

    constructor(props) {
        super(props);
        this.state = { error: '', showError: false, value: '' };
        // this.inputProps = this.props.props;
    }


    componentWillMount() {
        this.setInputValues("");
    }

    // componentDidUpdate(prevProps) {
    //     console.log(this.props.name);
    //     // this.inputProps = this.props.props;
    //     if (this.props.submite) {
    //         this.setInputValues("");
    //     }
    // }

    handleChange = (value) => {
        this.setState({ value: value });
        this.setInputValues(value);
        // this.setErrorInputDetails(value);
    }

    setInputValues = (value) =>{
        const input = {
            value: { [this.props.name]: value },
            inputDetails: this.setErrorInputDetails(value)
        }
        actions.reduxForm.setValues(input);
    }

    setError = (value) => {
        const resultError = config.fieldValidations.getValidation(this.props.validate, value, this.props.required);
        this.setState({ error: resultError.error });
        return resultError;
    }

    setErrorInputDetails = (value) => {
        let resultError = {
            invalid: false,
            error: ''
        }
        if (!functions.isUndefinedOrNullOrEmpty(this.props.validate)) resultError = this.setError(value);
        return this.setDetails(value, resultError.invalid, resultError.error);
    }



    // handleChange = (value) => {
    //     this.setState({ value: value });
    //     actions.reduxForm.setValues({ [this.props.name]: value });
    //     this.setErrorInputDetails(value);
    // }

    // setError = (value) => {
    //     const resultError = config.fieldValidations.getValidation(this.props.validate, value, this.props.required);
    //     this.setState({ error: resultError.error });
    //     return resultError;
    // }

    // setErrorInputDetails = (value) => {
    //     let resultError = {
    //         invalid: false,
    //         error: ''
    //     }
    //     if (!functions.isUndefinedOrNullOrEmpty(this.props.validate)) resultError = this.setError(value);
    //     actions.reduxForm.setInputDetails(this.setDetails(value, resultError.invalid, resultError.error));
    // }


    setDetails = (value, invalid, error) => {
        return {
            [this.props.name]: {
                value: value,
                invalid: invalid,
                error: error
            }
        }
    }


    render() {
        const props = this.props;

        // console.log(props.submite);
        console.log(props.name);
        return (

            <div className='input-text-container'>
                <div>
                    <input className="inputMaterial" placeholder=" " type="text" value={this.state.value} onChange={(event) => this.handleChange(event.target.value)} />
                    <label className="floating">{props.placeholderFloating}</label>
                    <div className="container-placeholder">
                        <label className="placeholder">{props.customPlaceholder}</label>
                    </div>
                    <hr />
                </div>
                {props.submite ? <label className="error-text">{this.state.error}</label> : null}
            </div>
        );
    }
}


export default Input;