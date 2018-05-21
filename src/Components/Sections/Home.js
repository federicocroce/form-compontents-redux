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
        actions.reduxForm.setSubmite(true);
        event.preventDefault();

        if(!actions.reduxForm.getForm().invalid){
            alert('Este form no posee errores.');            
        }
        
    }

    componentDidMount() {

        // this.props.onAuthStateChanged();

    }



    render() {

        const props = this.props;

        const gender = {
            groupName: 'gender',
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


        return (


            <form onSubmit={this.handleSubmit}>
                {/* <pre>Algo : {props.reduxForm.values}</pre> */}
                {/* {props.reduxForm.values} */}
                {/* <p>Nombre:</p> */}
                <components.InputText
                    name='edad'
                    style='inline'
                    placeholderFloating='Edad'
                    customPlaceholder='29'
                    validate={config.fieldValidations.validations.age}
                    showAllValidations={true}
                    required={true}
                />

               
                <components.InputText
                    name='nombre'
                    style='inline'
                    placeholderFloating='Nombre'
                    customPlaceholder='Federico Croce'
                    validate={config.fieldValidations.validations.name}
                />

                <components.InputText
                    name='localidad'
                    style='inline'
                    placeholderFloating='Localidad'
                    customPlaceholder='CABA'
                    validate={config.fieldValidations.validations.city}
                    required={false}
                />

                {/*<components.SwitchesGroup switchesProps={gender} submite={props.submite}/>

                <components.SwitchesGroup switchesProps={checkboxProps} submite={props.submite}/>*/}

                <components.Button type='submit' className='primary-button' label='SUBMIT' />

                {/*<input type="date" name="bday" max="1979-12-31"/>*/}

                
                {/*{functions.jsonView(props.reduxForm)}*/}
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // reduxForm: state.reduxForm
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
