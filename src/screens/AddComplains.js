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
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import * as actions from "../store/actions";
import ProIcon from "react-native-vector-icons/Ionicons";
import EditIcon from "react-native-vector-icons/Entypo";
import { useEffect } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import ImagePickerModel from "../component/imagePicker";
import SuccessModel from "../component/succesModal";
import Loader from "../component/loader"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import strings from "../localization/string"

const {width,height}=Dimensions.get('window');



function AddComplaint({userData,navigation,addComplaint,getComplaintSub,subject}) {
    const [selectedCSubject, setSelectedCSubject] = useState('');
    const [submit,setSubmit]=useState(false)
    const [fields,setFields]=useState({
        sujet_complaint:"",
        description:""
    })
    useEffect(()=>{
        getComplaintSub()
    },[])

    const getValue=(key,value)=>{
        setFields((pS)=>{
            return{
                ...pS,
                [key]:value
            }
        })
    }
    const [successModel,setSuccessModel]=useState(false);
    const [loading,setLoading]=useState(false)

   
    function showSuccessModel(con){
        con?setSuccessModel(true):setSuccessModel(false)
    }
    function renderLoader(con){
        con?setLoading(true):setLoading(false)
    }

    return (
        <View>
             <ImageBackground style={styles.backgroundImage} source={require('../../assets/regBackground.png')}>
                 <SuccessModel
                 title="UPDATED"
                 visible={successModel}
                 closeModle={()=>showSuccessModel(false)}
                 go={()=>{
                    navigation.push('complaints')
                 }}
                 />
             <View style={styles.topBar}>
                        <View style={{width:'25%',justifyContent:'flex-start'}}/>
                        <TouchableOpacity onPress={()=>navigation.navigate('complaints')} style={{width:'30%',alignItems:'flex-start',paddingRight:10}}>
                            <ProIcon style={{margin:10}} name="arrow-back-circle-outline" size={30} color="white" />
                        </TouchableOpacity>
                        <View style={{width:'70%',alignItems:'flex-start'}}>
                            <Text style={styles.title}>{strings.ADD_COMPLAINT}</Text>
                        </View>
                        <View style={{width:'25%'}}/>
                    </View>
                    <View style={styles.cards}>
                        <View style={{width:'100%'}}>
                        <Text style={styles.txt}>{strings.COMPLAINT_SUB}</Text>
                            <View style={styles.input}>
                                <Picker
                                style={{color:'white'}}
                                selectedValue={selectedCSubject}
                                onValueChange={(itemValue, itemIndex) =>{
                                    setSelectedCSubject(itemValue)
                                    getValue("sujet_complaint",itemValue)
                                }
                                }>
                                    <Picker.Item
                                    label="Please Select"
                                    value=""
                                    />
                                    {subject.map((s,i)=>{
                                        return <Picker.Item 
                                                key={i}
                                                label={s.Designation} 
                                                value={s.IdSujet} />
                                    })}
                                </Picker>
                            </View>
                            {!fields.sujet_complaint && submit?<Text style={{color:'white',fontSize:11,textAlign:'right'}}>{strings.PLEASE_FILL}</Text>:null}
                            {/* <TextInput 
                            style={styles.input} 
                            value={fields.sujet_complaint}
                            defaultValue={fields.sujet_complaint}
                            onChangeText={(v)=>getValue("sujet_complaint",v)}
                            /> */}
                            <Text style={styles.txt}>{strings.DES}</Text>
                            <TextInput 
                            style={{...styles.input,paddingTop:5}} 
                            textAlignVertical={"top"}
                            value={fields.description}
                            defaultValue={fields.description}
                            multiline={true}
                            numberOfLines={8}
                            onChangeText={(v)=>getValue("description",v)}
                            />
                            {!fields.description && submit?<Text style={{color:'white',fontSize:11,textAlign:'right'}}>{strings.PLEASE_FILL}</Text>:null}
                            <TouchableOpacity onPress={()=>{
                                setSubmit(true)
                                if(fields.sujet_complaint && fields.description){
                                    setLoading(true)
                                addComplaint(userData.user_id,userData.mobile_number,fields,renderLoader,showSuccessModel)
                                }
                            }} style={styles.btn}>
                                {loading?<Loader/>:<Text style={{color:'white'}}>{strings.SUBMIT}</Text>}
                            </TouchableOpacity>
                        </View>
                    </View>
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
        fontSize:18,
        textAlign:'center'
    },
    cards:{
        flex:1,
        backgroundColor:'rgba(0,0,0,0)',
        borderRadius:7,
        padding:20,
        paddingTop:0,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:20,
        marginBottom:100
        
    },
    input:{
        color:'white',
        width:'100%',
        backgroundColor:'rgba(0, 0, 0, 0.28)',
        borderRadius:40,
        paddingLeft:20,
        marginTop:5,
        marginBottom:5
    },
    txt:{
        marginTop:5,
        marginLeft:5,
        marginBottom:2,
        color:'white'
    },
    btn:{
        width:'100%',
        backgroundColor:'#c5111f',
        height:40,
        justifyContent:"center",
        alignItems:'center',
        marginLeft:'auto',
        marginRight:'auto',
        borderRadius:40,
        marginTop:20
    }
})

function mapStateToProps({userData,subject}){
    return{userData,subject}
}

export default connect(mapStateToProps,actions)(AddComplaint);
