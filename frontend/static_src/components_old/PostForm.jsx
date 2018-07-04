import React from 'react';
import {FormGroup, Button, ControlLabel, FormControl} from 'react-bootstrap';
import apiUrls from './../constants/apiUrls';
import DjangoCSRFToken from 'django-react-csrftoken'
import PropTypes from 'prop-types';

const DEFAULT_STATE = {
    text: '',
    errors: {}
};

class PostForm extends React.Component {
    state = DEFAULT_STATE;

    static propTypes = {
        newPostRenderFunc: PropTypes.func.isRequired,
    };


    onChange = (e) => {
        console.log('onChange: ' + this.token);
        this.setState({[e.target.name]: e.target.value});
    }

    onPress = (e) => {
        e.preventDefault();
        fetch(
            apiUrls.posts, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({text: this.state.text}),
                headers: {
                    'content-type': 'application/json',
                    'X-CSRFToken': document.cookie.match(/csrftoken=([^ ;]+)/)[1]
                }
            }
        ).then(
            body => {
                if (body.status >= 200 && body.status < 300)
                    body.json().then(json => {
                        this.props.newPostRenderFunc(json);
                        this.setState(DEFAULT_STATE);
                    } )
                else if (body.status === 400){
                     body.json().then(json => {
                        this.setState({errors: json})
                     } )
                }
            }
        );
    }


    render() {


        return (
            <form>
                <FormGroup controlId="formTextarea">
                    <ControlLabel>Новый твит</ControlLabel>
                    <FormControl value={this.state.text} name="text" onChange={this.onChange} componentClass="textarea"
                                 placeholder="Press enter to continue :)"/>
                    <div>{ this.state.errors.text ? this.state.errors.text.map(item => item) : null }</div>
                </FormGroup>
                <button onClick={this.onPress} title="submit" type="submit">
                    Submit
                </button>
            </form>);
    }


}

export default PostForm;