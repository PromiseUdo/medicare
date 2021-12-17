import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Login from '../pages/login/Login'
import SignUp from '../pages/signUp/SignUp'
function PublicRoutes() {
    return (
        <Switch>
            <Route path='/login' component={Login} />
            <Route path='/signup' component={SignUp} />
            <Redirect to='/login'/>
        </Switch>
    )
}

export default PublicRoutes
