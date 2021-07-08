import React from 'react'
import { useState } from 'react';
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
    Platform
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import VerIcon from 'react-native-vector-icons/MaterialIcons';
import {connect} from "react-redux";
import * as actions from "../store/actions";
import Loader from "../component/loader";
import strings from "../localization/string";
import OTPInputView from '@twotalltotems/react-native-otp-input'
import ErrorModel from "../component/errorModel"


const {width,height}=Dimensions.get('window');
function OtpDetails({navigation,verifyOTP,route,getOtp}) {
    const [loading,setLoading]=useState(false)
    const [modal,setModal]=useState(false)
    const [fields,setFields]=useState({
        otp:"",
    });

    const [submit,setSubmit]=useState(false);

    function getValue(key,value){
        setFields((pS)=>{
            return{
                ...pS,
                [key]:value
            }
        })
    }

    function renderLoader(con){
        if(con==="show"){
            setLoading(true)
        }
        if(con==="hide"){
            setLoading(false)
        }
    }
    function renderModel(con){
        if(con=="show"){
            setModal(true)
        }
        if(con=="hide"){
            setModal(false)
        }
        
    }

    const [errorMessage,setErrorMessage]=useState("");

    function getErrorText(text){
       setErrorMessage(text)
    }
    
    return (
        <View style={{flex:1}}>
             <ImageBackground style={styles.backgroundImage} source={require('../../assets/regBackground.png')}>
                
             <ErrorModel
            title={errorMessage}
            visible={modal}
            closeModle={()=>renderModel('hide')}
            />
                <View style={styles.top}>
                <View>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Icon style={{margin:10}} name="arrow-back-circle-outline" size={30} color="white" />
                    </TouchableOpacity>
                </View>
                </View>
                <View style={styles.form}>
                    <View style={{width:'40%',justifyContent:'center',alignItems:'center'}}>
                        <Image
                        resizeMode="contain"
                        style={{width:100,height:80,marginTop:10}}
                        source={require("../../assets/regIcon.png")}
                        />
                        <Text style={{color:'white',fontWeight:'700',fontSize:16,textAlign:'center',marginBottom:20}}>{strings.OTP_DETAIL}</Text>
                    </View>
                    <View style={{width:'80%'}}>
                    <OTPInputView 
                    codeInputFieldStyle={{borderWidth:0,borderBottomWidth:2,fontSize:20,fontWeight:'700'}}
                
                    onCodeChanged={(v)=>getValue('otp',v)}
                    style={{height:200}} 
                    pinCount={6} />
                        {/* <TextInput
                        keyboardType="number-pad"
                        secureTextEntry
                        placeholder="Enter OTP"
                        placeholderTextColor="white"
                        style={styles.input}
                        /> */}
                         {!fields.otp && submit?<Text style={{color:'white',fontSize:10,textAlign:'right'}}>{strings.PLEASE_FILL}</Text>:null}
                    </View>
                    <Text style={{color:'rgba(255, 255, 255, 0.5)',fontWeight:'700',textDecorationLine:'underline'}}>{strings.RESEND_OTP}</Text>
                    <TouchableOpacity onPress={()=>{
                        setSubmit(true)
                        renderLoader('show')
                        if(fields.otp){
                            verifyOTP(fields.otp,renderLoader,navigation,route.params.mobileNumber,getOtp,true,renderModel,getErrorText)
                        }

                    }}>
                        <View style={styles.saveBtn}>
                            {loading?<Loader/>:(
                                <>
                                <VerIcon name="verified" color="white" size={20}/>
                            <Text style={{color:'white',marginLeft:6,fontWeight:'700'}}>{strings.VERIFY}</Text>
                            </>
                            )}
                        </View>
                    </TouchableOpacity>
                </View>
             </ImageBackground>

        </View>
    )
}

const styles = StyleSheet.create({
    input:{
        color:'white',
        width:'100%',
        backgroundColor:'rgba(0, 0, 0, 0.28)',
        borderRadius:40,
        paddingLeft:20,
        marginTop:5,
        marginBottom:5

    },
    form:{
        flex:1,
        width:"100%",
        alignItems:'center',
        justifyContent:'center'
    },
    backgroundImage:{
        width:width,
        height:height
    },
    top:{
        flexDirection:'row',
        width:'100%'
    },
    saveBtn:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#c5111f',
        paddingLeft:40,
        paddingRight:40,
        paddingTop:10,
        paddingBottom:10,
        borderRadius:40,
        marginTop:80
    }

})

export default connect(null,actions)(OtpDetails);
