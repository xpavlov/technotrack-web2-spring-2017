import React from 'react';
import {Icon, Card, Label, Divider, Segment, Grid} from 'semantic-ui-react'
import PropTypes from 'prop-types';


class PostComponent extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        author: PropTypes.object,
        likes_count: PropTypes.number,
        text: PropTypes.string,
    };

    static defaultProps = {
        id: 0,
        author: null,
        likes_count: 0,
        text: '',
    };

    render() {
        return (

            <Segment >
                <Icon name='user'/> {this.props.author.username }
                <Divider hidden />
                { this.props.text }
            </Segment>
        );
    }
}

export default PostComponent;