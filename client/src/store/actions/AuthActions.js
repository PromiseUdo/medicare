import axios from 'axios'
import setAuthToken from './utils/setAuthToken'
import jwt_decode from 'jwt-decode'
export const setCurrentUser = user => {
    return {
         type: 'LOGIN',
         payload: user
     };
   };
  const isLoading = (state) => {
    return {
      type: 'LOADING',
      payload: state
    };
  };
  export const chattingWith = (state) => {
    return {
      type: 'CHATTING_WITH',
      payload: state
    };
  };
export const login =async (roles,state,dispatch) => {
    dispatch(isLoading(true))
    let user
    try {
        if(roles === 'doctor'){
            user = await axios.post("/api/v1/doctor/login",state)
        }else{
            user = await axios.post("/api/v1/patient/login",state)

        }
        
       
        const { token,role,name } = user.data;
        
        localStorage.setItem("user", JSON.stringify({token,role}));
        //set token as auth header using axios
        setAuthToken(token,role);
        const decoded = jwt_decode(token);
        const cred = {
            ...decoded,
            role,
            name
        }
        dispatch(isLoading(false))
       dispatch({
        type : 'LOGIN',
        payload:cred
       })  
    } catch (error) {
        console.log(error)
        dispatch(isLoading(false))
        alert('invalid credentials')
    }

    
}
export const logout = ()  => {
    try {
      
        //clear local storage
        localStorage.removeItem("user");
        //clear authHeader
        setAuthToken(false);
        //reset state to its initial value (i.e isAuthenticated :false, and user: {} ), by dispatchin an empty obj as parameter to store via setcurrentUser func as dis wud return empty obj in 'isEmpty()',wic mks isAuthenticated(false) nd "user : {}"
      
       return {
            type: 'LOGOUT'  
        }
        
    } catch (error) {
        console.error(error)
    }
        
  };
export const getRoute = (route) => {
return {
    type : 'ROUTE',
    payload : route
}
    
}
export const toggleChatWindow = (state) => {
return {
    type : 'CHAT_WINDOW',
    payload : state
}
    
}

export const registerDoc = async(data,history,dispatch) => {
    dispatch(isLoading(true))
    try {
        const user = await axios.post("/api/v1/doctor/register",data)
        if(user.status === 200) history.push('/login')
        dispatch(isLoading(false))
        
    } catch (error) {
        console.log(error)
    }

    
}

