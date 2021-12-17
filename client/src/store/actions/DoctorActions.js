import axios from 'axios'

const isLoading = (state) => {
    return {
      type: 'LOADING',
      payload: state
    };
  };
const btnLoading = (state) => {
    return {
      type: 'BTN_LOADING',
      payload: state
    };
  };
export const registerPatient = async(data,dispatch) => {
    dispatch(isLoading(true))
    try {
        const user = await axios.post("/api/v1/patient/register",data)
       
        dispatch(isLoading(false))
        console.log(user)
        alert('success, patient registered')
    } catch (error) {
        console.log(error)
        dispatch(isLoading(false))
        alert('error, please try again later')
    }

    
}
export const getPatients = async(dispatch,qs) => {
    dispatch(isLoading(true))
    try {
        let query
        qs ? query=`/api/v1/patient?${qs}` : query = `/api/v1/patient`;
       
        const data = await axios.get(query)
       
        dispatch(isLoading(false))
        dispatch({
            type : 'PATIENTS',
            payload:data.data
           }) 
    
        
    } catch (error) {
        console.log(error)
        dispatch(isLoading(false))
        alert('error, please try again later')
    }

    
}
export const getDoctors = async(dispatch) => {
    dispatch(btnLoading(true))
    try {
        const data = await axios.get("/api/v1/doctor")
       
        dispatch(btnLoading(false))
        dispatch({
            type : 'DOCTORS',
            payload:data.data
           }) 
    
        
    } catch (error) {
        console.log(error)
        dispatch(isLoading(false))
        alert('error, please try again later')
    }

    
}
export const createEncounter = async(datas,dispatch) => {
    dispatch(isLoading(true))
    try {
        const data = await axios.post("/api/v1/encounter",datas)
       
        dispatch(isLoading(false))
        alert('success, encounter created')
        // dispatch({
        //     type : 'CREATE_ENCOUNTER',
        //     payload:data.data
        //    }) 
        console.log(data)
        
    } catch (error) {
        console.log(error)
        dispatch(isLoading(false))
        alert('error, please try again later')
    }

    
}
export const sendEncounterTo = async(datas,dispatch) => {
    dispatch(btnLoading(true))
    try {
        const data = await axios.post("/api/v1/encounter/send",datas)
       
        dispatch(btnLoading(false))
        alert('success, encounter sent')
        // dispatch({
        //     type : 'CREATE_ENCOUNTER',
        //     payload:data.data
        //    }) 
        console.log(data)
        
    } catch (error) {
        console.log(error)
        dispatch(btnLoading(false))
        alert('error, please try again later')
    }

    
}