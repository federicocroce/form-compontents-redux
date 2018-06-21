import React, { config, functions, actions, components } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class SelectPicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: '',
            focus: false,
            listItems: []
        };
    }

    componentDidMount() {
        this.selectElement({ value: '' });
        this.setState({ listItems: this.props.listItems });
        actions.reduxForm.setInputDetails(this.setErrorInputDetails({value:''}, false));
    }

    selectElementSelectState = (item) => {
        this.setState({
            selected: {
                item,
                state: true
            }
        });

        this.selectElement(item);
    }

    selectElement = (item) => {
        actions.reduxForm.setValues({ [this.props.name]: item.value });
        actions.reduxForm.setInputDetails(this.setErrorInputDetails(item, true));
        if (this.props.callbackSelected) this.props.callbackSelected(item);
    }

    setErrorInputDetails = (item, selected) => {

        let resultValidations = {
            invalid: false,
            error: ''
        };

        const validate = this.props.required ? [config.fieldValidations.requiredSelectPicker(selected, 'Seleccione al menos uno elemento')] : [];

        if (!functions.isUndefinedOrNullOrEmpty(validate)) resultValidations = this.setError(item.value, validate);
        return this.setDetails(item, resultValidations.invalid, resultValidations.validations);
    }

    setDetails = (selected, invalid, validations) => {
        return {
            [this.props.name]: {
                item: selected.item,
                invalid,
                validations
            }
        }
    }

    setError = (value, validate) => {
        const resultError = config.fieldValidations.getOneValidation(validate, value, this.props.required);
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
    cointainString = (value) => {

        actions.reduxForm.setInputDetails(this.setErrorInputDetails({ value }));

        this.setState({
            selected: {
                item: { value },
                state: false
            }
        });

        const props = this.props;

        let filtered = props.listItems.filter(function (item) {
            let str = item.value;
            let rgxp = new RegExp(value, "gi");
            return Array.isArray(str.match(rgxp)) && str.match(rgxp).length > 0
        })

        this.setState({ listItems: filtered });
    }

    render() {

        const props = this.props;

        return (
            <div className="select-picker-container">

                <components.InputText
                    name={props.name}
                    style="inline chosen-value"
                    placeholderFloating={props.placeholderFloating}
                    customPlaceholder={props.customPlaceholder}
                    type='text'
                    onFocus={() => this.onFocus()}
                    onBlur={() => this.onBlur()}
                    onChange={(value) => this.cointainString(value)}
                    validate={props.validate}
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

export default SelectPicker;