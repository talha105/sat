import React, { useEffect } from 'react'
import { StyleSheet, Text, View ,Dimensions,TouchableOpacity} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import ForIcon from "react-native-vector-icons/AntDesign"
import {connect} from "react-redux"
import * as actions from "../../store/actions"

const {width,height}=Dimensions.get('window')

function Notifications({userData,getNotifications,notification}) {

    useEffect(()=>{
        getNotifications(userData.user_id,userData.mobile_number)
    },[])

    const renderTicketHistory=({item})=>{
        return(
            <View style={styles.ticketHistory}>
                <View style={styles.left}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:5}}>
                        <View>
                        <Text style={{fontSize:12,fontWeight:'700'}}>{item.title}</Text>
                        </View>
                        <View>
                        <Text style={{fontSize:10}}>{item.date_notif.slice(0,10)}</Text>
                        </View>
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:5}}>
                        <View>
                        <Text style={{fontSize:12,marginTop:8}}>{item.msg}</Text>
                        </View>
                        <View>
                        <Text style={{fontSize:10}}>{item.heure}</Text>
                        </View>
                    </View>
                </View>
                {/* <View style={styles.right}>
                    <TouchableOpacity>
                        <ForIcon
                        name="doubleright"
                        color="gray"
                        size={20}
                        />
                    </TouchableOpacity>
                </View> */}
            </View>
        )
    }
    return (
        <View style={styles.cards}>
            <FlatList
            showsVerticalScrollIndicator={false}
            style={{width:'100%',marginTop:10,flex:1,paddingBottom:20}}
            data={notification}
            renderItem={renderTicketHistory}
            keyExtractor={(item,i)=>i.toString()}
            />
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
        flexDirection:'row',
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
    left:{
        width:'100%',
        justifyContent:'center',
    },
    right:{
        width:'25%',
        justifyContent:'center',
        alignItems:'center'
    }
})

function mapStateToProps({userData,notification}){
    return {userData,notification}
}

export default connect(mapStateToProps,actions)(Notifications);