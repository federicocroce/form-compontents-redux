import React, { config, functions, actions } from 'react';

class Input extends React.Component {

    constructor(props) {
        super(props);
        this.state = { error: '', showError: false, value: '' };
        // this.inputProps = this.props.props;
    }


    componentWillMount() {
        // this.setErrorInputDetails('');
    }

    componentDidUpdate(prevProps) {
        console.log(prevProps);
        // this.inputProps = this.props.props;
        // if (this.inputProps.reduxForm.submite != prevProps.props.reduxForm.submite) {
        //     this.setState({ showError: !this.state.showError })
        // }
    }

    handleChange = (value) => {
        this.setState({ value: value });
        actions.actionsReduxForm.setValues({ [this.props.name]: value });
        // this.setErrorInputDetails(value);
    }

    setError = () => {
        const resultError = config.fieldValidations.getValidation(this.props.validate, this.inputProps.reduxForm.values[this.props.name], this.props.required);
        this.setState({ error: resultError.error });
        return resultError;
    }

    setErrorInputDetails = (value) => {
        let resultError = {
            invalid: false,
            error: ''
        }
        if (!functions.isUndefinedOrNullOrEmpty(this.props.validate)) resultError = this.setError();
        actions.actionsReduxForm.setInputDetails(this.setDetails(value, resultError.invalid, resultError.error));
    }


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
        // const inputProps = props.props;
        // let value = inputProps.reduxForm.values[props.name];


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
                {this.state.showError ? <label className="error-text">{this.state.error}</label> : null}
            </div>
        );
    }
}


export default Input;