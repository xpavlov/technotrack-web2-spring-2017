import React from 'react';
import PropTypes from 'prop-types';
import FeedMenu from './FeedMenu';
import UsersMenu from './UsersMenu';
import PostList from './PostList';
import EventList from './EventList';
import UserList from './UserList';
import {connect} from 'react-redux';
import {Segment, Grid, Sticky} from 'semantic-ui-react'


class Feed extends React.Component {
    static propTypes = {
        menuType: PropTypes.number.isRequired,

        feedMenuItem: PropTypes.number,
        usersMenuItem: PropTypes.number,
    };

    state = {};

    handleContextRef = contextRef => this.setState({contextRef});

    render() {
        const {contextRef} = this.state;
        let menu = <FeedMenu/>;
        let feed = <PostList key={this.props.feedMenuItem} />;

        if (this.props.feedMenuItem == 0){
            feed = <EventList key={this.props.feedMenuItem} />;
        }

        if (this.props.menuType === 1) {
            menu = <UsersMenu/>;
            feed = <UserList key={this.props.usersMenuItem} />;
        }

        return (
            <div ref={this.handleContextRef}>
                <Grid>
                    <Grid.Column width={4}>
                        <Sticky offset={100} context={contextRef}>
                            { menu }
                        </Sticky>
                    </Grid.Column>
                    <Grid.Column width={11}>
                        {feed}
                    </Grid.Column>
                    <Grid.Column width={1}>
                    </Grid.Column>
                </Grid>
            </div>

        );
    }
}

// default Feed;

const mapStateToProps = ({FeedMenu, UsersMenu}) => {
    return {
        feedMenuItem: FeedMenu.activeItem,
        usersMenuItem: UsersMenu.activeItem,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {};
}


export default connect(mapStateToProps, mapDispatchToProps)(Feed);