import axios from "axios"
import {api} from "../../config/config.json"
import { BOOKING_HISTORY, CHANGE_AMOUNT, CURRENT_BOOKING, GET_AGENCIES, GET_BOOK_TICKET, GET_BUSES, GET_CITIES,GET_COM_DET,GET_COM_HIS,GET_NOTIFICATION,GET_PDF,GET_POINTS,GET_PROFILE_PIC,GET_REG_CAT,GET_SUBJECT,GET_TICKETS,VERIFY_OTP } from "./type";
import userKeyGenerator from "../../utils/userKeyGenerator"
import AsynceStorage from "@react-native-async-storage/async-storage"
import AsyncStorage from "@react-native-async-storage/async-storage";
import dateFormat from "../../utils/dateFormat"



export const registration=(data,showmodel,loaderRender,renderErrorModel,getErrorText)=>async(dispatch)=>{
    data.date_of_birth=dateFormat(data.date_of_birth)
    const lang=await AsynceStorage.getItem('lang');
    data.language=lang

        const res= await axios.post(`${api}/user/UserRegistration`,null,{
            params:data
        });
        if(res.data.statut==="success"){

            const res= await axios.post(`${api}/User/UserLogin`,null,{
                params:{
                    mobile_number:data.mobile_number,
                    language:lang
                }
            })

            await AsyncStorage.setItem('no',data.mobile_number)
            showmodel();
            loaderRender('hide')
        }
        else{
            getErrorText(res.data.message)
            renderErrorModel('show')
        // alert("Invalid Mobile no or already used");
        loaderRender('hide')
    }
}

export const login=(no,navigation,renderLoader,renderModel,getErrorText)=>async(dispatch)=>{

    const lang= await AsynceStorage.getItem('lang');
    const res= await axios.post(`${api}/User/UserLogin`,null,{
        params:{
            mobile_number:no,
            language:lang
        }
    });


    if(res.data.statut==="success"){
        renderLoader("hide")
        console.log("suc")
        navigation.navigate('otpDetails',{mobileNumber:no})
        await AsyncStorage.setItem('no',no)
    }else{
        getErrorText(res.data.message)
        renderModel('show')
        // alert("invalid mobile no")
        renderLoader("hide")
    }

}

export const getCities=()=>async(dispatch)=>{
    const lang= await AsynceStorage.getItem('lang');
    const res= await axios.post(`${api}/Admin/GetCities`,null,{
        params:{
            language:lang
        }
    });

    dispatch({
        type:GET_CITIES,
        payload:res.data.cities
    })
}

export const getAgencies=(city,userId,mobile_number)=>async(dispatch)=>{
    const lang= await AsynceStorage.getItem('lang');
    const res= await axios.post(`${api}/Admin/GetAgencies`,null,{
        params:{
            language:lang,
            key_user:userKeyGenerator(mobile_number),
            user_id:userId,
            city:city
        }
    });

    dispatch({
        type:GET_AGENCIES,
        payload:res.data.agencies
    })
}

export const getBuses=(dCity,aCity,agen,date,user,renderLoader,noOfPas)=>async(dispatch)=>{
    const lang= await AsynceStorage.getItem('lang');
    date=date?"0"+date.getDate()+"/"+"0"+(date.getMonth()+1)+"/"+date.getFullYear():'19/11/2019';

    const res= await axios.post(`${api}/Book/GetBusList`,null,{
        params:{
            language:lang,
            key_user:userKeyGenerator(user.mobile_number),
            user_id:user.user_id,
            arrival_id:aCity,
            departure_id:dCity,
            agency_id:agen,
            date_depart:date,
            no_of_passengers:noOfPas
        }
    });
    dispatch({
        type:GET_BUSES,
        payload:res.data.busses
    })
  renderLoader?renderLoader(false):null
}


