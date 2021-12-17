import axios from 'axios'
export const newChat = (state) => {
    return {
      type: 'CHATS',
      payload: state
    };
  };
export const updateMsg = (state) => {
    return {
      type: 'UPDATE_MSG',
      payload: state
    };
  };
export const clearChat = () => {
    return {
      type: 'CLEAR_CHAT'
    };
  };
  const isLoading = (state) => {
    return {
      type: 'LOADING',
      payload: state
    };
  };

  export const getConversations = async(dispatch) => {
   // dispatch(isLoading(true))
    try {
        const data = await axios.get(`/api/v1/conversation`)
       
        dispatch(isLoading(false))
   
        dispatch({
          type : 'CONVERSATIONS',
          payload:data.data.data
         }) 
    } catch (error) {
        console.log(error)
        dispatch(isLoading(false))
        alert('error, please try again later')
    }

}
  export const getMsgs = async(conversationId,dispatch) => {
    dispatch(isLoading(true))
    try {
        const data = await axios.get(`/api/v1/message/${conversationId}`)
       
        dispatch(isLoading(false))
       
        dispatch({
          type : 'MESSAGES',
          payload:data.data.data
         }) 
    } catch (error) {
        console.log(error)
        dispatch(isLoading(false))
        alert('error, please try again later')
    }

    
}
  export const postMsgs = async(msg) => {
 
    try {
        const data = await axios.post(`/api/v1/message`,msg)
        console.log(data)
        
    } catch (error) {
        console.log(error)
      
        alert('error, please try again later')
    }

    
}
  export const updateMsgs = (msg) => {
 
    return {
      type: 'UPDATE_MESSAGE',
      payload:msg

    };

    
}
  export const setCurrentConversation = (msg) => {

    return {
      type: 'SET_CURRENT_CONVO',
      payload:msg

    };

    
}
  export const postConversation = async(receiverId,dispatch) => {
   // dispatch(isLoading(true))
    try {
        const data = await axios.post(`/api/v1/conversation/${receiverId}`)
       
        dispatch(isLoading(false))
        console.log(data)
        dispatch({
          type : "POST_CONVERSATION",
          payload:data.data.data
         }) 
    } catch (error) {
        console.log(error)
        dispatch(isLoading(false))
        alert('error, please try again later')
    }

    
}