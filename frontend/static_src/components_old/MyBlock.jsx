import React from 'react';
import {Panel, Glyphicon, Image} from 'react-bootstrap';
import PropTypes from 'prop-types';
import apiUrls from './../constants/apiUrls';


class MyBlock extends React.Component {

    static propTypes = {
        changePageFunc: PropTypes.func.isRequired,
    };

    state = {
        me: null,
        isLoading: true,
    };

    componentDidMount() {
        fetch(apiUrls.me, {
            credentials: 'include',
        }).then(
            body => body.json(),
        ).then(
            json => this.setState({me: json, isLoading: false},),
        )
    }

    render() {
        let info = 'info';
        if (!this.state.isLoading) {
            info = this.state.me.username;
        }

        let footer = <center><a href="#" onClick={this.props.changePageFunc.bind(this, 0)}> Feed </a><br/>
            <a href="#" onClick={this.props.changePageFunc.bind(this, 1)}> Events </a> <br/>
        <a href="#" onClick={this.props.changePageFunc.bind(this, 2)}> Friends(following) </a> <br/><br/>
        <a href="/social/login/vk-oauth2/"> Vk login </a> <br/>
        <a href="/api-auth/logout/"> logout  </a></center>;
        return (
            <Panel footer={footer}>
                <Image src="https://react-bootstrap.github.io/assets/logo.png" responsive/>
                <center>{info}</center>
            </Panel>
        );
    }
}

export default MyBlock;