import axios from 'axios'
const isLoading = (state) => {
    return {
      type: 'LOADING',
      payload: state
    };
  };

export const getPatient = async(dispatch) => {
    dispatch(isLoading(true))
    
    try {
       
        const data = await axios.get(`/api/v1/patient/me`)
       
        dispatch(isLoading(false))
        dispatch({
            type : 'PATIENT',
            payload:data.data
           }) 
    
        
    } catch (error) {
        console.log(error)
        dispatch(isLoading(false))
        alert('error, please try again later')
    }

    
}
