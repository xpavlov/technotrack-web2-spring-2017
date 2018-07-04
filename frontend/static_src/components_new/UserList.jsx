import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {loadUsers} from './../actions/users';
import apiUrls from './../constants/apiUrls';

import User from './User';


class UserList extends React.Component {
    static propTypes = {
        isLoading: PropTypes.bool,
        userList: PropTypes.arrayOf(PropTypes.object),
        loadUsers: PropTypes.func.isRequired,

        apiUrl: PropTypes.string,
    }

    static defaultProps = {
        userList: [],
        isLoading: false,
    }

    componentDidMount() {
        this.props.loadUsers(this.props.apiUrl);
    }

    render() {
        if (this.props.isLoading) {
            return <center>Loading, please wait...</center>;
        }

        const users = this.props.userList.map(
            item => <User key={ item.id }
                          id={ item.id }
                          username={ item.username }
                          firstname={ item.first_name }
                          lastname={ item.last_name }
                          email={ item.email }
                          following={item.following}/>,
        );
        return (
            <div>{ users }</div>
        );
    }
}


const mapStateToProps = ({users, UsersMenu}) => {
    return {
        userList: users.userList,
        isLoading: users.isLoading,
        apiUrl: UsersMenu.apiUrl,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({loadUsers}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(UserList);