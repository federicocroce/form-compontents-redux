import React from 'react';
import classNames from 'classnames';


const ValidationsError = (props) => {
   
    const showAllValidations = showAllValidations == undefined ? false : showAllValidations;

    return (
        props.inputDetails && props.submite ?
            <div className={`validations-container ${props.focus ? "visible" : ''}`}>
                {
                    props.showAllValidations ?
                        props.inputDetails.validations.map((validation, index) => {
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
                        :
                        props.inputDetails.validations && props.inputDetails.validations[0].invalid ? <label className="validation-text error-text">{props.inputDetails.validations[0].msg}</label> : null
                }
            </div>
            : null
    )
}

export default ValidationsError;