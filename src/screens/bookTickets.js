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
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import * as actions from "../store/actions";
import ProIcon from "react-native-vector-icons/AntDesign";
import Loader from '../component/loader';
import BookTicketsDetails from "../component/bookTicketsDetails";
import strings from '../localization/string';
import Skeleton from "../component/skeleton";
const {width,height}=Dimensions.get('window');

function BookTickets({navigation,bookTickets,getBookTickets,userData}) {

    useEffect(()=>{
        getBookTickets(userData.user_id,userData.mobile_number)
    },[])
    const [data,setData]=useState({})
    const [model,setModel]=useState(false)

    function renderBookTicket({item}){
        return(
            <View style={styles.ticketHistory}>
                <Text style={{marginTop:2,marginBottom:2,fontSize:12}}><Text style={{fontWeight:'700'}}>{strings.TRANSACTION_ID} </Text>{item.transaction_id} </Text>
                <Text style={{marginTop:2,marginBottom:2,fontSize:12}}><Text style={{fontWeight:'700'}}>{strings.PAYMENT_TYPE} </Text>{item.type_paiement==="P"?"Pay By Point":"Pay By Card"} </Text>
                <Text style={{marginTop:2,marginBottom:2,fontSize:12}}><Text style={{fontWeight:'700'}}>{strings.AMOUNT} </Text> {item.amount}</Text>
                <Text style={{marginTop:2,marginBottom:2 ,fontSize:12,textAlign:'justify'}}><Text style={{fontWeight:'700'}}>{strings.TRANSACTION_DATE} </Text>{item.transaction_date.slice(0,10)}</Text>
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

    function renderBookTicketsList(){
        if(bookTickets.length>0){
            return(
                        <FlatList
                        showsVerticalScrollIndicator={false}
                        data={bookTickets}
                        renderItem={renderBookTicket}
                        keyExtractor={(item,i)=>i.toString()}
                        />
            )
        }
        else if(bookTickets.length==0){
            return (
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:22,fontWeight:"700",textAlign:'center'}}>{strings.NOT_FOUND}</Text>
                </View>
            )
        }
        else{
            <Skeleton/>
        }
    }

    function renderModel(con){
        if(con=="show"){
            setModel(true)
        }  
        if(con=="hide"){
            setModel(false)
        } 
    }

    return (
        <View style={{flex:1}}>
             <ImageBackground style={styles.backgroundImage} source={require('../../assets/regBackground.png')}>
             {model?(
                 <BookTicketsDetails
                 visible={model}
                 data={data}
                 closeModle={()=>renderModel('hide')}
                  />
             ):null}
             <View style={styles.topBar}>
                        <View style={{width:'25%'}}/>
                        <View style={{width:'50%',alignItems:'center'}}>
                            <Text style={styles.title}>{strings.BOOK_TICKETS}</Text>
                        </View>
                        <View style={{width:'25%',alignItems:'flex-end',paddingRight:10}}/>
                        {/* <TouchableOpacity onPress={()=>navigation.navigate('profile')} style={{width:'25%',alignItems:'flex-end',paddingRight:10}}>
                        <ProIcon style={{margin:10}} name="profile" size={30} color="white" />
                        </TouchableOpacity> */}
                    </View>
                    <View style={styles.cards}>
                        {renderBookTicketsList()}
                    </View>
             </ImageBackground>

        </View>
    )
}

const styles = StyleSheet.create({
    backgroundImage:{
        width:'100%',
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
        fontSize:18,
        textAlign:'center'
    },
    cards:{
        flex:1,
        backgroundColor:'white',
        borderRadius:7,
        padding:20,
        width:'90%',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:20,
        marginBottom:10
        
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

function mapStateToProps({userData,bookTickets}){
    return {userData,bookTickets}
}
export default connect(mapStateToProps,actions)(BookTickets);

