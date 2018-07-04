import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {loadPosts} from './../actions/posts';
import Comment from './Comment'
import {Icon, Header, Message, Button, Divider, Grid} from 'semantic-ui-react'
import CreateComment from './CreateComment'
import PropTypes from 'prop-types';
import apiUrls from './../constants/apiUrls';


class PostDetailComponent extends React.Component {
    static propTypes = {
        postList: PropTypes.arrayOf(PropTypes.object),
        loadPosts: PropTypes.func.isRequired,
    };

    static defaultProps = {
        postList: [],
    };

    componentDidMount() {
        if (this.props.postList.length == 0) {
            this.props.loadPosts(apiUrls.posts);
        }
    };


    render() {

        if (this.props.postList.length == 0) {
            return (
                <center>Загрузка...</center>
            );
        }

        var postId = this.props.match.params.postDetailsId;
        var arrayId = 0;

        for (arrayId = 0; arrayId < this.props.postList.length; arrayId++) {
            if (postId == this.props.postList[arrayId].id)
                break;
        }

        var postContentType = this.props.postList[arrayId].myContentType;
        const comments = this.props.postList[arrayId].comments.map(
            item => <Comment key={ item.id } id={ item.id } text={ item.text } author={ item.author }
                             likes_count={item.likes_count}/>,
        );


        return (
            <Grid container style={{padding: '5em 0em', margin: '-100px'}}>
                <Grid.Row>
                    <Grid.Column>
                        <Header as='h1'>
                            <Icon name='user'/> {this.props.postList[arrayId].author.username }
                        </Header>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <Message>
                            {}
                            <p>
                                { this.props.postList[arrayId].text }
                            </p>
                            <Icon name='like'/> {this.props.postList[arrayId].likes_count}

                        </Message>
                        <CreateComment contentType={postContentType}
                                       objectId={parseInt(postId)}
                                       trigger={
                                            <Button basic color='black'>
                                            <Icon.Group  size='large'>
                                            <Icon name='comment outline'/>
                                            <Icon corner name='add' />
                                            </Icon.Group>
                                                Leave comment
                                            </Button>
                                        }/>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row style={{top: '20px'}}>
                    <Grid.Column>
                        <Header as='h2' dividing>
                            Камменты
                        </Header>
                        { comments }
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        );
    }
}


const mapStateToProps = ({posts}) => {
    return {
        postList: posts.postList,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({loadPosts}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailComponent);