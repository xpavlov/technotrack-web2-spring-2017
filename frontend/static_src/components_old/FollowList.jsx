import React from 'react';
import apiUrls from './../constants/apiUrls';
import User from './User'
import PropTypes from 'prop-types';
import {Col, Row, Grid, Panel} from 'react-bootstrap/lib';

class FollowList extends React.Component {
    static propTypes = {
        userList: PropTypes.arrayOf(PropTypes.number),
    }

    static defaultProps = {
        userList: [],
        isLoading: true,
    }


    render() {
        const users = this.props.userList.map(
            item => <User key={ item } id={ item }/>,
        );
        return (
            <div>{ users }</div>
        );
    }
}

export default FollowList;
