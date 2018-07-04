import React from 'react'
import {cent} from 'react-cent'
import {Label, Segment, Transition} from 'semantic-ui-react'
import {addNotification, showNotification} from '../actions/notifications'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// Make Centrifuge client accessible through `this.props.cent`
@cent
class PostPopUp extends React.Component {
    static propTypes = {
        notificationList: PropTypes.arrayOf(PropTypes.string),
        currentNotification: PropTypes.string,
        addNotification: PropTypes.func.isRequired,
        showNotification: PropTypes.func.isRequired,
        isShowing: PropTypes.bool,
    };

    constructor(props) {
        super(props)
        // Subscribe on `site-metrics` channel.
        let data = document.querySelector('#centrifuge').dataset || {};
        this.props.cent.subscribe('notifications-' + data.user, message => {
            this.handleMessage(message)
        }).history().then(history => {
            this.handleHistory(history)
        })
    }

    render() {
        let visible = true;
        if (this.props.currentNotification == "")
            visible = false;

        return (
            <Transition.Group animation="slide right" duration='500'>
                {visible &&
                <Label
                    style={{position: "absolute", top: "10px"}}
                    pointing='left'
                    basic
                    color='green'
                    size='large'>
                    {this.props.currentNotification}
                </Label>}
            </Transition.Group>)
    }

    handleMessage = (message) => {
        this.props.addNotification(message.data);
    }

    handleHistory(history) {
        console.log('history', history.data)
    }
}

const mapStateToProps = ({notifications}) => {
    return {
        notificationList: notifications.notificationList,
        currentNotification: notifications.currentNotification,
        isShowing: notifications.isShowing,
    };
};


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({addNotification, showNotification}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(PostPopUp); 
