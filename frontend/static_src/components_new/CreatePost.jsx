import React from 'react';
import {Form, TextArea, Menu, Button, Divider, Modal, Header} from 'semantic-ui-react'
import {bindActionCreators} from 'redux';
import {sendPost} from './../actions/posts';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import apiUrls from './../constants/apiUrls';


const DEFAULT_STATE = {
    text: '',
    errors: {}
};


class CreatePost extends React.Component {
    state = DEFAULT_STATE;

    static propTypes = {
        trigger: PropTypes.node.isRequired,
        sendPost: PropTypes.func.isRequired,
        isPostSending: PropTypes.bool,
    }

     onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmitClick = (e, {name}) => this.props.sendPost(apiUrls.posts, this.state.text)

    render() {

        if (this.props.isPostSending) {
            return <center>Заливаем пост...</center>;
        }

        return (
            <div>
                <Modal trigger={this.props.trigger}>
                    <Modal.Header>Добавление нового поста</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.TextArea name="text" onChange={this.onChange} label='Post text' placeholder='Press enter to continue :)'/>
                            <Form.Button onClick={this.handleSubmitClick}>ок</Form.Button>
                        </Form>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = ({posts}) => {
    return {
        isPostSending: posts.isPostSending,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({sendPost}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);