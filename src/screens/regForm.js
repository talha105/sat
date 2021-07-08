import React, { useEffect } from 'react'
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
import SaveIcon from 'react-native-vector-icons/AntDesign';
import DateIcon from 'react-native-vector-icons/Fontisto';
import CheckBox from '@react-native-community/checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import * as actions from "../store/actions";
import strings from "../localization/string"
import SuccessModel from "../component/succesModal";
import Loader from "../component/loader";
import CountryPicker from 'react-native-country-picker-modal'
import { useRef } from 'react';
import PhoneInput from "react-native-phone-number-input";
import dateFormat from '../utils/dateFormat';
import checkAge from "../utils/checkAge";
import validateEmail from "../utils/validateEmail";
import checkSC from "../utils/checkSC";
import DropDownPicker from 'react-native-dropdown-picker';
import ErrorModel from "../component/errorModel";

const {width,height}=Dimensions.get('window');
function RegForm({navigation,registration,getRegCat,getCat,getCities,cities}) {
    const [sucModel,setSucModel]=useState(false);
    const [modal,setModal]=useState(false)
    const [loading,setLoading]=useState(false);
    const [date, setDate] = useState("");
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
    const [female, setFemale] = useState(false)
    const [male, setMale] = useState(false)
    const [maleDis,setMaleDis]=useState(false)
    const [femaleDis,setFemaleDis]=useState(false)
    const [fields,setFields]=useState({
        first_name:"",
        last_name:"",
        gender:"",
        date_of_birth:"",
        mobile_number:"",
        email:"",
        categories:"",
        nationality:"",
        city:"",
        job:""
    });

    const [formattedValue, setFormattedValue] = useState("");
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const phoneInput = useRef(null);

    const [submit,setSubmit]=useState(false);

    function getValue(key,value){
        setFields((pS)=>{
            return{
                ...pS,
                [key]:value
            }
        })
    }

    useEffect(()=>{
        getRegCat()
        getCities()
    },[])

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        getValue("date_of_birth",currentDate)
      };
    
      const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
    
      const showDatepicker = () => {
        showMode('date');
      };
      function hideSucModel(){
        setSucModel(false)
    }
    function showSucModel(){
        setSucModel(true)
    }
    function loaderRender(con){
        if(con==="show"){
            setLoading(true)
        }
        if(con==="hide"){
            setLoading(false)
        }
    }

    function renderErrorModel(con){
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
                <ScrollView style={{flex:1}}>
                <SuccessModel
                title={strings.REG_SUC}
                closeModle={hideSucModel}
                visible={sucModel}
                go={()=>navigation.navigate('otpDetails',{mobileNumber:fields.mobile_number})}
                />
                <ErrorModel
                title={errorMessage}
                visible={modal}
                closeModle={()=>renderErrorModel('hide')}
                />
                <View style={styles.top}>
                <View style={{width:'30%'}}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Icon style={{margin:10}} name="arrow-back-circle-outline" size={30} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={{width:'40%',justifyContent:'center',alignItems:'center'}}>
                    <Image
                    resizeMode="contain"
                    style={{width:100,height:80,marginTop:10}}
                    source={require("../../assets/regIcon.png")}
                    />
                    <Text style={{color:'white',fontWeight:'700',fontSize:16,textAlign:'center'}}>{strings.REGISTRATION}</Text>
                </View>
                <View style={{width:'30%'}}/>
                </View>
                <View style={styles.form}>
                    <View style={{width:'90%'}}>
                        <TextInput
                        placeholder={strings.FIRST_NAME}
                        onChangeText={(v)=>getValue('first_name',v)}
                        placeholderTextColor="white"
                        style={styles.input}
                        />
                        {checkSC(fields.first_name)?<Text style={{color:'white',fontSize:10,textAlign:'right'}}>{strings.SPECIAL_CHARAC_WARN}</Text>:null}
                        {!fields.first_name && submit?<Text style={{color:'white',fontSize:10,textAlign:'right'}}>{strings.PLEASE_FILL}</Text>:null}
                    </View>
                    <View style={{width:'90%'}}>
                        <TextInput
                        placeholder={strings.LAST_NAME}
                        placeholderTextColor="white"
                        onChangeText={(v)=>getValue('last_name',v)}
                        style={styles.input}
                        />
                        {checkSC(fields.last_name)?<Text style={{color:'white',fontSize:10,textAlign:'right'}}>{strings.SPECIAL_CHARAC_WARN}</Text>:null}
                         {!fields.last_name && submit?<Text style={{color:'white',fontSize:10,textAlign:'right'}}>{strings.PLEASE_FILL}</Text>:null}
                    </View>
                    <View style={{width:'90%',flexDirection:'row',justifyContent:'space-around',backgroundColor:'rgba(0, 0, 0, 0.28)',borderRadius:40,height:48,marginTop:5,marginBottom:5}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{color:'white'}}>{strings.MALE}</Text>
                            <CheckBox
                            disabled={maleDis}
                            value={male}
                            onValueChange={(newValue) => {
                                setMale(newValue)
                                newValue?getValue('gender','male'):null;
                                setFemaleDis((ps)=>!ps)
                            }}

                            />
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{color:'white'}}>{strings.FEMALE}</Text>
                            <CheckBox
                            disabled={femaleDis}
                            value={female}
                            onValueChange={(newValue) => {
                                setFemale(newValue)
                                newValue?getValue('gender','female'):null;
                                setMaleDis((ps)=>!ps)
                            }}

                            />
                        </View>
                    </View>
                    {!fields.gender && submit?<Text  style={{color:'white',fontSize:10,textAlign:'right',width:'90%'}}>{strings.PLEASE_SELECT}</Text>:null}
                    <View style={{width:'90%'}}>
                    <View style={{width:'100%',padding:20,alignItems:'center',flexDirection:'row',justifyContent:'flex-start',backgroundColor:'rgba(0, 0, 0, 0.28)',borderRadius:40,height:48,marginTop:5,marginBottom:5}}>
                        <TouchableOpacity onPress={showDatepicker} style={{flexDirection:'row',justifyContent:'center'}}>
                            <DateIcon name="date" color="white" size={15}/>
                            <Text style={{color:'white',marginLeft:2}}>{strings.DATE_OF_BIRTH}</Text>
                            <Text style={{color:'white',marginLeft:10}}>{date?dateFormat(date):null}</Text>
                        </TouchableOpacity>
                    </View>
                        {show && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={new Date()}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        />
                    )}
                     {!fields.date_of_birth && submit?<Text style={{color:'white',fontSize:10,textAlign:'right'}}>{strings.PLEASE_SELECT}</Text>:null}
                     {date?(
                                checkAge(date)<=14?<Text style={{color:'white',fontSize:10,textAlign:'right'}}>{strings.MIN_AGE}</Text>:null
                            ):null}
                     <View style={{width:'100%',marginVertical:5}}>
                        <TextInput
                        placeholder={strings.NATIONALITY}
                        placeholderTextColor="white"
                        onChangeText={(v)=>getValue('nationality',v)}
                        style={styles.input}
                        />
                         {!fields.nationality && submit?<Text style={{color:'white',fontSize:10,textAlign:'right'}}>{strings.PLEASE_FILL}</Text>:null}
                    </View>
                    </View>
                    <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
                    <View style={{width:'100%',justifyContent:'center',alignItems:'center',marginTop:3,marginBottom:3}}>
                    <PhoneInput
                    
                    containerStyle={{backgroundColor:'rgba(0, 0, 0, 0.28)',borderRadius:40,width:'90%',padding:0}}
                    codeTextStyle={{color:'white'}}
                    textInputStyle={{color:'white',justifyContent:'center',alignItems:'center'}}
                    textContainerStyle={{backgroundColor:'rgba(0, 0, 0, 0.1)',borderRadius:40,margin:0,paddingVertical:0}}
                    defaultValue={fields.mobile_number}
                    defaultCode="MA"
                    layout="first"
                    countryPickerProps={(c)=>console.log('s',c)}
                    onChangeText={(text) => {
                    setValid(text)
                    }}
                    
                    onChangeFormattedText={(text) => {
                        getValue('mobile_number',text.slice(1,text.length))
                    }}
                    withDarkTheme
                    withShadow
                    />
                    </View>
                        {/* <TextInput
                        placeholder={strings.MOBILE_NUMBER}
                        keyboardType="number-pad"
                        placeholderTextColor="white"
                        onChangeText={(v)=>getValue('mobile_number',v)}
                        style={styles.input}
                        /> */}
                         {!valid && submit?<Text style={{color:'white',fontSize:10,textAlign:'right',width:'90%'}}>{strings.PLEASE_SELECT}</Text>:null}
                    </View>
                    <View style={{width:'90%',marginTop:5}}>
                    <DropDownPicker
                    items={cities.map((c)=>{
                        return{ label:c.City, value:c.City }
                    })}
                    searchable
                    placeholder="Select City"
                    searchablePlaceholderTextColor="#ffffff"
                    defaultValue={fields.city}
                    containerStyle={{height: 50,borderRadius:30}}
                    style={{backgroundColor: 'rgba(0, 0, 0, 0.28)',borderColor:'rgba(0, 0, 0, 0)',borderBottomLeftRadius:30,borderBottomRightRadius:30,borderTopRightRadius:30,borderTopLeftRadius:30}}
                    labelStyle={{color:'#ffffff'}}
                    dropDownStyle={{borderColor:'#5c1016',backgroundColor:'#5c1016',borderBottomLeftRadius:20,borderBottomRightRadius:20}}
                    arrowColor="#ffffff"
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    onChangeItem={item =>getValue('city',item.value)}
                    />
                    {!fields.city && submit?<Text style={{color:'white',fontSize:10,textAlign:'right'}}>{strings.PLEASE_FILL}</Text>:null}
                        {/* <TextInput
                        placeholder={strings.CITY}
                        placeholderTextColor="white"
                        onChangeText={(v)=>getValue('city',v)}
                        style={styles.input}
                        />
                          */}
                    </View>
                    <View style={{width:'90%'}}>
                        <TextInput
                        placeholder={strings.EMAIL}
                        placeholderTextColor="white"
                        onChangeText={(v)=>getValue('email',v)}
                        style={styles.input}
                        />
                         {!validateEmail(fields.email) && fields.email && submit?<Text style={{color:'white',fontSize:10,textAlign:'right'}}>use correct email</Text>:null}
                         {!fields.email && submit?<Text style={{color:'white',fontSize:10,textAlign:'right'}}>{strings.PLEASE_SELECT}</Text>:null}
                    </View>
                    <View style={{width:'90%',backgroundColor:'rgba(0, 0, 0, 0.28)',paddingLeft:10,borderRadius:40,height:48,marginTop:5,marginBottom:5}}>
                        <RNPickerSelect
                        style={ {inputAndroid: {color: 'white'} }}
                        placeholder={{label:strings.CATEGORIES,value:"",color:'gray',key:'pleaseSeletec'}}
                        onValueChange={(value) =>{
                            getValue('categories',value)
                        }}
                        items={getCat.map((c,i)=>{
                            return{ label: c.CATEGORIE, value:c.CODE_CAT, key:i }
                        })}
                    />
                     {!fields.categories && submit?<Text style={{color:'white',fontSize:10,textAlign:'right'}}>{strings.PLEASE_SELECT}</Text>:null}
                    </View>
                    {/* <View style={{width:'90%',backgroundColor:'rgba(0, 0, 0, 0.28)',paddingLeft:10,borderRadius:40,height:48,marginTop:20,marginBottom:20}}>
                        <RNPickerSelect
                        style={ {inputAndroid: {color: 'white'} }}
                        placeholder={{label:strings.LANGAUGE,color:'gray'}}
                        onValueChange={(value) => getValue("language",value)}
                        items={[
                            { label: 'en', value: 'en' },
                            { label: 'fr', value: 'fr' },
                            { label: 'ara', value: 'ara' },
                        ]}
                    />
                     {!fields.language && submit?<Text style={{color:'white',fontSize:10,textAlign:'right'}}>Please Select</Text>:null}
                    </View> */}
                    <View style={{width:'90%',marginVertical:5}}>
                        <TextInput
                        placeholder={strings.JOB}
                        placeholderTextColor="white"
                        onChangeText={(v)=>getValue('job',v)}
                        style={styles.input}
                        />
                         {!fields.job && submit?<Text style={{color:'white',fontSize:10,textAlign:'right'}}>{strings.PLEASE_FILL}</Text>:null}
                    </View>
                    <TouchableOpacity onPress={()=>{
                        setSubmit(true)
                        // && fields.language
                        if(!checkSC(fields.first_name) && !checkSC(fields.last_name) && date?checkAge(date)>14:false && fields.first_name && fields.last_name && valid && fields.date_of_birth && fields.gender && fields.categories && fields.email && validateEmail(fields.email) ){
                            loaderRender('show')
                            registration(fields,showSucModel,loaderRender,renderErrorModel,getErrorText)
                        }else{
                        }

                    }}>
                        
                        <View style={styles.saveBtn}>
                            {
                                loading?<Loader/>:(
                                    <>
                                        <Icon name="save" color="white" size={20}/>
                                        <Text style={{color:'white',marginLeft:6}}>{strings.SAVE_DETAIL}</Text>
                                    </>
                                )
                            }
                        </View>
                    </TouchableOpacity>
                </View>
                </ScrollView>
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
        width:"100%",
        marginTop:10,
        alignItems:'center',
        justifyContent:'center'
    },
    backgroundImage:{
        width:width,
        height:height,
        flex:1
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
        width:'40%',
        paddingLeft:20,
        paddingRight:20,
        paddingTop:10,
        paddingBottom:10,
        borderRadius:40,
        marginTop:10,
        marginBottom:30
    }

})
function mapStateToProps({getCat,cities}){
    return{getCat,cities}
}

export default connect(mapStateToProps,actions)(RegForm);
