import React from 'react';
import { Panel, Glyphicon } from 'react-bootstrap';
import PropTypes from 'prop-types';
import apiUrls from './../constants/apiUrls';

class PostComponent extends React.Component {
        state = {
        author: null,
        isLoading: true,
    };

    static propTypes = {
        id: PropTypes.number.isRequired,
        authorId: PropTypes.number,
        likes_count: PropTypes.number,
        comments_count: PropTypes.number,
        text: PropTypes.string,
    };

    static defaultProps = {
        id: 0,
        author: null,
        likes_count: 0,
        comments_count: 0,
        text: '',
    };

    componentDidMount() {
        fetch(apiUrls.users + this.props.authorId +'/', {
            credentials: 'include',
        }).then(
            body => body.json(),
        ).then(
            json => this.setState({author: json, isLoading: false},),
        )
    }


    render() {
        let headText = '';
        if (this.state.isLoading) {
            headText = <span>Author,  likes: {this.props.likes_count}</span>
        } else {
            headText = <span>{this.state.author.username },  likes: {this.props.likes_count}</span>
        }
        return (
            <Panel header={headText}>
                {this.props.text}
            </Panel>
        );
    }
}

export default PostComponent;