import React, { config, functions, actions, components } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class SelectPicker extends React.Component {

    constructor(props) {
        super(props);
    }




    componentDidMount() {
        const inputField = document.querySelector('.chosen-value input');
        const dropdown = document.querySelector('.value-list');
        const name = this.props.name;

        const dropdownItems = document.querySelectorAll('.item-combobox');
        // dropdown.classList.add('open');
        inputField.focus(); // Demo purposes only

        console.log(dropdownItems);


        let valueArray = [];
        dropdownItems.forEach(item => {
            valueArray.push(item.textContent);
        });

        const closeDropdown = () => {
            dropdown.classList.remove('open');
        }

        inputField.addEventListener('input', () => {
            dropdown.classList.add('open');
            let inputValue = inputField.value.toLowerCase();
            let valueSubstring;
            if (inputValue.length > 0) {
                for (let j = 0; j < valueArray.length; j++) {
                    if (!(inputValue.substring(0, inputValue.length) === valueArray[j].substring(0, inputValue.length).toLowerCase())) {
                        dropdownItems[j].classList.add('closed');
                    } else {
                        dropdownItems[j].classList.remove('closed');
                    }
                }
            } else {
                for (let i = 0; i < dropdownItems.length; i++) {
                    dropdownItems[i].classList.remove('closed');
                }
            }
        });

        dropdownItems.forEach(item => {
            item.addEventListener('click', (evt) => {
                // inputField.value = item.textContent;
                actions.reduxForm.setValues({ [name]: item.textContent.value });
                actions.reduxForm.setInputDetails(this.setErrorInputDetails(item.textContent));
                // Close(evt);
                // dropdownItems.forEach(dropdown => {
                //     dropdown.classList.add('closed');                    
                //     // console.log("Click sobre el elemento");
                // });
            });
        });

        this.setErrorInputDetails = (value) => {
            let resultValidations = {
                invalid: false,
                error: ''
            }
            if (!functions.isUndefinedOrNullOrEmpty(this.props.validate)) resultValidations = this.setError(value);
            return this.setDetails(value, resultValidations.invalid, resultValidations.validations);
        }

        inputField.addEventListener('focus', () => {
            dropdown.classList.add('open');
            dropdownItems.forEach(dropdown => {
                dropdown.classList.remove('closed');
            });
        });

        inputField.addEventListener('blur', () => {
            dropdown.classList.remove('open');
        });

        function Close(evt) {
            const isDropdown = dropdown.contains(evt.target);
            const isInput = inputField.contains(evt.target);
            if (!isDropdown && !isInput) {
                dropdown.classList.remove('open');
            }
        }

        document.addEventListener('click', (evt) => {
            Close(evt);
        });

    }

    render() {

        const props = this.props;

        return (
            <div className="select-picker-container">

                <components.InputText name={props.name} style='inline chosen-value' placeholderFloating={props.placeholderFloating} customPlaceholder={props.customPlaceholder} type='text' />

                {/*<input className="chosen-value" type="text" placeholder="Seleccione un elemento" />*/}
                <ul className="value-list">
                    {/*{this.props.listItems}*/}
                    {props.listItems.map((item, index) => { return <li key={index} className="item-combobox">{item}</li> })}
                </ul>

            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        //    value: state.reduxForm.values[ownProps.name]
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