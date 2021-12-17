import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Dashboard from '../components/layout/Dashboard'


import Overview from '../pages/Dashboard/Overview';



import RegisterPatients from '../pages/registerPatients/RegisterPatients';
import Patients from '../pages/patients/Patients';
import Encounter from '../pages/encounter/Encounter';
import Chats from '../pages/chats/Chats';


function DoctorsRoutes() {
    return (
      <Dashboard>
          <Switch>
            <Route path='/overview' component={Overview} />
            <Route path='/register' component={RegisterPatients} />
            <Route path='/patients' component={Patients} />
            <Route path='/chats' component={Chats} />
          
            <Route exact path='/encounter/:id' component={Encounter} />
            
            <Redirect to='/overview'/>

          </Switch>
       
      </Dashboard>
    )
}

export default DoctorsRoutes