export const verifyOTP=(otp,renderLoader,navigation,no,getOtp,renderFromRoutes,renderModel,getErrorText)=>async(dispatch)=>{
    const lang= await AsynceStorage.getItem('lang');
    const fcm=await AsyncStorage.getItem('notificationToken');
    console.log('fcm',fcm)
    const res= await axios.post(`${api}/user/verifyotp`,null,{
        params:{
            language:lang,
            key_user:userKeyGenerator(no),
            otp:otp,
            device_id:"1",
            plateform:'1',
            fcm_token:fcm,
            mobile_number:no
        }
    });

    if(res.data.statut=== "success"){
        renderLoader? renderLoader('hide'):null
        dispatch({
            type: VERIFY_OTP,
            payload:res.data.user
        })
        await AsynceStorage.setItem('otp',otp)
        getOtp(otp)
    }else{
        getErrorText?getErrorText(res.data.message):null
        renderModel('show')
        renderLoader('hide');
    }
}

export const getProfilePic=(userId,mobile_no)=>async(dispatch)=>{
    const lang= await AsynceStorage.getItem('lang');
    const res= await axios.post(`${api}/User/GetUserPIF`,null,{
        params:{
            language:lang,
            key_user:userKeyGenerator(mobile_no),
            user_id:userId
        }
    });

    dispatch({
        type: GET_PROFILE_PIC,
        payload:res.data
    })

}

export const updateProfile=(img,userId,no)=>async(dispatch)=>{
    const file={
            uri: img.path,
            type: img.mime,
            name: img.path.slice(img.path.lastIndexOf('/')+1,img.path.length)
        }
        console.log(file)
    const bodyForm=new FormData();
    bodyForm.append("language",'en')
    bodyForm.append("user_id",userId)
    bodyForm.append("imgefile",file)
    bodyForm.append('key_user',userKeyGenerator(no))

    const res= await axios.post(`${api}/User/UpdateUserPI`,
        bodyForm,
        {
            headers: { 'content-type': 'multipart/form-data' },
            
        }
    );

    console.lo(res.data)

}


export const updateProfileData=(fields,showSuccessModel,setLoading)=>async(dispatch)=>{
    
    const data={...fields}
    data.category=fields.categories
    data.nationality=fields.Nationality
    data.city=fields.City
    delete data.POINTS;
    delete data.date_of_birth;
    delete data.mobile_number;
    delete data.gender;
    delete data.language;
    delete data.user_id
    delete data.Nationality
    delete data.City
    delete data.categories

    console.log(data)

    const res= await axios.post(`${api}/User/UpdateUserDetails`,null,{
        params:{
            ...data,
            language:fields.language,
            key_user:userKeyGenerator(fields.mobile_number),
            user_id:fields.user_id
        }
    });
    if(res.data.statut==="success"){
        setLoading(false)
        showSuccessModel(true)
    }else{
        setLoading(false)
    }

}


export const getUserHistory=(userId,mobileNo,dCity,aCity,tDate,fDate)=>async(dispatch)=>{

    const lang= await AsynceStorage.getItem('lang');
    tDate=tDate.getDate()+"/"+tDate.getMonth()+"/"+tDate.getFullYear();
    fDate=fDate.getDate()+"/"+fDate.getMonth()+"/"+fDate.getFullYear();
    if(dCity==="not"){
        const res= await axios.post(`${api}/book/GetUserHistory`,null,{
            params:{
                language:lang,
                user_id:userId,
                key_user:userKeyGenerator(mobileNo),
                // city_departure:dCity,
                // arrival_city:aCity,
                // // departure_date1:"",
                // // departure_date2:""
            }
        });
    
        dispatch({
            type:BOOKING_HISTORY,
            payload:res.data.history
        })
    }else{
        const res= await axios.post(`${api}/book/GetUserHistory`,null,{
            params:{
                language:lang,
                user_id:userId,
                key_user:userKeyGenerator(mobileNo),
                city_departure:dCity,
                arrival_city:aCity,
                departure_date1:tDate,
                departure_date2:fDate
            }
        });
    
        dispatch({
            type:BOOKING_HISTORY,
            payload:res.data.history
        })
    }
    

}

