import React from 'react';
import { Field } from 'redux-form';

const renderInput = (field) => {
    let fieldProps = { ...field };
    let hasError = fieldProps.meta.invalid && fieldProps.meta.submitFailed;
    return (
        <div className={`input-text-container ${hasError ? 'input-error' : ''} ${fieldProps.style}`}>
            <div>
                <input {...field.input} id={fieldProps.id} className="inputMaterial" placeholder=" " required={fieldProps.required} />
                <label className="floating">{fieldProps.placeholderFloating}</label>
                <div className="container-placeholder">
                    <label className="placeholder">{fieldProps.customPlaceholder}</label>
                </div>
                <hr />
            </div>
            {hasError ? <label className="error-text">{fieldProps.meta.error}</label> : null}
        </div>
    )
}


const InputText = (props) => {

    return (
        <Field props={props} component={renderInput} name={props.name} validate={props.validate} />
    );
}


export default InputText;