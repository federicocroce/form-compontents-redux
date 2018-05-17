import React, { config, functions, actions } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

class Input extends React.Component {

    constructor(props) {
        super(props);
        this.state = { error: '', focus: false };
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
        // this.setState({ value: value });
        this.setInputValues(value);
        // this.setErrorInputDetails(value);
    }

    onFocus = () => {
        this.setState({ focus: true });
    }

    onBlur = () => {
        this.setState({ focus: false });
    }

    setInputValues = (value) => {
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
        let resultValidations = {
            invalid: false,
            error: ''
        }
        if (!functions.isUndefinedOrNullOrEmpty(this.props.validate)) resultValidations = this.setError(value);
        return this.setDetails(value, resultValidations.invalid, resultValidations.validations);
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


    setDetails = (value, invalid, validations) => {
        return {
            [this.props.name]: {
                value,
                invalid,
                validations
            }
        }
    }


    render() {
        const props = this.props;
        const value = props.value != undefined ? props.value : '';


        const inputText = classNames({
            'input-text-container': true,
            'input-error': props.inputDetails != undefined ? props.inputDetails.invalid : false,
        });

        return (

            <div className={inputText}>
                <div>
                    <input
                        className="inputMaterial"
                        placeholder=" "
                        type="text"
                        value={value}
                        onChange={(event) => this.handleChange(event.target.value)}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                    />
                    <label className="floating">{props.placeholderFloating}</label>
                    <div className="container-placeholder">
                        <label className="placeholder">{props.customPlaceholder}</label>
                    </div>
                    <hr />
                </div>

                {
                    props.inputDetails && this.state.focus ?
                        props.inputDetails.validations.map((validation, index) => {
                            console.log(validation);
                            return (
                                <label key={index} className="error-text">{validation.msg}</label>
                            )
                        }
                        )
                        : null
                }


            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    // console.log(ownProps.name);
    const inputDetails = state.reduxForm.inputDetails[ownProps.name];
    return {
        value: state.reduxForm.values[ownProps.name],
        submite: state.reduxForm.submite,
        inputDetails: state.reduxForm.inputDetails[ownProps.name]
    };
}

const mapDispatchToProps = dispatch => {
    return {
        reduxForm: actions.reduxForm
    };
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Input));
