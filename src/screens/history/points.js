import React, { useEffect } from 'react'
import { StyleSheet, Text, View ,Dimensions} from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import * as actions from "../../store/actions"
const {width,height}=Dimensions.get('window')
import {connect} from "react-redux"
import strings from '../../localization/string'
import PointsIcon from "react-native-vector-icons/MaterialCommunityIcons"
import Skeleton from "../../component/skeleton";

function Points({getPoints,points,userData,getUserHistory,history}) {


    useEffect(()=>{
        getPoints(userData.user_id,userData.mobile_number)
        getUserHistory(userData.user_id,userData.mobile_number,"not","CASABLANCA",new Date(),new Date())
    },[])

    const renderTicketHistory=({item})=>{
        return(
            <View style={styles.ticketHistory}>
                                <Text style={{marginTop:2,marginBottom:2 ,fontSize:12}}><Text style={{fontWeight:'700'}}>{strings.TRANSACTION_ID} </Text> {item.transaction_id}</Text>
                <Text style={{marginTop:2,marginBottom:2,fontSize:12}}><Text style={{fontWeight:'700'}}>{strings.DATE} </Text>{item.transaction_date.slice(0,10)} </Text>
                <Text style={{marginTop:2,marginBottom:2,fontSize:12}}><Text style={{fontWeight:'700'}}>{strings.NO_OF_POINTS} </Text> {item.type_paiement==="C"?<Text style={{color:'green'}}>+2</Text>:<Text style={{color:'red'}}>-2</Text>}</Text>
                {/* <TouchableOpacity style={styles.detBtn}>
                    <Text style={{color:'white',fontSize:12,textAlign:'center'}}>VIEW DETAILS</Text>
                </TouchableOpacity> */}
            </View>
        )
    }

    function renderPointList(){
        if(history.length>0){
            return(
                <FlatList
            showsVerticalScrollIndicator={false}
            style={{flex:1,width:'100%',marginTop:10,paddingBottom:20}}
            data={history}
            renderItem={renderTicketHistory}
            keyExtractor={(item,i)=>i.toString()}
            />
            )
        }
        else if(history.length==0){
            return (
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:20}}>{strings.NO_RESULT_FOUND}</Text>
                </View>
            )
        }
        else{
            <Skeleton/>
        }
    }
    return (
        <View style={styles.cards}>
            <View style={{width:'100%'}}>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <PointsIcon
                    size={30}
                        color="#d1a700"
                        name="star-four-points"
                        />
                <Text style={{marginBottom:5,textAlign:'center',fontSize:30}}><Text style={{fontWeight:'700',color:'#D1B000'}}>{points.points}</Text></Text>
                </View>
            </View>
            {renderPointList()}
        </View>
    )
}

const styles = StyleSheet.create({
    cards:{
        flex:1,
        backgroundColor:'white',
        borderRadius:7,
        padding:20,
        width:'90%',
        justifyContent:'flex-start',
        alignItems:'center',
        paddingBottom:10,
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:10,
        
    },
    ticketHistory:{
        backgroundColor:'#e3e3e3',
        width:'100%',
        borderRadius:7,
        marginTop:5,
        marginBottom:5,
        padding:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    detBtn:{
        backgroundColor:'#a41c27',
        width:'35%',
        padding:2,
        borderRadius:5,
        marginTop:5
    }
})

function mapStateToProps({userData,points,history}){
    return {userData,points,history}
}

export default connect(mapStateToProps,actions)(Points);