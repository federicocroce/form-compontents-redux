import React, { actions, components } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Parser from 'html-react-parser';
import classNames from 'classnames';


class MinCV extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            darkThem: this.props.darkThem,
            activeActions: false
        };
    }

    componentDidMount() {

        this.props.onAuthStateChanged();

        this.props.fetchEstudies();
        this.props.fetchExperiences();
        this.props.fetchPersonalData();
        this.props.fetchFooter();
    }



    render() {

        const props = this.props;

        const headerProps = {};

        headerProps.toogleAuth = () => {
            if (props.login.loginState) {
                props.signOut();
            }
            else {
                props.hadleAuth();
            }

        }

        
        const personalData = props.personalData;
        const footer = props.footer;



        const content = [
            props.experiences,
            props.estudies

        ];

        const mainClass = classNames({
            'app-container': true,
            'dark-them': this.state.darkThem,
        });

        headerProps.loginClass = classNames({ 'icon-lock_open': true }, { 'icon-lock_outline': this.props.login.loginState });

        headerProps.setThem = () => {
            this.setState({ darkThem: !this.state.darkThem });
        };

        headerProps.setActiveMenu = () => {
            this.setState({ activeActions: !this.state.activeActions });
        };

        headerProps.setToast = props.setToast;


        props.experiences.createItem = this.props.createExperiences;
        props.experiences.removeItem = this.props.removeExperiences;

        props.estudies.createItem = this.props.createEstudies;
        props.estudies.removeItem = this.props.removeEstudies;

        return (

            <div className={mainClass}>

                <components.Toast messages={props.messages.list} />

                {props.loading.isLoading ? <components.Spinner /> : null}

                <components.Header headerProps={headerProps} state={this.state} />
                
                <main className="table">
                    <components.AsidePersonalData personalData={personalData} />
                    <components.MainRightSection content={content} />
                </main>

                <components.Footer footer={footer}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        estudies: state.estudies,
        experiences: state.experiences,
        personalData: state.personalData,
        footer: state.footer,
        login: state.login,
        messages: state.messages,
        loading: state.loading,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchEstudies() {
            actions.actionsEstudies.fetchObjects(dispatch)
        },
        fetchExperiences() {
            actions.actionsExperiences.fetchObjects(dispatch)
        },
        createExperiences() {
            actions.actionsExperiences.createAutoID(dispatch)
        },
        removeExperiences(id) {
            actions.actionsExperiences.removeItem(dispatch, id)
        },
        fetchPersonalData() {
            actions.actionsPersonalData.fetchObjects(dispatch)
        },
        createEstudies() {
            actions.actionsEstudies.createAutoID(dispatch)
        },
        removeEstudies(id) {
            actions.actionsEstudies.removeItem(dispatch, id)
        },
        fetchFooter() {
            actions.actionsFooter.fetchObjects(dispatch)
        },
        hadleAuth() {
            actions.actionsLogin.hadleAuth(dispatch)
        },
        onAuthStateChanged() {
            actions.actionsLogin.onAuthStateChanged(dispatch)
        },
        signOut() {
            actions.actionsLogin.signOut(dispatch)
        },
        setToast(text) {
            actions.actionsToast.setToast(dispatch, text)
        }
    };
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(MinCV));
