import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Dashboard from '../components/layout/Dashboard'
import Chats from '../pages/chats/Chats';

import PatientsOverview from '../pages/Dashboard/PatientsOverview';





function PatientsRoutes() {
    return (
      <Dashboard>
          <Switch>
            <Route path='/patient' component={PatientsOverview} />
            <Route path='/patient-chats' component={Chats} />
            <Redirect to='/patient'/>

          </Switch>
       
      </Dashboard>
    )
}

export default PatientsRoutes
