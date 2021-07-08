import { GET_BUSES,CHANGE_AMOUNT} from "../actions/type"

const initialState=false;


export default function busses(state=initialState,action){

    switch(action.type){
        case GET_BUSES:
            return action.payload;
        case CHANGE_AMOUNT:
             const updateState= [...state].filter((item)=>item.voyage_id=action.payload.voyage_id)
            return updateState
        default:
            return state
    }


}