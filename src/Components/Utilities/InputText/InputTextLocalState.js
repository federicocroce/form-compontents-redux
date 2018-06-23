import React, { config, functions, actions, components } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


class InputTextLocalState extends React.Component {

    constructor(props) {
        super(props);
        this.state = { error: '', focus: false, value: '', localValue: '' };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        setTimeout(() => {
            const reduxValue = actions.reduxForm.getForm().values[this.props.name];
            const value = nextProps.localState ? this.state.localValue : reduxValue;
            this.setState({ value });
        }, 100);

    }

    handleChange = (value, onChange) => {
        this.setState({ value, localValue: value });
        if (onChange) onChange(value);
    }

    onFocus = (onFocus) => {
        this.setState({ focus: true });
        if (onFocus) onFocus();
    }

    onBlur = (onBlur) => {
        setTimeout(() => {
            this.setState({ focus: false });
        }, 300);
        if (onBlur) onBlur();
    }

    render() {
        let props = this.props;
        let error = props.error != undefined ? props.error : false;
        const inputDetails = actions.reduxForm.getForm().inputDetails[props.name];

        return (

            <div className={`input-text-container ${inputDetails != undefined && props.submite && inputDetails.invalid || error ? 'input-error' : ''} ${props.style}`}>
                <div className='custom-input'>
                    <input
                        className="inputMaterial"
                        placeholder=" "
                        type="text"
                        value={this.state.value}
                        onChange={(event) => this.handleChange(event.target.value, props.onChange)}
                        onFocus={() => this.onFocus(props.onFocus)}
                        onBlur={() => this.onBlur(props.onBlur)}
                    />
                    <label className="floating">{props.placeholderFloating}</label>
                    <div className="container-placeholder">
                        <label className="placeholder">{props.customPlaceholder}</label>
                    </div>
                    <hr />
                </div>

                <components.ValidationsError inputDetails={inputDetails} submite={props.submite} showAllValidations={props.showAllValidations} focus={this.state.focus} />
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        submite: state.reduxForm.submite
    };
}

export default withRouter(connect(
    mapStateToProps,
    null
)(InputTextLocalState));
