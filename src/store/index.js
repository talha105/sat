import {combineReducers,compose,createStore,applyMiddleware} from "redux";
import ReduxThunk from "redux-thunk";
import cities from "./reducer/cities";
import agencies from "./reducer/agencies";
import busses from "./reducer/buses";
import userData from "./reducer/user";
import profileUrl from "./reducer/profileUrl";
import history from "./reducer/history"
import points from "./reducer/points"
import notification from "./reducer/notifications"
import otpRed from "./reducer/otpRed"
import complaintsHis from "./reducer/complaintsHis"
import complaintDetail from "./reducer/complaintDetail"
import subject from "./reducer/subject"
import getCat  from "./reducer/getCat"
import bookTickets from "./reducer/bookTickets"
import tickets from "./reducer/getTickets"
import currentBooking from "./reducer/currentBooking"
import ticketPdf from "./reducer/ticketPdf"
const reducers =combineReducers({
    cities,
    agencies,
    busses,
    userData,
    profileUrl,
    history,
    points,
    notification,
    otpRed,
    complaintsHis,
    complaintDetail,
    subject,
    getCat,
    bookTickets,
    tickets,
    currentBooking,
    ticketPdf
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store =createStore(reducers,{},composeEnhancers(applyMiddleware(ReduxThunk)));


export default store