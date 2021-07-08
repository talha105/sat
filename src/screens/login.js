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
import strings from "../localization/string";
import Loader from "../component/loader";
import CountryPicker from 'react-native-country-picker-modal'
import { useRef } from 'react';
import PhoneInput from "react-native-phone-number-input";
import ErrorModel from "../component/errorModel"

const {width,height}=Dimensions.get('window');
function Login({navigation,login}) {

    const [loading,setLoading]=useState(false)
    const [fields,setFields]=useState({
        mobile_number:""
    });

    const [valid, setValid] = useState(false);
    const [modal,setModal]=useState(false)


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
        if(con=="show"){
            setLoading(true)
        }
        if(con=="hide"){
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
                <View style={styles.form}>
                    <View style={{width:'40%',justifyContent:'center',alignItems:'center'}}>
                        <Image
                        resizeMode="contain"
                        style={{width:100,height:80,marginTop:10}}
                        source={require("../../assets/regIcon.png")}
                        />
                        <Text style={{color:'white',fontWeight:'700',fontSize:16,textAlign:'center',marginBottom:20}}>{strings.LOGIN}</Text>
                    </View>
                    <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
                    <PhoneInput
                    
                    containerStyle={{backgroundColor:'rgba(0, 0, 0, 0.28)',borderRadius:40,width:'90%',padding:0}}
                    codeTextStyle={{color:'white'}}
                    textInputStyle={{color:'white',justifyContent:'center',alignItems:'center'}}
                    textContainerStyle={{backgroundColor:'rgba(0, 0, 0, 0.1)',borderRadius:40,margin:0,paddingVertical:0}}
                    defaultValue={fields.mobile_number}
                    defaultCode="MA"
                    layout="first"
                    onChangeText={(text) => {
                    setValid(text)
                    }}
                    onChangeFormattedText={(text) => {
                        getValue('mobile_number',text.slice(1,text.length))
                    }}
                    withDarkTheme
                    withShadow
                    />
                        {/* <TextInput
                        keyboardType="number-pad"
                        placeholder={strings.MOBILE_NUMBER}
                        onChangeText={(v)=>getValue('mobile_number',v)}
                        placeholderTextColor="white"
                        style={styles.input}
                        /> */}
                        {!valid && submit?<Text style={{color:'white',fontSize:10,textAlign:'right',width:'90%',marginTop:10}}>{strings.PLEASE_FILL}</Text>:null}
                    </View>
                    <TouchableOpacity onPress={()=>navigation.navigate('regForm')}>
                    <Text style={{color:'rgba(255, 255, 255, 0.5)',fontWeight:'700',textDecorationLine:'underline'}}>{strings.REGISTRATION}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop:80}} onPress={()=>{
                        setSubmit(true)
                        if(valid){
                            renderLoader('show')
                            login(fields.mobile_number,navigation,renderLoader,renderModel,getErrorText)

                            // login('6622163660',navigation,renderLoader,renderModel)  // repmove later
                        }

                    }}>
                        <View style={styles.saveBtn}>
                            {loading?<Loader
                            />:(
                                <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <Text style={{color:'white',marginLeft:6,fontWeight:'700',marginRight:5}}>{strings.SUBMIT}</Text>
                                <VerIcon name="arrow-forward" color="white" size={20}/>
                                </View>
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
        width:'70%',
        height:40,
        borderRadius:40,
    }

})

export default connect (null, actions)(Login);
