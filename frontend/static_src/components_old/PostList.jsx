import React from 'react';
import apiUrls from './../constants/apiUrls';
import Post from './Post'
import PropTypes from 'prop-types';
import {Col, Row, Grid, Panel} from 'react-bootstrap/lib';

 
class PostList extends React.Component {
    static propTypes = {
        isLoading: PropTypes.bool,
        postList: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            author: PropTypes.number,
            likes_count: PropTypes.number,
            comments_count: PropTypes.number,
            text: PropTypes.string,
        }))
    }

    static defaultProps = {
        postList: [],
        isLoading: true,
    }


    render() {
        if (this.props.isLoading) {
            return <center >Загрузка...</center>;
        }

        const posts = this.props.postList.map(
            item => <Post key={ item.id } id={ item.id } text={ item.text } authorId={ item.author } likes_count={item.likes_count}/>,
        );
        return (
            <div>{ posts }</div>
        );
    }
}

export default PostList;
