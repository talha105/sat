import React, { Component, useEffect } from 'react'
import { Text, View,Modal ,StyleSheet,Dimensions, TouchableOpacity, ScrollView, FlatList} from 'react-native'
import IconSuccess from "react-native-vector-icons/Entypo"
import * as actions from "../store/actions"
import { connect } from 'react-redux';
import strings from "../localization/string"

const {width,height}=Dimensions.get('window')
function ComplainDetail({visible,closeModle,data,getComplainDetails,userData,complaintDetail}){
    useEffect(()=>{
        getComplainDetails(userData.user_id,userData.mobile_number,data.id_Ticket)
    },[])
    console.log(data)
    function Comments(){
        return complaintDetail.map((item,i)=>{
            return(
                <View key={i} style={{backgroundColor:'#F2F2F2',borderRadius:7,marginTop:10,marginBottom:10,padding:10}}>
                    <View>
                        <Text style={{fontSize:12,fontWeight:'700'}}>{strings.STATUS} {item.STATUT}</Text>
                        <Text style={{fontSize:12,marginTop:5}}>{item.COMMENT}</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
                        <Text style={{fontSize:12}}>{item.HEURE}</Text>
                        <Text style={{fontSize:12}}>{item.DATE?item.DATE.slice(0,10):''}</Text>
                    </View>
                </View>
            )
        })
    }
    return (
        <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        style={{flex:1,justifyContent:'center',elevation:5}}
        >
            <View style={{flex:1,justifyContent:'center',alignItems:'center',height:height,backgroundColor:'rgba(0,0,0,0.7)'}}>
                <View style={styles.con}>
                    <View style={styles.iconCon}>
                        <View style={{height:40,flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:10}}>
                            <Text style={{fontSize:20,width:'85%',textAlign:'center',paddingLeft:10,color:'white',fontWeight:'700'}}>{data.id_Ticket}</Text>
                            <TouchableOpacity 
                            onPress={()=>closeModle()}
                            style={{width:'15%',alignItems:'flex-end'}}
                            >
                                <IconSuccess name="cross" color="lightgray" size={35}/>
                            </TouchableOpacity>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{flex:1,width:'100%',marginTop:10}}>
                            <Text style={{fontSize:13,marginTop:20,color:'#e4e4e4'}}>{strings.COMPLAINT_SUB} <Text>{data.SujetComplaint}</Text></Text>
                            <Text style={{fontSize:13,marginTop:3,color:'#e4e4e4'}}>{strings.COMPLAINT_DATE} <Text>{data.DATE_COMPLAINT?data.DATE_COMPLAINT.slice(0,10):''}</Text></Text>
                            {/* <Text style={{fontSize:13,marginTop:3,color:'#e4e4e4'}}>{strings.TICKET_ID} <Text>{data.id_Ticket}</Text></Text> */}
                            <Text style={{fontSize:13,marginTop:3,color:'#e4e4e4'}}>{strings.STATUS} <Text>{data.STATUT}</Text></Text>
                            <Text style={{fontSize:13,marginTop:3,color:'#e4e4e4'}}>{strings.STATUS_DATE} <Text>{data.DATE_STATUT?data.DATE_STATUT.slice(0,10):''}</Text></Text>
                            <Text style={{fontSize:13,marginTop:20,color:'#e4e4e4'}}>{strings.DES}</Text>
                            <Text style={{fontSize:12,marginTop:5,flex:1,backgroundColor:'#F2F2F2',padding:10,height:height/3.5,borderRadius:7}}>{data.description}</Text>
                            {Comments()}
                        </View>
                        </ScrollView>
                    </View>

                </View>
            </View>
        </Modal>
    )
}
const styles=StyleSheet.create({
    con:{
        backgroundColor:'#a51b28',
        width:width/1.1,
        height:height/1.25,
        borderRadius:7,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    iconCon:{
        width:'90%',
        marginLeft:'auto',
        marginRight:'auto',
        flex:1,
        justifyContent:'center'
    },
})

function mapStateToProps({userData,complaintDetail}){
return {userData,complaintDetail}
}

export default connect(mapStateToProps,actions)(ComplainDetail);