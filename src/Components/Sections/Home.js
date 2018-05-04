import React, { actions, components, config, functions } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Parser from 'html-react-parser';
import classNames from 'classnames';


class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        // alert('A name was submitted: ' + this.state.value);
        this.props.actionsReduxForm.setSubmite(true);
        event.preventDefault();

        if(!this.props.reduxForm.invalid){
            alert('Este form no posee errores.');            
        }
        
    }

    componentDidMount() {

        // this.props.onAuthStateChanged();

    }



    render() {

        const props = this.props;

        const gender = {
            name: 'gender',
            style: 'inline',
            type: 'radio',
            options: [
                {
                    value: 'male',
                    label: 'Hombre'
                },
                {
                    value: 'female',
                    label: 'Mujer'
                }
            ]
        }

        const checkboxProps = {
            name: 'checkboxOptions',
            style: '',
            type: 'checkbox',
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


        return (


            <form onSubmit={this.handleSubmit}>
                {/* <pre>Algo : {props.reduxForm.values}</pre> */}
                {/* {props.reduxForm.values} */}
                {/* <p>Nombre:</p> */}
                <components.InputText
                    props={props}
                    name='edad'
                    style='inline'
                    placeholderFloating='Edad'
                    customPlaceholder='29'
                    validate={config.fieldValidations.validations.age}
                    required={true}
                />


                <components.InputText
                    props={props}
                    name='nombre'
                    style='inline'
                    placeholderFloating='Nombre'
                    customPlaceholder='Federico Croce'
                    validate={config.fieldValidations.validations.name}
                />

                <components.InputText
                    props={props}
                    name='localidad'
                    style='inline'
                    placeholderFloating='Localidad'
                    customPlaceholder='CABA'
                    validate={config.fieldValidations.validations.name}
                    required={false}
                />

                <components.SwitchesGroup switchesProps={gender} props={props}/>

                <components.SwitchesGroup switchesProps={checkboxProps} props={props}/>

                <components.Button type='submit' className='primary-button' label='SUBMIT' />

                
                {functions.jsonView(props.reduxForm)}
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        reduxForm: state.reduxForm
    };
}

const mapDispatchToProps = dispatch => {
    return {
        actionsReduxForm: actions.actionsReduxForm
    };
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Home));
