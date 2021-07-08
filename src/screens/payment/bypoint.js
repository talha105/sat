import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, View,Dimensions,Image,TouchableOpacity, TextInput } from 'react-native';
import strings from "../../localization/string"
import { connect } from 'react-redux';
const {width,height}=Dimensions.get('window')
import * as actions from "../../store/actions"
import useForceUpdate from 'use-force-update'
import ErrorModel from "../../component/errorModel"

function ByPoint({ticket,pay,points,getPoints,userData,applyPromoCode}) {


    const forceUpdate = useForceUpdate();
    const [code,setCode]=useState('')
    const [modal,setModal]=useState(false)
    const [modal2,setModal2]=useState(false)

    function renderErrorModel(con){
        if(con=="show"){
            setModal(true)
        }
        if(con=="hide"){
            setModal(false)
        }
        
    }
    function renderErrorModel2(con){
        if(con=="show"){
            setModal2(true)
        }
        if(con=="hide"){
            setModal2(false)
        }
        
    }
    return (
        <View style={styles.con}>
            <ErrorModel
            title={strings.ALREADY_APPLY_PR}
            visible={modal}
            closeModle={()=>renderErrorModel('hide')}
            />
            <ErrorModel
            title={strings.ENTERED_PRO}
            visible={modal2}
            closeModle={()=>renderErrorModel2('hide')}
            />
            <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
            <Text style={styles.heading}> {strings.DETAILS_OF_TICKETS} </Text>
            <View style={styles.cards}>
                <View style={styles.left}>
                <Text style={{marginTop:5,marginBottom:5,fontSize:12}}><Text style={{color:'#a51c27',fontWeight:'700',textTransform:'capitalize'}}>{strings.ID}</Text> { ticket.ticketBookInfo.transaction_id}</Text>
                    <Text style={{marginTop:5,marginBottom:5,fontSize:12}}><Text style={{color:'#a51c27',fontWeight:'700',textTransform:'capitalize'}}>{strings.DEPARTURE} </Text> {ticket.ticketInfo.Depature_bus}</Text>
                    <Text style={{marginTop:5,marginBottom:5,fontSize:12}}><Text style={{color:'#a51c27',fontWeight:'700',textTransform:'capitalize'}}>{strings.ARRIVAL_BUS} </Text> {ticket.ticketInfo.Arrival_bus}</Text>
                    <Text style={{marginTop:5,marginBottom:5,fontSize:12}}><Text style={{color:'#a51c27',fontWeight:'700',textTransform:'capitalize'}}>{strings.DEPARTURE_TIME} </Text> {ticket.ticketInfo.Departure_time}</Text>
                    <Text style={{marginTop:5,marginBottom:5,fontSize:12}}><Text style={{color:'#a51c27',fontWeight:'700',textTransform:'capitalize'}}>{strings.ARRIVAL_TIME} </Text> {ticket.ticketInfo.Arrival_time}</Text>
                    <Text style={{marginTop:5,marginBottom:5,fontSize:12}}><Text style={{color:'#a51c27',fontWeight:'700',textTransform:'capitalize'}}>{strings.DATE_CAPITAL} </Text> {ticket.ticketInfo.Date_depart}</Text>
                    <Text style={{marginTop:5,marginBottom:5,fontSize:18}}><Text style={{color:'#a51c27',fontWeight:'700',textTransform:'capitalize',fontSize:12}}>{strings.AMOUNT_CAPITAL} </Text><Text style={{textDecorationLine:'line-through'}}>{ticket.ticketInfo.oldAmount}</Text> <Text style={{fontWeight:'700'}}>{ " "+ticket.ticketInfo.Amount+" " }</Text></Text>
                </View>
                <View style={styles.right}>
                    <Image
                    resizeMode="contain"
                    style={{width:'80%'}}
                    source={require('../../../assets/grayBus.png')}
                    />
                </View>
            </View>
            {/* <TouchableOpacity 
            
            style={{backgroundColor:'#c5111f',padding:10,paddingLeft:35,paddingRight:55,borderRadius:55,position:'relative',top:-20,}}>
                    <Text style={{color:'white',fontWeight:'700',fontSize:16}}>PAY NOW!</Text>
            </TouchableOpacity> */}
            </View>
            <View>
            <View style={{alignItems:'center',marginBottom:30}}>
                <TextInput
                onChangeText={v=>setCode(v)}
                placeholder="CODE"
                style={{backgroundColor:'white',width:'100%',borderRadius:7,height:40}}
                />
            </View>
            <TouchableOpacity 
            onPress={()=>{
                if(code && !ticket.ticketInfo.oldAmount){
                    applyPromoCode(userData.user_id,userData.mobile_number,ticket.ticketBookInfo.transaction_id,code,ticket.ticketInfo).then(()=>{
                        forceUpdate();
                    })
                }
                else if(ticket.ticketInfo.oldAmount){
                    renderErrorModel('show')
                }
                else{
                    renderErrorModel2('show')
                }
            }}
            style={{backgroundColor:'#c5111f',padding:10,paddingLeft:35,paddingRight:55,borderRadius:55,position:'relative',top:-20,}}>
                    <Text style={{color:'white',fontWeight:'700',fontSize:16}}>{strings.APPLY_PROMO_CODE}</Text>
            </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    con:{
        flex:1,
        width:'100%',
        justifyContent:'space-around',
        alignItems:'center',
        paddingBottom:55
    },

    heading:{
        color:'white',
        textAlign:'center',
        fontWeight:'700',
        fontSize:20,
        paddingBottom:20
    },
    cards:{
        backgroundColor:'#e3e3e3',
        borderRadius:7,
        padding:20,
        width:'90%',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        paddingBottom:30,
        paddingRight:0
        
    },
    left:{
        width:'50%',
    },
    right:{
        width:'50%',
        justifyContent:'center',
        alignItems:'center',
    }
})

function mapStateToProps({points,userData}){
    return {points,userData}
}

export default connect(mapStateToProps,actions)(ByPoint);