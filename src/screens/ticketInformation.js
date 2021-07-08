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
import strings from "../localization/string"

const {width,height}=Dimensions.get('window');

function TicketInformation(props) {
    return (
        <View>
             <ImageBackground style={styles.backgroundImage} source={require('../../assets/regBackground.png')}>
             <View style={styles.topBar}>
                        <TouchableOpacity style={{width:'20%'}}>
                        <Icon style={{margin:10}} name="arrow-back-circle-outline" size={30} color="white" />
                        </TouchableOpacity>
                        <View style={{width:'60%',alignItems:'center'}}>
                            <Text style={styles.title}>{strings.TICKET_INFORMATION}</Text>
                        </View>
                        <TouchableOpacity style={{width:'20%',alignItems:'flex-end',paddingRight:10}}>
                        <ProIcon style={{margin:10}} name="profile" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cards}>
                        <View>
                            <Text style={{marginTop:5,marginBottom:5}}><Text style={{color:'#a51c27',fontWeight:'700'}}>Transaction ID: </Text> xxxxxxxxxxxxxxxxxxx</Text>
                            <Text style={{marginTop:5,marginBottom:5}}><Text style={{color:'#a51c27',fontWeight:'700'}}>Client Name: </Text> Lorem Ipsum</Text>
                            <Text style={{marginTop:5,marginBottom:5}}><Text style={{color:'#a51c27',fontWeight:'700'}}>Departure City: </Text> xxxxxxx</Text>
                            <Text style={{marginTop:5,marginBottom:5}}><Text style={{color:'#a51c27',fontWeight:'700'}}>Agency: </Text> xxxxxx</Text>
                            <Text style={{marginTop:5,marginBottom:5}}><Text style={{color:'#a51c27',fontWeight:'700'}}>Arrival City: </Text> xxxxxx</Text>
                            <Text style={{marginTop:5,marginBottom:5}}><Text style={{color:'#a51c27',fontWeight:'700'}}>No of Passenger: </Text> 5 Person</Text>
                            <Text style={{marginTop:5,marginBottom:5}}><Text style={{color:'#a51c27',fontWeight:'700'}}>Point Earn: </Text> xxxxxxx</Text>
                            <Text style={{fontWeight:'700',fontSize:18,marginTop:20}}>List of Ticket</Text>
                            <Text style={{marginTop:5,marginBottom:5}}><Text style={{color:'#a51c27',fontWeight:'700'}}>1- </Text> xxxxx</Text>
                            <Text style={{marginTop:5,marginBottom:5}}><Text style={{color:'#a51c27',fontWeight:'700'}}>2- </Text> xxxxxxx</Text>
                            <Text style={{marginTop:5,marginBottom:5}}><Text style={{color:'#a51c27',fontWeight:'700'}}>3- </Text> xxxxxx</Text>
                            <Text style={{marginTop:5,marginBottom:5}}><Text style={{color:'#a51c27',fontWeight:'700'}}>4- </Text> xxxxxx</Text>
                            <Text style={{marginTop:5,marginBottom:5}}><Text style={{color:'#a51c27',fontWeight:'700'}}>5- </Text> xxxxxx</Text>
                            <Text style={{marginTop:5,marginBottom:5}}><Text style={{color:'#a51c27',fontWeight:'700'}}>6- </Text> xxxxxxx</Text>
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
        backgroundColor:'#e3e3e3',
        borderRadius:7,
        padding:20,
        width:'90%',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row',
        paddingBottom:30,
        paddingRight:0,
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:20
        
    },
})

export default connect(null,actions)(TicketInformation);
