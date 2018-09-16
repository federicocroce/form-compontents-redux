import React from 'react';
import classNames from 'classnames';


const ValidationsError = (props) => {

    const showAllValidations = showAllValidations == undefined ? false : showAllValidations;


    const renderOneValid = () => {
        const oneValidation = props.inputDetails.validations.filter(val => val.invalid);

        return (
            <div>
                {oneValidation.length > 0 ?
                    <label className="validation-text error-text">{oneValidation[0].msg}</label> :
                    null}
            </div>
        )
    }

    const renderAllValid = () => {
        return props.inputDetails.validations.map((validation, index) => {
            // console.log(validation);

            const classValidationsText = classNames({
                'validation-text': true,
                'error-text': validation.invalid && props.submite && props.error,
                'succes-text': !validation.invalid && props.submite && !props.error,
            });
            return (
                <label key={index} className={classValidationsText}>{validation.msg}</label>
            )
        })
    };




    return (
        props.inputDetails && props.submite ?
            <div className={`validations-container ${props.focus ? "visible" : ''}`}>
                {
                    props.showAllValidations ?
                        renderAllValid()
                        :
                        renderOneValid()
                }
            </div>
            : null
    )
}



export default ValidationsError;