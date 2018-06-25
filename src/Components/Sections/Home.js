import React, { actions, components, config, functions } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Parser from 'html-react-parser';
import classNames from 'classnames';


class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: '', formState: 'new' };
    }

    handleSubmit = (event) => {
        // alert('A name was submitted: ' + this.state.value);
        actions.reduxForm.setSubmite(true);

        event.preventDefault();

        let form = actions.reduxForm.getForm();

        if (!form.invalid) {
            form.selected.state == 'new'  ? actions.test.createAutoID(form.values) : actions.test.updateItem(form.selected.id, form.values);
        }

    }

    componentDidMount() {
        actions.test.fetchObjects();
    }

    itemSelected = item => {
        actions.reduxForm.setValues(item.data);
        actions.reduxForm.setSelected('update', item.id);
    }

    clearForm = () => {
        actions.reduxForm.clearForm();
        actions.reduxForm.setSelected('new', null);
    }

    render() {

        const props = this.props;

        const gender = {
            groupName: 'genero',
            style: 'inline',
            type: 'radio',
            options: [
                {
                    value: 'hombre',
                    label: 'Hombre'
                },
                {
                    value: 'mujer',
                    label: 'Mujer'
                }
            ]
        }

        const checkboxProps = {
            groupName: 'checkboxOptions',
            style: '',
            type: 'checkbox',
            validation: config.fieldValidations.validations.cheked,
            options: [
                {
                    value: 'checkbox1',
                    label: 'Checkbox 1'
                },
                {
                    value: 'checkbox2',
                    label: 'Checkbox 2'
                },
                {
                    value: 'checkbox3',
                    label: 'Checkbox 3'
                }
            ]
        }

        const listItemsCombobox = [
            {
                value: "Azul",
                data: {
                    color: '#1565C0'
                }
            },
            {
                value: "Verde",
                data: {
                    color: "#00695C"
                }
            },
            {
                value: "Rojo",
                data: {
                    color: "#D84315"
                }
            }
        ];


        return (

            <div className='home table'>
                <form onSubmit={this.handleSubmit}>
                    {/* <pre>Algo : {props.reduxForm.values}</pre> */}
                    {/* {props.reduxForm.values} */}
                    {/* <p>Nombre:</p> */}


                    <components.InputText
                        name='nombre'
                        // style='inline'
                        placeholderFloating='Nombre'
                        customPlaceholder='Federico Croce'
                        validate={config.fieldValidations.validations.name}
                    />

                    <components.InputText
                        name='edad'
                        // style='inline'
                        placeholderFloating='Edad'
                        customPlaceholder='29'
                        validate={config.fieldValidations.validations.age}
                        showAllValidations={true}
                        required={true}
                    />

                    <components.InputText
                        name='email'
                        placeholderFloating='Email'
                        customPlaceholder='fede.croce.123@gmail.com'
                        validate={config.fieldValidations.validations.email}
                        required={false}
                    />

                    <components.SwitchesGroup switchesProps={gender} submite={props.submite} />

                    <components.SwitchesGroup switchesProps={checkboxProps} submite={props.submite} />

                    <components.SelectPicker
                        listItems={listItemsCombobox}
                        placeholderFloating='Seleccione un color'
                        customPlaceholder='Escriba su color'
                        name='color'
                        validate={config.fieldValidations.validations.selectPicker}
                        callbackSelected={(val) => console.log(val)}
                        required={true}
                    />

                    <components.Button type='submit' className='primary-button' label={actions.reduxForm.getForm().selected.state == 'new' ? 'NUEVO' : 'ACTUALIZAR'} />
                    <components.Button className='primary-button' label='CANCELAR' onClick={() => this.clearForm()} />
                    {/* <components.Button onClick={remove()} className='primary-button' label='REMOVE' /> */}

                    {/*<input type="date" name="bday" max="1979-12-31"/>*/}


                    {/*{functions.jsonView(props.reduxForm)}*/}
                </form>

                <div>
                    {this.props.list.map((item, index)=> {
                        const data = item.data;
                        return(
                            <components.Card item={item} key={index} onClick={() => this.itemSelected(item)}/>
                        )
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.test.list
    };
}

// const mapDispatchToProps = dispatch => {
//     return {
//         reduxForm: actions.reduxForm
//     };
// }

export default withRouter(connect(
    mapStateToProps,
    null
)(Home));
