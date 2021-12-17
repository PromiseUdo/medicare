import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Dashboard from '../components/layout/Dashboard'
import Chats from '../pages/chats/Chats';
import SingleChat from '../pages/chats/SingleChat';

function ChatRoutes() {
    return (
      <Dashboard>
          <Switch>
            <Route exact path='/chat' component={Chats} />
            <Route path='/chat/:id' component={SingleChat} />
            
            <Redirect to='/chat'/>

          </Switch>
       
      </Dashboard>
    )
}

export default ChatRoutes
