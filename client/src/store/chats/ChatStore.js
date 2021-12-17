
import React ,{createContext} from 'react';
import { ChatReducer } from '../reducers/ChatReducer';

export const ChatContext = createContext();

export default function ChatContextProvider (props){
 const initialState ={
     isLoading:false,
     messages : [],
     conversation:{},
     conversations:[]
 };
 const [state, dispatch] = React.useReducer(ChatReducer, initialState);


const value ={
state,
dispatch
}
    return (
        <ChatContext.Provider value={value}>
            {props.children}
        </ChatContext.Provider>
    )
}