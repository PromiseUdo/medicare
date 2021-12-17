export const DoctorReducer = (state, action) => {
    switch(action.type){
        case "LOADING" : 
        return {
            ...state,
            loading: action.payload
           
          };
        case "BTN_LOADING" : 
        return {
            ...state,
            btnLoading: action.payload
           
          };
        case "PATIENTS" : 
        return {
            ...state,
            patients: action.payload
           
          };
        case "DOCTORS" : 
        return {
            ...state,
            doctors: action.payload
           
          };
        case "CREATE_ENCOUNTER" : 
        return {
            ...state,
            patients: action.payload
           
          };
      
       
        default : return state
    };

}