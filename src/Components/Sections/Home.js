import React, { actions, components, config } from 'react';
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
    }

    componentDidMount() {

        // this.props.onAuthStateChanged();

    }



    render() {

        const props = this.props;



        return (


            <form onSubmit={this.handleSubmit}>
                {/* <pre>Algo : {props.reduxForm.values}</pre> */}
                {/* {props.reduxForm.values} */}
                {/* <p>Nombre:</p> */}
                <components.Input
                    props={props}
                    name='edad'
                    style='inline'
                    placeholderFloating='Edad'
                    customPlaceholder='29'
                    validate={config.fieldValidations.validations.age}
                    required={true}
                />


                <components.Input
                    props={props}
                    name='nombre'
                    style='inline'
                    placeholderFloating='Nombre'
                    customPlaceholder='Federico Croce'
                    validate={config.fieldValidations.validations.name}
                />

                <components.Input
                    props={props}
                    name='localidad'
                    style='inline'
                    placeholderFloating='Localidad'
                    customPlaceholder='CABA'
                    validate={config.fieldValidations.validations.name}
                    required={true}
                />

                <input type="submit" value="Submit" />

                
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
