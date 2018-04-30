import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class testSection extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // this.props.clear();
        // if (this.props.user.list.length == 0)
        this.props.fetchObjects();
    }



    render() {


        const setEstudiesContent = (props, index) => {

            return (
                <section>

                    <h2>{props.title}</h2>

                    {props.content.length > 0 ? props.content.map((item, index) => { return <p key={index}>{item} </p> }) : null}

                    {props.img.length > 0 ? props.img.map((item, index) => { return <amp-img key={index} src={item} layout="fixed" width="266" height="150"></amp-img> }) : null}
                </section>
            );

        }

        const props = this.props;

        return (
            <div>
                <h3> TEST</h3>
                {/* <h4>{props.state.collection.age} </h4>
                <h4>{props.state.collection.name} </h4>
                {props.state.collection.img} */}
                {/* <amp-img src='https://firebasestorage.googleapis.com/v0/b/test-74eeb.appspot.com/o/images%2Fgoku.jpg?alt=media&token=f9ba91d0-f5bd-4e4b-93d2-153379bd5617' layout="fixed" width="266" height="150"></amp-img> */}
                {/* {props.state.collection.img ?
                <amp-img src='https://firebasestorage.googleapis.com/v0/b/test-74eeb.appspot.com/o/images%2Fgoku.jpg?alt=media&token=f9ba91d0-f5bd-4e4b-93d2-153379bd5617' layout="fixed" width="266" height="150"></amp-img>
                : null} */}

                {props.state.list.length > 0 ? props.state.list.map((item, index) => { return <li key={index}>{setEstudiesContent(item.details, index)}</li> }) : null}





            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        state: state.estudies
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchObjects() {
            React.actions.actionsEstudies.fetchObjects(dispatch)
        }
    };
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(testSection));
