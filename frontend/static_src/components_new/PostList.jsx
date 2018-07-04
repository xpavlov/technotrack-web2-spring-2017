import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {loadPosts} from './../actions/posts';
import apiUrls from './../constants/apiUrls';

import Post from './Post';


class PostList extends React.Component {
    static propTypes = {
        isLoading: PropTypes.bool,
        postList: PropTypes.arrayOf(PropTypes.object),
        loadPosts: PropTypes.func.isRequired,

        apiUrl: PropTypes.string,
    }

    static defaultProps = {
        postList: [],
        isLoading: false,
        apiUrl: apiUrls.posts
    }

    componentDidMount() {
        this.props.loadPosts(this.props.apiUrl);
    }

    render() {
        if (this.props.isLoading) {
            return <center>Загрузка...</center>;
        }

        const posts = this.props.postList.map(
            item => <Post key={ item.id } id={ item.id } text={ item.text } author={ item.author }
                          likes_count={item.likes_count} likeId={item.likeId} myContentType={item.myContentType}
                          comments_count={item.comments_count} />,
        );
        return (
            <div>{ posts }</div>
        );
    }
}


const mapStateToProps = ({posts, FeedMenu}) => {
    return {
        postList: posts.postList,
        isLoading: posts.isLoading,
        apiUrl: FeedMenu.apiUrl,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({loadPosts}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(PostList); 