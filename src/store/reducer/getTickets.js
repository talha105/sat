import { GET_TICKETS} from "../actions/type"

const initialState=[];


export default function getTickets(state=initialState,action){

    switch(action.type){
        case GET_TICKETS:
            return action.payload;
        default:
            return state
    }
}