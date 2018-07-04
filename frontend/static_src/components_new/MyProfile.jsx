import React from 'react';
import {Card, Icon, Image, Grid, Segment} from 'semantic-ui-react'


class MyProfile extends React.Component {
    state = {};


    render() {
        const logoG = '';
        return (


            <Card centered={true}>
                <Image src={logoG}/>
                <Card.Content>
                    <Card.Header>
                        Pepe
                    </Card.Header>
                    <Card.Meta>
                                        <span className='date'>
                                            Joined in 2018
                                        </span>
                    </Card.Meta>
                    <Card.Description>
                        Pepe is a popular internet mem.
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <a>
                        <Icon name='user'/>
                    </a>
                </Card.Content>
            </Card>

        );
    }
}

export default MyProfile;