

const initialState=null


export default function otpRed(state=initialState,action){

    switch(action.type){
        case "otp":
            return action.payload;
        default:
            return state
    }
}