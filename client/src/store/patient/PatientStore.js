
import React ,{createContext} from 'react';
import { PatientReducer } from '../reducers/PatientReducer';

export const PatientContext = createContext();

export default function PatientContextProvider (props){
 const initialState ={
     loading:false,
     patient:{},
    
 };
 const [state, dispatch] = React.useReducer(PatientReducer, initialState);


const value ={
state,
dispatch
}
    return (
        <PatientContext.Provider value={value}>
            {props.children}
        </PatientContext.Provider>
    )
}