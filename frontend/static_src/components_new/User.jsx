import React from 'react';
import {Icon, Card} from 'semantic-ui-react'
import PropTypes from 'prop-types';


class UserComponent extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        username: PropTypes.string,
        firstname: PropTypes.string,
        lastname: PropTypes.string,
        email: PropTypes.string,
    };

    static defaultProps = {
        id: 0,
        author: null,
        likes_count: 0,
        comments_count: 0,
        text: '',
    };

    render() {
        return (
            <Card fluid>
                <Card.Content>
                    <Card.Header>
                        <Icon name='user'/> {this.props.username }
                    </Card.Header>
                    <Card.Meta>
                        {this.props.firstname + ' ' + this.props.lastname }
                    </Card.Meta>
                    <Card.Description>
                        email:{' ' + this.props.email }
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    {}
                </Card.Content>
            </Card>
        );
    }
}

export default UserComponent;