import React from 'react';
import {Link} from 'react-router-dom'
import {Menu, Dropdown, Image,} from 'semantic-ui-react'
import PostPopUp from './PostPopUp';


class Navbar extends React.Component {
    state = {};
 
    handleContextRef = contextRef => this.setState({contextRef});

    render() {
        const {contextRef} = this.state;
        const logoG = '';
        const logoR = '';
        return (
            <Menu fixed='top'>

                <Menu.Item>
                    <Image spaced='right' src={logoG}/>
                    Pepetter
                </Menu.Item>

                <Dropdown item icon='user' simple>
                    <Dropdown.Menu>
                        <Dropdown.Item><Link to="/me/"> Me </Link></Dropdown.Item>
                        <Dropdown.Item><Link to="/"> Feed </Link></Dropdown.Item>
                        <Dropdown.Item><Link to="/users/"> Users </Link></Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>Log out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <PostPopUp/>
            </Menu>
        );

    }
}

export default Navbar;