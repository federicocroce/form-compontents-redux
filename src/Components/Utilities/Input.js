import React, { config } from 'react';
// import { Field } from 'redux-form';

// const renderInput = (field) => {
//     let fieldProps = { ...field };
//     let hasError = fieldProps.meta.invalid && fieldProps.meta.submitFailed;
//     return (
//         <div className={`input-text-container ${hasError ? 'input-error' : ''} ${fieldProps.style}`}>
//             <div>
//                 <input {...field.input} id={fieldProps.id} className="inputMaterial" placeholder=" " required={fieldProps.required} />
//                 <label className="floating">{fieldProps.placeholderFloating}</label>
//                 <div className="container-placeholder">
//                     <label className="placeholder">{fieldProps.customPlaceholder}</label>
//                 </div>
//                 <hr />
//             </div>
//             {hasError ? <label className="error-text">{fieldProps.meta.error}</label> : null}
//         </div>
//     )
// }


// class Input extends React.Component {
const Input = props => {
    // constructor(props) {
    //     super(props);
    //     this.state = { error: '' };
    // }


    // render() {
    // const props = this.props;
    const inputProps = props.props;
    let value = inputProps.reduxForm.values[props.name];

    // if (value == undefined) {
    //     value = inputProps.reduxForm.values[props.name];
    //     return;
    // }

    const handleChange = (event) => {
        const inputValue = {};
        inputValue[props.name] = event.target.value;

        // inputProps.actionsReduxForm('setValues', inputValue)
        inputProps.actionsReduxForm.setValues(inputValue);
        console.log(inputProps.reduxForm.values)
    }



    let hasError = inputProps.reduxForm.invalid && inputProps.reduxForm.submite;





    const setError = () => {
        let error = [];
        if (inputProps.reduxForm.submite) {
            error = config.fieldValidations.getValidation(props.validate, inputProps.reduxForm.values[props.name], inputProps.reduxForm);
            // this.setState({ error: error[0] });
        }
        return error;
    }

    return (

        <div className='input-text-container'>
            <div>
                <input className="inputMaterial" placeholder=" " type="text" value={value != undefined ? value : ''} onChange={(event) => handleChange(event)} />
                {/*                  <input {...field.input} id={fieldProps.id} className="inputMaterial" placeholder=" " required={fieldProps.required} /> */}
                <label className="floating">{props.placeholderFloating}</label>
                <div className="container-placeholder">
                    <label className="placeholder">{props.customPlaceholder}</label>
                </div>
                <hr />
            </div>
            {/* {hasError ? <label className="error-text">{error}</label> : null} */}
            {/* <label className="error-text">{setError()}</label> */}
            {/* Submite: {inputProps.reduxForm.submite.toString()} */}
        </div>
    );
}
// }


export default Input;







// import React from 'react';
// // import { Field } from 'redux-form';

// const renderInput = (field) => {
//     let fieldProps = { ...field };
//     let hasError = fieldProps.meta.invalid && fieldProps.meta.submitFailed;
//     return (
//         <div className={`input-text-container ${hasError ? 'input-error' : ''} ${fieldProps.style}`}>
//             <div>
//                 <input {...field.input} id={fieldProps.id} className="inputMaterial" placeholder=" " required={fieldProps.required} />
//                 <label className="floating">{fieldProps.placeholderFloating}</label>
//                 <div className="container-placeholder">
//                     <label className="placeholder">{fieldProps.customPlaceholder}</label>
//                 </div>
//                 <hr />
//             </div>
//             {hasError ? <label className="error-text">{fieldProps.meta.error}</label> : null}
//         </div>
//     )
// }


// class Input extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = { value: '' };

//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleChange(event) {
//         this.setState({ value: event.target.value });
//     }

//     render() {
//         const inputProps = props.props;

//         return (
//             <input type="text" value={inputProps.reduxForm.values} onChange={(event) => inputProps.actionsReuxForm('setValues', event.target.value)} />
//         );
//     }
// }


// export default Input;

