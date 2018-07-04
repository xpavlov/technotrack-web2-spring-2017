import React from 'react';
import PostList from './PostList';
import FollowList from './FollowList';
import MyBlock from './MyBlock';
import PostForm from './PostForm';
import apiUrls from './../constants/apiUrls';
import {PageHeader} from 'react-bootstrap/lib'
import {Col, Row, Grid, Panel} from 'react-bootstrap/lib';


class App extends React.Component {
    state = {
        postList: [],
        isLoading: true,
        following: [],
        page: 0,
    };

    onPostCreate = (post) => {
        this.setState({
            postList: [post, ...this.state.postList],
        });
    };

    componentDidMount() {
        fetch(apiUrls.posts, {
            credentials: 'include',
        }).then(
            body => body.json(),
        ).then(
            json => this.setState({postList: json.map(item => item), isLoading: false},),
        )

    }

    changePage = (pageNum, e) => {
        e.preventDefault();
        console.log(pageNum);
        this.setState({page: pageNum});

        if (pageNum === 2) {
            fetch(apiUrls.me, {
                credentials: 'include',
            }).then(
                body => body.json(),
            ).then(
                json => this.setState({following: json.following, isLoading: false},),
            )
        }
    }

    render() {
        let header = <PageHeader style={{
            marginTop: -10,
            borderBottomWidth: 1,
        }}>
            <center>Твиттер</center>
        </PageHeader>;


        if (this.state.page === 0) {
            return (
                <div className="b-wrapper">
                    {header}
                    <Grid>
                        <Row className="show-grid">
                            <Col md={2} style={{
                                marginLeft: -40,
                            }}>
                                <MyBlock changePageFunc={this.changePage}/>
                            </Col>
                            <Col md={5}> <PostList postList={this.state.postList} isLoading={this.state.isLoading}/>
                            </Col>
                            <Col md={5}> <PostForm newPostRenderFunc={this.onPostCreate}/> </Col>
                        </Row>
                    </Grid>

                </div>
            );
        }
        if (this.state.page === 2) {
            return (<div>
                {header}
                <Grid>
                    <Row className="show-grid">
                        <Col md={2} style={{
                            marginLeft: -40,
                        }}>
                            <MyBlock changePageFunc={this.changePage}/>
                        </Col>
                        <Col md={5}>
                            <FollowList userList={this.state.following}/>
                        </Col>
                        <Col md={5}> </Col>
                    </Row>
                </Grid>
            </div>);
        }
    }
}

export default App;