export const getPoints=(user_id,mobile_no)=>async(dispatch)=>{

    const lang= await AsynceStorage.getItem('lang');

    const res= await axios.post(`${api}/User/GetUserPointBalance`,null,{
        params:{
            language:lang,
            key_user:userKeyGenerator(mobile_no),
            user_id:user_id
        }
    });
    dispatch({
        type:GET_POINTS,
        payload:res.data
    })


}
export const getNotifications=(user_id,mobile_no)=>async(dispatch)=>{

    const lang= await AsynceStorage.getItem('lang');

    const res= await axios.post(`${api}/User/GetUserNotification`,null,{
        params:{
            language:lang,
            key_user:userKeyGenerator(mobile_no),
            user_id:user_id
        }
    });
    dispatch({
        type:GET_NOTIFICATION,
        payload:res.data.notifications
    })


}


export const payByCard=()=>async(dispatch)=>{
//     console.log("sendpay")
//     const data=new FormData();
//     data.append('hashAlgorithm','ver3');
//     data.append('encoding','UTF-8')
//     data.append('TranType','PreAuth')
//     data.append('currency','504')
//     data.append('amount','16.37')
//     data.append('CallbackResponse','true')
//     data.append('BillToCity','ver3')
//     data.append('BillToStateProv','ver3')
//     data.append('storetype','3D_PAY_HOSTING')
//     data.append('BillToTelVoice','0661245784')
//     data.append('failUrl','http://51.210.176.186:80/CardPay/OKFail.aspx')
//     data.append('callbackUrl','http://51.210.176.186:80/Book/CallBack')
//     data.append('clientid','600002227')
//     data.append('BillToName','talhadfg meofdg')
//     data.append('oid','213141BZ075139')
//     data.append('rnd',Date.now())
//     data.append('email','talhakhan@yahoo.coma')
//     data.append('lang','en');
//     const res= await axios.post(`${api}/CardPay/SendData.aspx`,data);

// console.log(res.data)
}

export const booking=(ticket,mobile_number,user_id,noOfPas,goToPay)=>async(dispatch)=>{

    const lang= await AsynceStorage.getItem('lang');
    const res= await axios.post(`${api}/Book/SaveBooking`,null,{
        params:{
            language:lang,
            key_user:userKeyGenerator(mobile_number),
            user_id:user_id,
            voyage_id:ticket.voyage_id,
            no_of_passengers:noOfPas? noOfPas:5,
            ordre1:ticket.Ordre1,
            ordre2:ticket.Ordre2,
        }
    });
    goToPay(res.data)
    dispatch({
        type:CURRENT_BOOKING,
        payload:res.data
    })
}

export const payByPoint=(data,user_id,mobile_number,showmodel,renderLoading)=>async(dispatch)=>{

    const lang= await AsynceStorage.getItem('lang');
    const res= await axios.post(`${api}/Book/ValidationBooking`,null,{
        params:{
            language:lang,
            key_user:userKeyGenerator(mobile_number),
            user_id:user_id,
            transaction_id:data.ticketBookInfo.transaction_id,
            type_paiement:'P'
        }
    });
    renderLoading('hide')

    if(res.data.statut==="success"){
        
        showmodel('show')
        dispatch({
            type:GET_TICKETS,
            payload:res.data.tickets
        })
        console.log("point",res.data)
    }
    
}


export const getOtp=(otp)=>async(dispatch)=>{

    if(otp){
        dispatch({
            type:"otp",
            payload:otp
        })
    }else{
        AsyncStorage.removeItem('otp')
        dispatch({
            type:"otp",
            payload:null
        })
    }

} 


export const getComplainHistory=(user_id,mobile_no)=>async(dispatch)=>{
    console.log(user_id)
    console.log(userKeyGenerator(mobile_no))

    const lang= await AsynceStorage.getItem('lang');
    const res= await axios.post(`${api}/user/GetComplaintHistory`,null,{
        params:{
            language:lang,
            user_id:user_id,
            key_user:userKeyGenerator(mobile_no),
            

        }
    });

    dispatch({
        type:GET_COM_HIS,
        payload:res.data.history
    })
    
}

