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
    FlatList,
    RefreshControl
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import * as actions from "../store/actions";
import ProIcon from "react-native-vector-icons/AntDesign";
import ComplainDetail from "../component/ComplainDetail";
import strings from "../localization/string"
import Skeleton from "../component/skeleton";

const {width,height}=Dimensions.get('window');

function Complaint({navigation,getComplainHistory,userData,complaintsHis}) {

    const [model,setModel]=useState(false)
    const [data,setData]=useState({})
    const [refresh, setRefresh]=useState(false)
    useEffect(()=>{

        getComplainHistory(userData.user_id,userData.mobile_number)

    },[])

    function renderModel(con){
        if(con==="show"){
            setModel(true)
        }
        if(con==="hide"){
            setModel(false)
        }
    }
    function onRefresh(){
        getComplainHistory(userData.user_id,userData.mobile_number)
    }
    const renderTicketHistory=({item})=>{
        return(
            <View style={styles.ticketHistory}>
                               <Text style={{marginTop:2,marginBottom:2,fontSize:12}}><Text style={{fontWeight:'700'}}>{strings.TICKET_ID} </Text>{item.id_Ticket} </Text>
                <Text style={{marginTop:2,marginBottom:2,fontSize:12}}><Text style={{fontWeight:'700'}}>{strings.DATE} </Text>{item.DATE_COMPLAINT.slice(0,10)} </Text>
                <Text style={{marginTop:2,marginBottom:2,fontSize:12}}><Text style={{fontWeight:'700'}}>{strings.SUBJECT_COMPLAIN} </Text> {item.SujetComplaint}</Text>
                <Text style={{marginTop:2,marginBottom:2 ,fontSize:12}}><Text style={{fontWeight:'700'}}>{strings.STATUS} </Text> {item.STATUT}</Text>
                <Text style={{marginTop:2,marginBottom:2 ,fontSize:12}}><Text style={{fontWeight:'700'}}>Status Date </Text> {item.DATE_STATUT.slice(0,10)}</Text>
                <TouchableOpacity 
                onPress={()=>{
                    setData(item)
                    renderModel('show')
                }}
                style={styles.detBtn}>
                    <Text style={{color:'white',fontSize:12,textAlign:'center'}}>{strings.VIEW_DETAILS}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    function renderContent(){
        if(complaintsHis.length>0){
            return(
                <FlatList
                onRefresh={refresh}
                refreshControl={<RefreshControl
                refreshing={refresh}
                onRefresh={onRefresh}
                />}
                showsVerticalScrollIndicator={false}
                style={{width:'100%',marginTop:10}}
                data={complaintsHis}
                renderItem={renderTicketHistory}
                keyExtractor={(item,i)=>i.toString()}
                />
            )
        }
        else if(complaintsHis.length===0){
            return (
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:20}}>{strings.NO_RESULT_FOUND}</Text>
                </View>
            )
        }
        else{
            return (
                <Skeleton/>
            )
        }
    }
    return (
        <View style={{width:'100%',flex:1}}>
             <ImageBackground style={styles.backgroundImage} source={require('../../assets/regBackground.png')}>
             <ComplainDetail
                    visible={model}
                    data={data}
                    closeModle={()=>renderModel('hide')}
                    />
             <View style={styles.topBar}>
                        <View style={{width:'25%'}}/>
                        <View style={{width:'50%',alignItems:'center'}}>
                            <Text style={styles.title}>{strings.COMPLAINT}</Text>
                        </View>
                        <View style={{width:'25%',alignItems:'flex-end',paddingRight:10}}/>
                        {/* <TouchableOpacity onPress={()=>navigation.navigate('profile')} style={{width:'25%',alignItems:'flex-end',paddingRight:10}}>
                        <ProIcon style={{margin:10}} name="profile" size={30} color="white" />
                        </TouchableOpacity> */}
                    </View>
                    <View style={styles.cards}>
                    <View style={{width:'100%'}}>
                        {/* <Text style={{marginTop:3,marginBottom:3}}><Text style={{color:'#a51c27',fontWeight:'700'}}>Filter: </Text> </Text>
                        <Text style={{marginTop:3,marginBottom:3}}><Text style={{fontWeight:'700'}}>Departure City: </Text>Lorem Ipsum</Text>
                        <Text style={{marginTop:3,marginBottom:3}}><Text style={{fontWeight:'700'}}>Date From: </Text>24-4-2021</Text>
                        <Text style={{marginTop:3,marginBottom:3}}><Text style={{fontWeight:'700'}}>Status: </Text>Lorem Ipsum</Text> */}
                        <TouchableOpacity style={{...styles.detBtn,width:'100%',height:30}} onPress={()=>navigation.push('addComplaint')}>
                            <Text style={{color:'white',textAlign:'center',fontWeight:'700'}}>{strings.ADD}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width:'100%',flex:1}}>
                        {renderContent()}
                    </View>
                    </View>
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
        marginTop:height/25,
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
        marginBottom:20
        
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
        marginTop:5,
        justifyContent:'center',
        alignItems:'center'
    }
})

function mapStateToProps({userData,complaintsHis}){
    return{userData,complaintsHis}
}

export default connect(mapStateToProps,actions)(Complaint);
