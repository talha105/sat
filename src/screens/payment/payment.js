import React from 'react'
import { useState,useEffect } from 'react';
import { 
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import ProIcon from "react-native-vector-icons/AntDesign";
import ByPoint from "../payment/bypoint";
import Bycard from "../payment/bycard";
import SuccesModal from "../../component/succesModal"
import Loader from '../../component/loader';
import strings from '../../localization/string';
import BookTicketsDetails from "../../component/bookTicketsDetails"
const {width,height}=Dimensions.get('window');
import ErrorModel from "../../component/errorModel";

function Payment({route,navigation,payByCard,payByPoint,getPoints,userData,points,getUserProfile}) {

    const [model,setModel]=useState(false)
    const [loading,setLoading]=useState(false)
    const [modal,setModal]=useState(false)

   const [paymentMethod,setPaymentMethod]=useState("byPoint");
    const renderPaymentMethod=()=>{
        if(paymentMethod==="byPoint"){
            return <ByPoint ticket={route.params}/>
        }
        if(paymentMethod==="byCard"){
            return <Bycard/>
        }
    }
    function renderLoading(con){
        if(con==="show"){
            setLoading(true)
        }
        if(con==="hide"){
            setLoading(false)
        }
    }
    function renderModel(con){
        if(con==="show"){
            setModel(true)
        }
        if(con==="hide"){
            setModel(false)
        }
    }
    useEffect(()=>{
        getPoints(userData.user_id,userData.mobile_number)
        getUserProfile(userData.user_id,userData.mobile_number)
    },[])
    function renderErrorModel(con){
        if(con=="show"){
            setModal(true)
        }
        if(con=="hide"){
            setModal(false)
        }
        
    }
    return (
        <View>
             <ImageBackground style={styles.backgroundImage} source={require('../../../assets/regBackground.png')}> 
             {/* <BookTicketsDetails
                 visible={model}
                 data={{...route.params.ticketBookInfo,...route.params.ticketInfo}}
                 closeModle={()=>{
                    navigation.navigate('booking')
                    renderModel('hide')
                 }}
                  /> */}
            <SuccesModal
            title={strings.SUC_BOOK}
            visible={model}
            closeModle={()=>renderModel('hide')}
            go={()=>{
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'bookTickets' }],
                  })
            }}
            />

            <ErrorModel
            title={strings.NO_POINTS}
            visible={modal}
            closeModle={()=>renderErrorModel('hide')}
            />
            
             <View style={styles.topBar}>
                        <TouchableOpacity style={{width:'33.33%'}} onPress={()=>navigation.goBack()}>
                        <Icon style={{margin:10}} name="arrow-back-circle-outline" size={30} color="white" />
                        </TouchableOpacity>
                        <View style={{width:'33.33%',alignItems:'center'}}>
                            <Text style={styles.title}>{strings.PAYMENT}</Text>
                        </View>
                        <TouchableOpacity onPress={()=>navigation.navigate('profile')} style={{width:'33.33%',alignItems:'flex-end',paddingRight:10}}>
                        <ProIcon style={{margin:10}} name="profile" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.btns}>
                        <TouchableOpacity style={{...styles.btn}} onPress={()=>{
                            // setPaymentMethod("byCard")
                            navigation.navigate('paywebView',{data:route.params,userData:userData})
                            // payByCard()
                        }}>
                            <Text style={styles.text}>{strings.PAY_BY_CARD}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={{...styles.btn}} 
                        onPress={()=>{
                            if(points.points>1){

                                    renderLoading(true)
                                    payByPoint(route.params,userData.user_id,userData.mobile_number,renderModel,renderLoading)

                            }else{
                                renderErrorModel("show")
                                // alert('you dont have enough points')
                            }
                        }}
                        >
                            {loading?<Loader/>:<Text style={styles.text}>{strings.PAY_BY_POINT}</Text>}
                        </TouchableOpacity>
                    </View>
                    {renderPaymentMethod()}
             </ImageBackground>

        </View>
    )
}

const styles = StyleSheet.create({
    backgroundImage:{
        width:width,
        height:height
    },
    topBar:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        marginTop:10
    },
    title:{
        color:'white',
        fontWeight:'700',
        fontSize:22,
    },
    btns:{
        marginTop:height/18,
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-around'
    },
    btn:{
        borderRadius:40,
        width:'35%',
        justifyContent:'center',
        alignItems:'center',
        height:38,
        backgroundColor:'#c5111f',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
    },
    text:{
        color:'white',
        fontWeight:'700'
    }
})

function mapStateToProps({points,userData}){
    return {points,userData}
}

export default connect(mapStateToProps,actions)(Payment);
