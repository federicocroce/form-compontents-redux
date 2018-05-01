import React from 'react';
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




const Input = (props) => {
    const inputProps = props.props;

    const handleChange = (event) => {
        const inputValue = {};
        inputValue[props.name] = event.target.value;

        inputProps.actionsReduxForm('setValues', inputValue)
        console.log(inputProps.reduxForm.values)
    }

    return (
        // <div className={`input-text-container ${hasError ? 'input-error' : ''} ${fieldProps.style}`}>
        <div className='input-text-container'>
            <div>
                <input className="inputMaterial" placeholder=" " type="text" value={inputProps.reduxForm.values[inputProps.name]} onChange={(event) => handleChange(event)} />
                {/*                  <input {...field.input} id={fieldProps.id} className="inputMaterial" placeholder=" " required={fieldProps.required} /> */}
                <label className="floating">{props.placeholderFloating}</label>
                <div className="container-placeholder">
                    <label className="placeholder">{props.customPlaceholder}</label>
                </div>
                <hr />
            </div>
            {/*              {hasError ? <label className="error-text">{fieldProps.meta.error}</label> : null} */}
        </div>
    );
}


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

