import {VERIFY_OTP} from "../actions/type"

const initialState={
        user_id: "",
        last_name: "",
        first_name: "",
        email: "",
        categories: "",
        gender: "",
        date_of_birth: "",
        mobile_number: "",
        language: "",
        POINTS: ""
}


export default function userData(state=initialState,action){

    switch(action.type){
        case VERIFY_OTP:
            return action.payload;
        default:
            return state
    }
}