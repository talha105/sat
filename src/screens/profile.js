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
import ProIcon from "react-native-vector-icons/AntDesign";
import EditIcon from "react-native-vector-icons/Entypo";
import { useEffect } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import ImagePickerModel from "../component/imagePicker";
import SuccessModel from "../component/succesModal";
import Loader from "../component/loader"
import AsyncStorage from '@react-native-async-storage/async-storage';
import strings from "../localization/string"
import PointsIcon from "react-native-vector-icons/MaterialCommunityIcons"
import DropDownPicker from 'react-native-dropdown-picker';
import { color } from 'react-native-reanimated';

const {width,height}=Dimensions.get('window');



function Profile({userData,getProfilePic,profileUrl,updateProfile,updateProfileData,getOtp,getRegCat,getCat,cities, getCities}) {
    const [imgUrl,setImgUrl]=useState("")
    const [dropDownLoading,setDropDownLoading]=useState(false)
    const [dropDownLoading2,setDropDownLoading2]=useState(false)
    const [fields,setFields]=useState({
        user_id: "",
        last_name: "",
        first_name: "",
        email: "",
        categories: "",
        gender: "",
        date_of_birth: "",
        mobile_number: "",
        language: "",
        POINTS: 0,
        Nationality:"",
        City:"",
    })

    useEffect(()=>{
       setFields(userData);
       if(userData.user_id){
        getProfilePic(userData.user_id,userData.mobile_number)
        getCities().then(()=>{
            setDropDownLoading2(true)
        })
        getRegCat().then(()=>{
            setDropDownLoading(true)
        })
       }
       
    },[])

    const getValue=(key,value)=>{
        setFields((pS)=>{
            return{
                ...pS,
                [key]:value
            }
        })
    }
    const [showImgPicker,setShowImgPicker]=useState(false);
    const [successModel,setSuccessModel]=useState(false);
    const [loading,setLoading]=useState(false)

    function showModal(con){
        setShowImgPicker(con)
    }

    function openCamera(){
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
            updateProfile(image,userData.user_id,userData.mobile_number);
          });
          showModal(false)

    }
    function openGallery(){
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true
          }).then(image => {
            updateProfile(image,userData.user_id,userData.mobile_number);
          });
          showModal(false)
    }
    function showSuccessModel(con){
        con?setSuccessModel(true):setSuccessModel(false)
    }
    function renderLoader(con){
        con?setLoading(true):setLoading(false)
    }
    return (
        <View style={{flex:1}}>
        <ImageBackground style={styles.backgroundImage} source={require('../../assets/regBackground.png')}>
        <ScrollView style={{flex:1}}>

                 <ImagePickerModel
                 visible={showImgPicker}
                 closeModle={()=>showModal(false)}
                 goToCamera={openCamera}
                 goToGallery={openGallery}

                 />
                 <SuccessModel
                 title="UPDATED"
                 visible={successModel}
                 closeModle={()=>showSuccessModel(false)}
                 />
             <View style={styles.topBar}>
                        <View style={{width:'25%'}}/>
                        <View style={{width:'50%',alignItems:'center'}}>
                            <Text style={styles.title}>{strings.PROFILE}</Text>
                        </View>
                        <View style={{width:'25%'}}/>
                    </View>
                    <View style={styles.cards}>
                    <View style={{width:'100%',flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                    <PointsIcon
                    size={20}
                        color="#d1a700"
                        name="star-four-points"
                        />
                    <Text style={{color:'#d1a700',fontWeight:'700',fontSize:18}}>{fields.POINTS?fields.POINTS.toString():"0"}</Text>
                    </View>
                        <View style={{flexDirection:'row'}}>
                        <Image 
                        style={{width:80,height:80,borderRadius:80/2,borderWidth:4,borderColor:'white'}}
                        source={profileUrl.imgUrl?{uri:profileUrl.imgUrl}:require("../../assets/uploadphoto.jpg")}
                        />
                        <TouchableOpacity 
                        onPress={()=>showModal(true)}
                        style={{backgroundColor:'#AA3333',width:30,height:30,justifyContent:'center',alignItems:'center',borderRadius:30/2,position:'absolute',left:65,bottom:-2}}>
                            <EditIcon
                            color="white"
                            name="edit"
                            size={20}
                            />
                        </TouchableOpacity>
                        </View>
                        <View style={{width:'100%'}}>
                            <Text style={styles.txt}>{strings.FIRST_NAME}</Text>
                            <TextInput 
                            style={styles.input} 
                            value={fields.first_name}
                            defaultValue={fields.first_name}
                            onChangeText={(v)=>getValue("first_name",v)}
                            />
                            <Text style={styles.txt}>{strings.LAST_NAME}</Text>
                            <TextInput 
                            style={styles.input} 
                            value={fields.last_name}
                            value={fields.last_name}
                            onChangeText={(v)=>getValue("last_name",v)}
                            />
                            <Text style={styles.txt}>{strings.CATEGORY}</Text>
                            {dropDownLoading?(
                                <View>
                                <DropDownPicker
                                    items={getCat.map((c)=>{
                                        return{ label: c.CATEGORIE, value:c.CODE_CAT, selected:c.CATEGORIE==fields.categories?true:false }
                                    })}
                                    defaultValue={fields.categories}
                                    containerStyle={{height: 50,borderRadius:30}}
                                    style={{backgroundColor: 'rgba(0, 0, 0, 0.28)',borderColor:'rgba(0, 0, 0, 0)',borderBottomLeftRadius:30,borderBottomRightRadius:30,borderTopRightRadius:30,borderTopLeftRadius:30}}
                                    labelStyle={{color:'#ffffff'}}
                                    dropDownStyle={{borderColor:'#5c1016',backgroundColor:'#5c1016',borderBottomLeftRadius:20,borderBottomRightRadius:20}}
                                    arrowColor="#ffffff"
                                    itemStyle={{
                                        justifyContent: 'flex-start'
                                    }}
                                    onChangeItem={item =>getValue('categories',item.value)}
                                />
                                </View>
                            ):<Text style={{color:'white'}}>Loading...</Text>}
                            {/* <TextInput 
                            style={styles.input} 
                            value={fields.categories}
                            defaultValue={fields.categories}
                            onChangeText={(v)=>getValue("categories",v)}
                            /> */}
                            <Text style={styles.txt}>{strings.EMAIL}</Text>
                            <TextInput 
                            style={styles.input}
                            defaultValue={fields.email}
                            value={fields.email}
                            onChangeText={(v)=>getValue("email",v)}
                            />
                            <Text style={styles.txt}>{strings.NATIONALITY}</Text>
                            <TextInput 
                            style={styles.input}
                            defaultValue={fields.Nationality}
                            value={fields.Nationality}
                            onChangeText={(v)=>getValue("Nationality",v)}
                            />
                            {/* <Text style={styles.txt}>City</Text>
                            <TextInput 
                            style={styles.input}
                            defaultValue={fields.City}
                            value={fields.City}
                            onChangeText={(v)=>getValue("City",v)}
                            /> */}
                            <Text style={styles.txt}>{strings.CITY}</Text>
                            {dropDownLoading2?(
                                <View>
                                <DropDownPicker
                                    items={cities.map((c)=>{
                                        console.log(c.City)
                                        return{ label: c.City, value:c.City, selected:c.City==fields.City?true:false }
                                    })}
                                    defaultValue={fields.City}
                                    containerStyle={{height: 50,borderRadius:30}}
                                    style={{backgroundColor: 'rgba(0, 0, 0, 0.28)',borderColor:'rgba(0, 0, 0, 0)',borderBottomLeftRadius:30,borderBottomRightRadius:30,borderTopRightRadius:30,borderTopLeftRadius:30}}
                                    labelStyle={{color:'#ffffff'}}
                                    dropDownStyle={{borderColor:'#5c1016',backgroundColor:'#5c1016',borderBottomLeftRadius:20,borderBottomRightRadius:20}}
                                    arrowColor="#ffffff"
                                    itemStyle={{
                                        justifyContent: 'flex-start'
                                    }}
                                    onChangeItem={item =>getValue('City',item.value)}
                                />
                                </View>
                            ):<Text style={{color:'white'}}>Loading...</Text>}
                            <Text style={styles.txt}>Job</Text>
                            <TextInput 
                            style={styles.input}
                            defaultValue={fields.job}
                            value={fields.job}
                            onChangeText={(v)=>getValue("job",v)}
                            />
                            <TouchableOpacity onPress={()=>{
                                setLoading(true)
                                updateProfileData(fields,showSuccessModel,setLoading)
                            }} style={styles.btn}>
                                {loading?<Loader/>:<Text style={{color:'white'}}>{strings.UPDATE}</Text>}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={async()=>{
                               getOtp(null)
                            //    AsyncStorage.removeItem('notificationToken')
                            }} style={{...styles.btn,backgroundColor:'gray'}}>
                                <Text style={{color:'white'}}>{strings.LOG_OUT}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
             

        </ScrollView>
        </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundImage:{
        width:width,
        flex:1
    },
    topBar:{
        flex:1,
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

function mapStateToProps({userData,profileUrl,getCat,cities}){
    return{userData,profileUrl,getCat,cities}
}

export default connect(mapStateToProps,actions)(Profile);
