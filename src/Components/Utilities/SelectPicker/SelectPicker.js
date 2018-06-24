import React, { config, functions, actions, components } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class SelectPicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: '',
            focus: false,
            lastFilterString: '',
            listItems: []
        };
    }

    componentDidMount() {
        this.selectElement({ value: '' });
        this.setState({ listItems: this.props.listItems });
        actions.reduxForm.setInputDetails(this.setErrorInputDetails({ value: '' }, false));
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const form = actions.reduxForm.getForm();
        
        form.clear ? this.cointainString('', false) : form.selected.id != null ? nextProps.value != '' ? this.cointainString(nextProps.value, false) : this.cointainString(this.state.lastFilterString, false) : null;
    }

    selectElementSelectState = (item) => {
        this.selectElement(item);
    }

    selectElement = (item) => {
        actions.reduxForm.setValues({ [this.props.name]: item.value });
        actions.reduxForm.setInputDetails(this.setErrorInputDetails(item, true));
        this.filtered(item.value);
        if (this.props.callbackSelected) this.props.callbackSelected(item);
    }

    setErrorInputDetails = (item, selected) => {

        let resultValidations = {
            invalid: false,
            error: ''
        };

        resultValidations = this.setError(item.value, this.props.validate);
        return this.setDetails(item, resultValidations.invalid, resultValidations.validations);
    }

    setDetails = (item, invalid, validations) => {
        return {
            [this.props.name]: {
                item,
                invalid,
                validations
            }
        }
    }

    setError = (value, validate) => {
        const resultError = config.fieldValidations.getOneValidation(validate, actions.reduxForm.getForm().values[this.props.name], this.props.required);
        return resultError;
    }

    onFocus = () => {
        this.setState({ focus: true });
    }

    onBlur = () => {
        setTimeout(() => {
            this.setState({ focus: false });
        }, 100);
    }


    //Método para filtrar los items.
    cointainString = (value, setState) => {
        this.setState({ lastFilterString: value });
        setState ? actions.reduxForm.setValues({ [this.props.name]: '' }) : null;
        actions.reduxForm.setInputDetails(this.setErrorInputDetails({ value }, false));
        this.filtered(value);
    }

    filtered = (value) => {
        let filtered = this.props.listItems.filter(function (item) {
            let str = item.value;
            let rgxp = new RegExp(value, "gi");
            return Array.isArray(str.match(rgxp)) && str.match(rgxp).length > 0
        })

        this.setState({ listItems: filtered });
    }

    render() {

        const props = this.props;
        const selected = functions.isUndefinedOrNullOrEmpty(this.props.value) ? false : true;

        return (
            <div className="select-picker-container">

                <components.InputTextLocalState
                    name={props.name}
                    style="inline chosen-value"
                    placeholderFloating={props.placeholderFloating}
                    customPlaceholder={props.customPlaceholder}
                    type='text'
                    onFocus={() => this.onFocus()}
                    onBlur={() => this.onBlur()}
                    onChange={(value) => this.cointainString(value, true)}
                    validate={props.validate}
                    localState={!selected}
                    required={props.required}
                />

                <ul className={`value-list ${this.state.focus ? "open" : ''}`}>
                    {this.state.listItems.map((item, index) => {
                        return <li key={index} onClick={() => this.selectElementSelectState(item)} className="item-combobox">{item.value}</li>
                    })}
                </ul>
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {

    return {
        value: state.reduxForm.values[ownProps.name],
        submite: state.reduxForm.submite
    };
}

export default withRouter(connect(
    mapStateToProps,
    null
)(SelectPicker));
