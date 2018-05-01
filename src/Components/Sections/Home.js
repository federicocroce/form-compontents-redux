import React, { actions, components } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Parser from 'html-react-parser';
import classNames from 'classnames';


class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
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
                <components.Input props={props} name='edad' placeholderFloating='Edad' customPlaceholder='29'/>

                {/* <p>Edad:</p> */}
                <components.Input props={props} name='nombre' placeholderFloating='Nombre' customPlaceholder='Federico Croce'/>

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
        actionsReduxForm(action, value) {
            actions.actionsReduxForm(dispatch, action, value)
        }
    };
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Home));
