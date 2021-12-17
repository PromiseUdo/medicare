export const ChatReducer = (state, action) => {
    switch(action.type){
        
      case "LOADING" : 
      return {
          ...state,
          isLoading: action.payload
         
        };
        case "CHATS" : 
        return {
            ...state,
            chatId: action.payload.chatId,
            messages : action.payload.messages
           
          };
        case "UPDATE_MESSAGE" : 
        return {
            ...state,
            messages : [...state.messages,action.payload]
           
          };
        case "CONVERSATIONS" : 
        return {
            ...state,
            conversations : action.payload
           
          };
        case "MESSAGES" : 
        return {
            ...state,
            messages : [...action.payload]
           
          };
        case "SET_CURRENT_CONVO" : 
        return {
            ...state,
            conversation : action.payload
           
          };
        case "POST_CONVERSATION" : 
        return {
            ...state,
            conversations : [...state.conversations,action.payload],
            conversation : action.payload
           
          };
        case "CLEAR_CHAT" : 
        return {
            ...state,
            messages : []
           
          };
        default : return state
    };

}