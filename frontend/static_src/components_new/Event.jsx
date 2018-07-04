import React from 'react';
import {Icon, Card, Label, Container, Button, Grid} from 'semantic-ui-react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';


class EventComponent extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        author: PropTypes.number,
        title: PropTypes.string,
    };

    static defaultProps = {
        id: 0,
        author: 0,
        title: '',
    };

    render() {
        return (
            <Card fluid>
                <Card.Content>
                    <Card.Description>
                        { this.props.title }
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={2}>
                                <Icon link name='external'/> Go to
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Card.Content>
            </Card>
        );
    }
}


const mapStateToProps = ({posts}) => {
    return {};
};


const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(EventComponent);
