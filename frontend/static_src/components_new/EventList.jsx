import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {loadEvents} from './../actions/events';
import apiUrls from './../constants/apiUrls';

import Event from './Event';


class EventList extends React.Component {
    static propTypes = {
        isLoading: PropTypes.bool,
        eventList: PropTypes.arrayOf(PropTypes.object),
        loadEvents: PropTypes.func.isRequired,
    }

    static defaultProps = {
        eventList: [],
        isLoading: false,
        apiUrl: apiUrls.events
    }

    componentDidMount() {
        this.props.loadEvents(apiUrls.events);
    }

    render() {
        if (this.props.isLoading) {
            return <center>Загрузка...</center>;
        }

        const events = this.props.eventList.map(
            item => <Event key={ item.id } id={ item.id } title={ item.title } author={ item.author } />,
        );
        return (
            <div>{ events }</div>
        );
    }
}


const mapStateToProps = ({events, FeedMenu}) => {
    return {
        eventList: events.eventList,
        isLoading: events.isLoading,
    } 
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({loadEvents}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(EventList);