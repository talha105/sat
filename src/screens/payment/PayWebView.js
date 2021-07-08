import React, { useEffect,useState } from "react";
import { View ,Text,StyleSheet,TouchableOpacity} from "react-native";
import ProIcon from "react-native-vector-icons/Ionicons";
import { WebView } from 'react-native-webview';
import AsynceStorage from "@react-native-async-storage/async-storage"
import Poster from "../../component/renderPoster";
import strings from "../../localization/string";
import BookTicketsDetails from "../../component/bookTicketsDetails";



function PayWebView({navigation,route}){
    const [hash,setHash]=useState('')
    const [lang,setLang]=useState('');
    const [model,setModel]=useState(false)
    useEffect(()=>{
        selectLang()
    },[])
    async function selectLang(){
        const lang=await AsynceStorage.getItem('lang');
        setLang(lang)
    }

    function renderModel(con){
        if(con==="show"){
            setModel(true)
        }else{
            setModel(false)
        }
    }

    
    return(
        <>
        <View style={styles.topBar}>
        {/* <BookTicketsDetails
                 visible={model}
                 data={{...route.params.data.ticketBookInfo,...route.params.data.ticketInfo}}
                 closeModle={()=>{
                    navigation.navigate('booking')
                    renderModel('hide')
                 }}
                  /> */}
            <Poster
            visible={model}
            closeModle={()=>renderModel('hide')}
            go={()=>{
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'bookTickets' }],
                  })
                // navigation.navigate('bookTickets')
            }}
            />
            <TouchableOpacity onPress={()=>navigation.navigate('booking')} style={{width:'33.33%',alignItems:'flex-start',paddingRight:10}}>
            <ProIcon style={{margin:10}} name="arrow-back-circle-outline" size={30} color="white" />
            </TouchableOpacity>
            <View style={{width:'33.33%',alignItems:'center'}}>
                <Text style={styles.title}>{strings.PAYMENT}</Text>
            </View>
            <View style={{width:'33.33%'}}/>
        </View>
        {lang?(
            <WebView source={{
                uri: 'http://51.210.176.186:80/CardPay/SendData.aspx',
                body: `hashAlgorithm=ver3&encoding=UTF-8&TranType=PreAuth&currency=504&amount=${route.params.data.ticketInfo.Amount}&CallbackResponse=true&BillToCity=xyz&BillToStateProv=xyz3&storetype=3D_PAY_HOSTING&BillToTelVoice=${route.params.userData.mobile_number}&failUrl=http://51.210.176.186:80/CardPay/OKFail.aspx&okUrl=http://51.210.176.186:80/CardPay/OKURL.aspx&callbackUrl=http://51.210.176.186:80/Book/CallBack&clientid=600002227&BillToName=${route.params.userData.first_name+" "+route.params.userData.last_name}&oid=${route.params.data.ticketBookInfo.transaction_id}&rnd=${Date.now()}&email=${route.params.userData.email}&lang=${lang}&storeKey=Ticket@SAT2020&AutoRedirect=true`,
                method:'POST'}} 
                onNavigationStateChange={(navState) => {

                    console.log('url',navState.url)
                    if(navState.url=="http://51.210.176.186/CardPay/OKURL.aspx"){

                        
                        renderModel('show')
                    }
                  }}
                />
        ):null}
        </>
    )
}

const styles=StyleSheet.create({
    topBar:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        marginBottom:10,
        backgroundColor:'#701400'
    }   
     ,title:{
        color:'white',
        fontWeight:'700',
        fontSize:22,
    },
})

export default PayWebView;

