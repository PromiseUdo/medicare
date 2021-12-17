export const AuthReducer = (state, action) => {
    switch(action.type){
        case "LOADING" : 
        return {
            ...state,
            loading: action.payload
           
          };
        case "LOGIN" : 
        return {
            ...state,
            isAuthenticated: true,
            user: action.payload
           
          };
        case "LOGOUT" : 
        return {
            ...state,
            isAuthenticated: false,
            user:null
          };
        case "ROUTE" : 
        return {
            ...state,
            route : action.payload
        };
        case "CHAT_WINDOW" : 
        return {
            ...state,
            chatWindow : action.payload
        };
        case "CHATTING_WITH" : 
        return {
            ...state,
            chattingWith : action.payload
        };
        default : return state
    };

}