export const addComplaint=(user_id,mobile_no,fields,renderLoader,showSuccessModel)=>async(dispatch)=>{
    console.log(user_id)
    console.log(userKeyGenerator(mobile_no))
    console.log(fields)
    const lang= await AsynceStorage.getItem('lang');
    const res= await axios.post(`${api}/User/AddComplaint`,null,{
        params:{
            language:lang,
            user_id:user_id,
            key_user:userKeyGenerator(mobile_no),
            sujet_complaint:fields.sujet_complaint,
            description_complaint:fields.description
            

        }
    });
         console.log(res.data)
        renderLoader(false)
        showSuccessModel(true)
}

export const getComplainDetails=(user_id,mobile_no,ticketId)=>async(dispatch)=>{

    const lang= await AsynceStorage.getItem('lang');
    const res= await axios.post(`${api}/User/GetComplaintDetails`,null,{
        params:{
            language:lang,
            user_id:user_id,
            key_user:userKeyGenerator(mobile_no),
            id_Ticket:ticketId
            

        }
    });
    dispatch({
        type:GET_COM_DET,
        payload:res.data.Detail
    })
}

export const getComplaintSub=()=>async(dispatch)=>{

    const lang= await AsynceStorage.getItem('lang');
    const res= await axios.post(`${api}/Admin/GetSujetComplaint`,null,{
        params:{
            language:lang,
        }
    });
    dispatch({
        type:GET_SUBJECT,
        payload:res.data.Sujet_Complaints
    })
}

export const getRegCat=()=>async(dispatch)=>{
    const lang= await AsynceStorage.getItem('lang');
    const res= await axios.post(`${api}/Admin/GetCategories`,null,{
        params:{
            language:lang,
        }
    });

    dispatch({
        type:GET_REG_CAT,
        payload:res.data.categories
    })
}

export const getBookTickets=(userId,mobileNo)=>async(dispatch)=>{

    const lang= await AsynceStorage.getItem('lang');
    const res= await axios.post(`${api}/Book/CurrentBooking`,null,{
        params:{
            language:lang,
            key_user:userKeyGenerator(mobileNo),
            user_id:userId
        }
    });


    dispatch({
        type:GET_BOOK_TICKET,
        payload:res.data.Books
    })
}

export const getTickets=(userId,mobileNo,transaction_id)=>async(dispatch)=>{
    const lang= await AsynceStorage.getItem('lang');
    const res= await axios.post(`${api}/Book/GetCheckoutDetails`,null,{
        params:{
            language:lang,
            key_user:userKeyGenerator(mobileNo),
            user_id:userId,
            transaction_id:transaction_id
        }
    });

    console.log("ti",res.data)

    dispatch({
        type:GET_TICKETS,
        payload:res.data.ticket
    })
}



export const getTicketPdf=(userId,mobileNo,transaction_id)=>async(dispatch)=>{

    const lang= await AsynceStorage.getItem('lang');
    const res= await axios.post(`${api}/Book/PrintTicket`,null,{
        params:{
            language:lang,
            key_user:userKeyGenerator(mobileNo),
            user_id:userId,
            transaction_id:transaction_id
        }
    });

    dispatch({
        type:GET_PDF,
        payload:res.data
    })
}


export const applyPromoCode=(userId,mobileNo,transaction_id,code,data)=>async(dispatch)=>{
    const lang= await AsynceStorage.getItem('lang');
    const res= await axios.post(`${api}/Book/Promo`,null,{
        params:{
            language:lang,
            key_user:userKeyGenerator(mobileNo),
            user_id:userId,
            transaction_id:transaction_id,
            code:code
        }
    });

    if(res.data.statut=="success"){
        const oldData={...data}
        data.oldAmount=oldData.Amount;
        data.Amount=res.data.promoCode.amount
        console.log(data)
        dispatch({
            type:CHANGE_AMOUNT,
            payload:data
        })
    }else{
        alert("Invalid promo code")
    }
}

export const getUserProfile=(userId,mobileNo)=>async(dispatch)=>{

    const lang= await AsynceStorage.getItem('lang');
    const res= await axios.post(`${api}/User/GetUserProfile`,null,{
        params:{
            language:lang,
            key_user:userKeyGenerator(mobileNo),
            user_id:userId,
        }
    });
    dispatch({
        type: VERIFY_OTP,
        payload:res.data.user
    })
}