import React, { config } from 'react';

class Input extends React.Component {

    constructor(props) {
        super(props);
        this.state = { error: '' };
        this.inputProps = this.props.props;
    }

 
    componentDidMount() {
        const inputValueDetails = {};        
        this.inputProps.actionsReduxForm.setValues('');
        this.inputProps.actionsReduxForm.setInputDetails(this.setDetails('', true, ''));
    }

    componentDidUpdate(prevProps) {
        this.inputProps = this.props.props;
        if(this.inputProps.reduxForm.submite != prevProps.props.reduxForm.submite){
            this.handleChange(this.inputProps.reduxForm.values[this.props.name]);
        }

        // if(!this.props.required) this.props.validate.splice(-1,1);

        // console.log(this.inputProps.reduxForm);
    }

    handleChange = (value) =>{
        const inputValue = {};
        inputValue[this.props.name] = value;
        this.inputProps.actionsReduxForm.setValues(inputValue);
        const result = this.setError();
        this.setState({ error: result.error });
        this.inputProps.actionsReduxForm.setInputDetails(this.setDetails(value, result.invalid, result.error));
    }

    setError = () =>{
        let result = {};
        if (this.inputProps.reduxForm.submite) {
            result = config.fieldValidations.getValidation(this.props.validate, this.inputProps.reduxForm.values[this.props.name], this.inputProps.reduxForm, this.props.required);
        }
        return result;
    }

    setDetails = (value, invalid, error) =>{
        const inputValueDetails = {};

         inputValueDetails[this.props.name] = {
            value: value,
            invalid: invalid,
            error: error
        }

        return inputValueDetails;
    }


    render() {
        const props = this.props;
        const inputProps = props.props;
        let value = inputProps.reduxForm.values[props.name];

        return (

            <div className='input-text-container'>
                <div>
                    <input className="inputMaterial" placeholder=" " type="text" value={value != undefined ? value : ''} onChange={(event) => this.handleChange(event.target.value)} />
                    {/*                  <input {...field.input} id={fieldProps.id} className="inputMaterial" placeholder=" " required={fieldProps.required} /> */}
                    <label className="floating">{props.placeholderFloating}</label>
                    <div className="container-placeholder">
                        <label className="placeholder">{props.customPlaceholder}</label>
                    </div>
                    <hr />
                </div>
                {/* <label className="error-text">{this.setError().error}</label> */}
                <label className="error-text">{this.state.error}</label>
            </div>
        );
    }
}


export default Input;