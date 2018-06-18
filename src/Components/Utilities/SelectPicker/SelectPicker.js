import React, { config, functions, actions, components } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class SelectPicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = { error: '', focus: false };
    }




    componentDidMount() {
        const inputField = document.querySelector('.chosen-value input');
        const dropdown = document.querySelector('.value-list');
        const name = this.props.name;

        const dropdownItems = document.querySelectorAll('.item-combobox');
        // dropdown.classList.add('open');
        // inputField.focus(); // Demo purposes only

        // console.log(dropdownItems);


        let valueArray = [];
        dropdownItems.forEach(item => {
            valueArray.push(item.textContent);
        });

        // const closeDropdown = () => {
        //     dropdown.classList.remove('open');
        // }

        // inputField.addEventListener('input', () => {
        //     // dropdown.classList.add('open');
        //     let inputValue = inputField.value.toLowerCase();
        //     let valueSubstring;
        //     if (inputValue.length > 0) {
        //         for (let j = 0; j < valueArray.length; j++) {
        //             if (!(inputValue.substring(0, inputValue.length) === valueArray[j].substring(0, inputValue.length).toLowerCase())) {
        //                 dropdownItems[j].classList.add('closed');
        //             } else {
        //                 dropdownItems[j].classList.remove('closed');
        //             }
        //         }
        //     } else {
        //         for (let i = 0; i < dropdownItems.length; i++) {
        //             dropdownItems[i].classList.remove('closed');
        //         }
        //     }
        // });

        // this.selectElement = (item) => {
        //     actions.reduxForm.setValues({ [name]: item.value });
        //     actions.reduxForm.setInputDetails(this.setErrorInputDetails(item));
        // }

        // dropdownItems.forEach(item => {
        //     item.addEventListener('click', (evt) => {
        //         // inputField.value = item.textContent;

        //         // Close(evt);
        //         // dropdownItems.forEach(dropdown => {
        //         //     dropdown.classList.add('closed');                    
        //         //     // console.log("Click sobre el elemento");
        //         // });
        //     });
        // });



        // inputField.addEventListener('focus', () => {
        //     dropdown.classList.add('open');
        //     dropdownItems.forEach(dropdown => {
        //         dropdown.classList.remove('closed');
        //     });
        // });

        // inputField.addEventListener('blur', () => {
        //     dropdown.classList.remove('open');
        // });

        // function Close(evt) {
        //     const isDropdown = dropdown.contains(evt.target);
        //     const isInput = inputField.contains(evt.target);
        //     if (!isDropdown && !isInput) {
        //         dropdown.classList.remove('open');
        //     }
        // }

        // document.addEventListener('click', (evt) => {
        //     Close(evt);
        // });

        this.selectElement({ value: '' });

    }

    selectElement = (item) => {
        actions.reduxForm.setValues({ [this.props.name]: item.value });
        actions.reduxForm.setInputDetails(this.setErrorInputDetails(item));
    }

    setErrorInputDetails = (item) => {
        let resultValidations = {
            invalid: false,
            error: ''
        }
        if (!functions.isUndefinedOrNullOrEmpty(this.props.validate)) resultValidations = this.setError(item.value);
        // return this.setDetails(item, resultValidations.invalid);
        return this.setDetails(item, resultValidations.invalid, resultValidations.validations);
    }

    setDetails = (item, invalid, validations) => {
        return {
            [this.props.name]: {
                value: item.value,
                item: item,
                invalid,
                validations
            }
        }
    }

    setError = (value) => {
        const resultError = config.fieldValidations.getOneValidation(this.props.validate, value, this.props.required);
        return resultError;
    }

    onFocus = () => {
        this.setState({ focus: true });
    }

    onBlur = () => {
        this.setState({ focus: false });
    }

    cointainString = (string) =>{
        let a = string.search(this.props.value);
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
                    validate={props.validate}
                />

                {/*<input className="chosen-value" type="text" placeholder="Seleccione un elemento" />*/}
                <ul className={`value-list ${this.state.focus ? "open" : ''}`}>
                    {/*{this.props.listItems}*/}
                    {props.listItems.map((item, index) => {
                        {/*return <li key={index} onClick={() => this.selectElement(item)} className={"item-combobox"}>{item.value}</li>*/}
                        {/*{this.cointainString(item.value)}*/}
                        return <li key={index} onClick={() => this.selectElement(item)} className={`item-combobox ${this.cointainString(item.value) ? "closed" : ''}`}>{item.value}</li>
                    })}
                </ul>
                {props.value}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
           value: state.reduxForm.values[ownProps.name]
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchObjects() {
            React.actions.actionsPost.fetchObjects(dispatch)
        },
        clear() {
            dispatch(React.actions.actionsPost.clear());
        },
    };
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectPicker));