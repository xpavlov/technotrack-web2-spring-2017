import React from 'react';
import {Panel, Glyphicon} from 'react-bootstrap';
import PropTypes from 'prop-types';
import apiUrls from './../constants/apiUrls';


class UserComponent extends React.Component {
    state = {
        info: null,
        isLoading: true,
    };

    static propTypes = {
        id: PropTypes.number.isRequired,
        username: PropTypes.string,
        email: PropTypes.string,
    };

    static defaultProps = {
        id: 0,
        username: 'noname',
        email: '',
    };

    componentDidMount() {
        console.log('fetching following id:' + this.props.id);
        fetch(apiUrls.users + this.props.id + '/', {
            credentials: 'include',
        }).then(
            body => body.json(),
        ).then(
            json => this.setState({info: json, isLoading: false},),
        )
    }


    render() {
        let content = '';
        if (this.state.isLoading) {
            content = <span> <Glyphicon glyph="user"/> </span>
        } else {
            content = <div>
                <div>username: {this.state.info.username}</div>
                <div>email: {this.state.info.email}</div>
            </div>
        }
        return (
            <Panel>
                {content}
            </Panel>
        );
    } 
}

export default UserComponent;