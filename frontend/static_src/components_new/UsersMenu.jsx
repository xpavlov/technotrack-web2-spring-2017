import React, {Component} from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeItem} from './../actions/UsersMenu';
import PropTypes from 'prop-types';
import { Menu, Divider } from 'semantic-ui-react'


const MENU_ITEMS = ['My subscriptions', 'Subscribers', 'All users' ];


class UsersMenu extends Component {
    static propTypes = {
        changeItem: PropTypes.func.isRequired,
        activeItem: PropTypes.number,
    }

    render() {
        return (
            <Menu fluid vertical tabular>
                <Menu.Item name={MENU_ITEMS[0]} active={this.props.activeItem == 0} index={0} onClick={this.props.changeItem}/>
                <Menu.Item name={MENU_ITEMS[1]} active={this.props.activeItem == 1} index={1} onClick={this.props.changeItem}/>
                <Divider hidden/>
                <Menu.Item name={MENU_ITEMS[2]} active={this.props.activeItem == 2} index={2} onClick={this.props.changeItem}/>
            </Menu>
        )
    }
}


const mapStateToProps = ({UsersMenu}) => {
    return {
        activeItem: UsersMenu.activeItem,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({changeItem}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersMenu);