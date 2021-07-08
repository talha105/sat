import React, { Component, useEffect } from 'react'
import { Text, View,Modal ,StyleSheet,Dimensions, TouchableOpacity, ScrollView, FlatList} from 'react-native'
import IconSuccess from "react-native-vector-icons/Entypo"
import * as actions from "../store/actions"
import { connect } from 'react-redux';
import PrintDesign from "react-native-vector-icons/AntDesign"
import strings from '../localization/string';
import RNPrint from 'react-native-print';

const {width,height}=Dimensions.get('window')
function BookTicketDetail({visible,closeModle,data,getTickets,userData,tickets,getTicketPdf,ticketPdf}){


    useEffect(()=>{
        getTickets(userData.user_id,userData.mobile_number,data.transaction_id)
        getTicketPdf(userData.user_id,userData.mobile_number,data.transaction_id)
    },[])

    async function print(){
        await RNPrint.print({ filePath: ticketPdf.pdfUrl })
    }
    function renderTickets(){
        return tickets.map((t,i)=>{
            return (
                <View key={i} style={styles.list}>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{marginTop:5,color:'#a51b28'}}>TICKET </Text>
                    <Text style={{marginTop:5,color:'gray',marginLeft:20}}>{t.Ticket}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:14,marginTop:5,color:'#a51b28',}}>PLACE </Text>
                    <Text style={{fontSize:14,marginTop:5,color:'gray',marginLeft:20}}>{t.Place}</Text>
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
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:60,backgroundColor:'#a51b28',paddingHorizontal:13}}>
                            <View>
                            <TouchableOpacity 
                                onPress={()=>closeModle()}
                            >
                                <IconSuccess name="cross" color="lightgray" size={35}/>
                            </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={{fontWeight:'700',fontSize:20,color:'white'}}>{strings.TICKET_INFORMATION}</Text>
                            </View>
                            <TouchableOpacity
                            onPress={print}
                            >
                                <PrintDesign
                                name="printer"
                                size={30}
                                color="lightgray"
                                />
                            </TouchableOpacity>
                        </View>
                    <View style={styles.iconCon}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{flex:1,width:'100%',marginTop:10}}>
                            <Text style={{fontSize:14,marginTop:5,color:'#a51b28',fontWeight:'700'}}>{strings.TRANSACTION_ID} </Text>
                            <Text style={{fontSize:14,marginTop:5,color:'gray'}}>{data.transaction_id}</Text>
                            <Text style={{fontSize:14,marginTop:5,color:'#a51b28',fontWeight:'700'}}>{strings.TRANSACTION_DATE} </Text>
                            <Text style={{fontSize:14,marginTop:5,color:'gray'}}>{data.transaction_date?data.transaction_date.slice(0,10):null}</Text>
                            <Text style={{fontSize:14,marginTop:5,color:'#a51b28',fontWeight:'700'}}>{strings.TRANSACTION_TIME}</Text>
                            <Text style={{fontSize:14,marginTop:5,color:'gray'}}>{data.transaction_time}</Text>
                            <Text style={{fontSize:14,marginTop:5,color:'#a51b28',fontWeight:'700'}}>{strings.PAYMENT_TYPE} </Text>
                            <Text style={{fontSize:14,marginTop:5,color:'gray'}}>{data.type_paiement==="P"?"PAY BY POINT":"PAY BY POINT"}</Text>
                            <Text style={{fontSize:14,marginTop:5,color:'#a51b28',fontWeight:'700'}}>{strings.AMOUNT}</Text>
                            <Text style={{fontSize:14,marginTop:5,color:'gray'}}>{data.amount?data.amount:"NULL"} </Text>
                            <Text style={{fontSize:14,marginTop:5,color:'#a51b28',fontWeight:'700'}}>{strings.NO_OF_PASSENGER} </Text>
                            <Text style={{fontSize:14,marginTop:5,color:'gray'}}>{data.no_of_passengers}</Text>
                            <Text style={{fontSize:14,marginTop:5,color:'#a51b28',fontWeight:'700'}}>{strings.DEPARTURE_CITY_SMALL}</Text>
                            <Text style={{fontSize:14,marginTop:5,color:'gray'}}>{data.departure_city}</Text>
                            <Text style={{fontSize:14,marginTop:5,color:'#a51b28',fontWeight:'700'}}>{strings.ARRIVAL_CITY_SMAll}</Text>
                            <Text style={{fontSize:14,marginTop:5,color:'gray'}}>{data.arrival_city}</Text>
                            <Text style={{fontSize:14,marginTop:5,color:'#a51b28',fontWeight:'700'}}>{strings.DEPARTURE_TIME}</Text>
                            <Text style={{fontSize:14,marginTop:5,color:'gray'}}>{data.departure_time}</Text>
                            <Text style={{fontSize:14,marginTop:5,color:'#a51b28',fontWeight:'700'}}>{strings.POINTS}</Text>
                            <Text style={{fontSize:14,marginTop:5,color:'gray'}}>{data.points}</Text>
                        </View>
                        <View style={{paddingBottom:20}}>
                            <Text
                            style={{fontSize:14,marginTop:5,color:'#a51b28',fontWeight:'700',width:'100%',textAlign:'center'}}
                            >{strings.LIST_OF_TICKETS}</Text>
                            {renderTickets()}
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
        backgroundColor:'white',
        width:width/1.1,
        height:height/1.1,
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
        justifyContent:'center',
    },
    list:{
        backgroundColor:'#ebebeb',
        height:60,
        borderRadius:7,
        marginLeft:5,
        marginRight:5,
        padding:10,
        margin:5
    }
})

function mapStateToProps({userData,tickets,ticketPdf}){
    return{userData,tickets,ticketPdf}
}


export default connect(mapStateToProps,actions)(BookTicketDetail);