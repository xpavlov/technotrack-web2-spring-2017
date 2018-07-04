import React from 'react';
import PostDetailComponent from './PostDetail';
import PostPopUp from './PostPopUp';
import MyProfile from './MyProfile';
import Navbar from './Navbar';
import Feed from './Feed';
import { Switch, Route, Redirect } from 'react-router-dom';

class App extends React.Component {
    state = {
        postList: [],
        isLoading: true,
        following: [],
        page: 0,
    };


    render() {
        return (
            <div>
                <Navbar/>
                <Switch>
                    <Route exact path="/" component={ () => <Redirect to={'/posts/'}/>} />
                    <Route exact path="/users/" component={ () => <Feed menuType={1}/> } />
                    <Route exact path="/me/" component={ () => <MyProfile/> } />
                    <Route exact path='/posts/' component={ () => <Feed menuType={0}/> }/>
                    <Route path='/posts/:postDetailsId' component={ (props) => <PostDetailComponent {...props} />}/>
                </Switch>
            </div>
        );
    }
}

export default App;