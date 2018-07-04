import React, {Component} from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeItem} from './../actions/FeedMenu';
import CreatePost from './CreatePost'
import {Form, TextArea, Menu, Button, Divider, Modal, Header} from 'semantic-ui-react'
import PropTypes from 'prop-types';


const MENU_ITEMS = ['All events', 'Friend's posts', 'My posts' , 'All posts' ];


class FeedMenu extends Component {
    static propTypes = {
        changeItem: PropTypes.func.isRequired,
        activeItem: PropTypes.number,
    }

    render() {
        return (
            <div>
                <Menu fluid vertical tabular>
                    <Menu.Item name={MENU_ITEMS[0]} active={this.props.activeItem == 0} index={0} onClick={this.props.changeItem}/>
                    <Menu.Item name={MENU_ITEMS[1]} active={this.props.activeItem == 1} index={1} onClick={this.props.changeItem}/>
                    <Menu.Item name={MENU_ITEMS[2]} active={this.props.activeItem == 2} index={2} onClick={this.props.changeItem}/>
                    <Divider hidden/>
                    <Menu.Item name={MENU_ITEMS[3]} active={this.props.activeItem == 3} index={3} onClick={this.props.changeItem}/>

                </Menu>
                <CreatePost trigger={<Button color='green' attached="bottom">Добавить пост</Button>}/>
            </div>
        )
    }
}


const mapStateToProps = ({FeedMenu}) => {
    return {
        activeItem: FeedMenu.activeItem,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({changeItem}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedMenu);