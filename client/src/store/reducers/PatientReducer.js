export const PatientReducer = (state, action) => {
    switch(action.type){
        case "LOADING" : 
        return {
            ...state,
            loading: action.payload
           
          };
       
        case "PATIENT" : 
        return {
            ...state,
            patient: action.payload
           
          };
        default : return state
    };

}