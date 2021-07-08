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
import * as actions from "../../store/actions";
import ProIcon from "react-native-vector-icons/AntDesign";
import Notifications from "./notifications";
import Points from "./points";
import BookingHistory from "./bookinghistory";
import strings from '../../localization/string';

const {width,height}=Dimensions.get('window');

function History({navigation}) {
   const [ui,setUi]=useState("bookingHistory");
    const renderInnerUi=()=>{
        if(ui==="bookingHistory"){
            return <BookingHistory/>
        }
        if(ui==="points"){
            return <Points/>
        }
        if(ui==="notifications"){
            return <Notifications/>
        }
    }
    return (
        <View>
             <ImageBackground style={styles.backgroundImage} source={require('../../../assets/regBackground.png')}>
             <View style={styles.topBar}>
                        <View style={{width:'25%'}}/>
                        <View style={{width:'50%',alignItems:'center'}}>
                            <Text style={styles.title}>{strings.HISTORY}</Text>
                        </View>
                        <View style={{width:'25%',alignItems:'flex-end',paddingRight:10}}/>
                        {/* <TouchableOpacity onPress={()=>navigation.navigate('profile')} style={{width:'25%',alignItems:'flex-end',paddingRight:10}}>
                        <ProIcon style={{margin:10}} name="profile" size={30} color="white" />
                        </TouchableOpacity> */}
                    </View>
                    <View style={styles.btns}>
                        <TouchableOpacity style={{...styles.btn,backgroundColor:ui==="bookingHistory"?"white":"#320609"}} onPress={()=>setUi('bookingHistory')}>
                            <Text style={{...styles.text,color:ui==="bookingHistory"?"black":"white"}}>{strings.BOOKING_HISTORY}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{...styles.btn,backgroundColor:ui==="points"?"white":"#320609"}} onPress={()=>setUi("points")}>
                            <Text style={{...styles.text,color:ui==="points"?"black":"white"}}>{strings.POINTS}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{...styles.btn,backgroundColor:ui==="notifications"?"white":"#320609"}} onPress={()=>setUi("notifications")}>
                            <Text style={{...styles.text,color:ui==="notifications"?"black":"white"}}>{strings.NOTIFICATION}</Text>
                        </TouchableOpacity>
                    </View>
                    {renderInnerUi()}
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
        marginTop:10,
        width:'90%',
        flexDirection:'row',
        justifyContent:'space-around',
        marginLeft:'auto',
        marginRight:'auto'
    },
    btn:{
        borderRadius:40,
        width:'32%',
        justifyContent:'center',
        alignItems:'center',
        height:38
    },
    text:{
        fontWeight:'700',
        fontSize:12
    },
})

export default connect(null,actions)(History);
