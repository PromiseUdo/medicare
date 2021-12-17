
import React ,{createContext} from 'react';
import { DoctorReducer } from '../reducers/DoctorReducer';

export const DoctorContext = createContext();

export default function DoctorContextProvider (props){
 const initialState ={
     loading:false,
     btnLoading:false,
     patients:{},
     encounters:{},
     doctors:{}
 };
 const [state, dispatch] = React.useReducer(DoctorReducer, initialState);


const value ={
state,
dispatch
}
    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}