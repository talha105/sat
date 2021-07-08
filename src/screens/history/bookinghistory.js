import React,{useEffect,useState,useMemo} from 'react'
import { StyleSheet, Text, View  ,TouchableOpacity,FlatList} from 'react-native'
import {Picker} from '@react-native-picker/picker';
import SearchIcon from "react-native-vector-icons/FontAwesome"
import * as actions from "../../store/actions"
import {connect} from "react-redux"
import Icon from 'react-native-vector-icons/FontAwesome';
import Skeleton from "../../component/skeleton";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import strings from '../../localization/string';
import PointsIcon from "react-native-vector-icons/MaterialCommunityIcons"
import BookTicketsDetails from "../../component/bookTicketsDetails";
import dateFormat from "../../utils/dateFormat"
import ErrorModel from "../../component/errorModel"
import AsynceStorage from "@react-native-async-storage/async-storage"

function BookingHistory({getCities,cities,userData,getUserHistory,history}) {
    const [arrivalCity, setArrivalCity] = useState("");
    const [departureCity, setDepartureCity] = useState("");
    const [date,setDate]=useState("");
    const [dateF,setDateF]=useState("")
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDatePickerVisibleF, setDatePickerVisibilityF] = useState(false);
    const [submit,setSubmit]=useState(false)
    const [modal,setModal]=useState(false)

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date)
    hideDatePicker();
  };

  const showDatePickerF = () => {
    setDatePickerVisibilityF(true);
  };

  const hideDatePickerF = () => {
    setDatePickerVisibilityF(false);
  };

  const handleConfirmF = (date) => {
    setDateF(date)
    hideDatePickerF();
  };
    const renderTicketHistory=({item})=>{
        return(
            <TouchableOpacity style={styles.ticketHistory}
            onPress={()=>{
                setData(item)
                renderModel('show')
            }}
            >
                {item.type_paiement==="C"?(
                <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <PointsIcon
                    size={25}
                        color="#d1a700"
                        name="star-four-points"
                        />
                        <Text style={{fontSize:16,fontWeight:'700'}}>{item.points}</Text>
                    </View>
                </View>
                ):null}
                 <Text style={{marginTop:2,marginBottom:2,fontSize:12}}><Text style={{fontWeight:'700'}}>{strings.TRANSACTION_ID} </Text> {item.transaction_id}</Text>
                <Text style={{marginTop:2,marginBottom:2,fontSize:12}}><Text style={{fontWeight:'700'}}>{strings.DATE} </Text> {item.transaction_date.slice(0,10)}</Text>
                <Text style={{marginTop:2,marginBottom:2 ,fontSize:12}}><Text style={{fontWeight:'700'}}>{strings.DEPARTURE_CITY_SMALL} </Text> {item.departure_city}</Text>
                <Text style={{marginTop:2,marginBottom:2,fontSize:12}}><Text style={{fontWeight:'700'}}>{strings.ARRIVAL_CITY_SMAll} </Text> {item.arrival_city}</Text>
                <Text style={{marginTop:2,marginBottom:2,fontSize:12}}><Text style={{fontWeight:'700'}}>{strings.DEPARTURE_DATE_SMALL} </Text> {item.departure_date.slice(0,10)}</Text>
                <Text style={{marginTop:2,marginBottom:2,fontSize:12}}><Text style={{fontWeight:'700'}}>{strings.DEPARTURE_TIME} </Text> {item.departure_time}</Text>
                <Text style={{marginTop:2,marginBottom:2,fontSize:12}}><Text style={{fontWeight:'700'}}>{strings.NO_OF_PASSENGER} </Text> {item.no_of_passengers}</Text>
                <Text style={{marginTop:2,marginBottom:2,fontSize:12}}><Text style={{fontWeight:'700'}}>{strings.AMOUNT} </Text>{item.amount}</Text>
                <Text style={{marginTop:2,marginBottom:2,fontSize:12}}><Text style={{fontWeight:'700'}}>{strings.PAYMENT_TYPE} </Text> {item.type_paiement}</Text>
                <Text style={{marginTop:2,marginBottom:2,fontSize:12}}><Text style={{fontWeight:'700'}}>{strings.POINTS} </Text> {item.points}</Text>
            </TouchableOpacity>
        )
    }


    useEffect(()=>{
        getLanguage()
        getCities();
        if(userData.user_id){
            getUserHistory(userData.user_id,userData.mobile_number,"not","CASABLANCA",new Date(),new Date())
        }
    },[])



    function renderContent(){
        if(history.length>0){
            return(
                <FlatList
            showsVerticalScrollIndicator={false}
            style={{width:'100%',marginTop:10,paddingBottom:20}}
            data={history}
            renderItem={renderTicketHistory}
            keyExtractor={(item,i)=>i.toString()}
            />
            )
        }
        else if(history.length===0){
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
    const [data,setData]=useState({})
    const [model,setModel]=useState(false)
    function renderModel(con){
        if(con=="show"){
            setModel(true)
        }  
        if(con=="hide"){
            setModel(false)
        } 
    }
    function renderErrorModel(con){
        if(con=="show"){
            setModal(true)
        }
        if(con=="hide"){
            setModal(false)
        }
        
    }

    const [language, setLanguage]=useState("");
    async function getLanguage(){
        const lan=await AsynceStorage.getItem('lang')
        if(lan=="ar"){
            setLanguage(lan)
        }
        
    }
    return (
        <View style={styles.cards}>
            {model?(
                <BookTicketsDetails
                visible={model}
                data={data}
                closeModle={()=>renderModel('hide')}
                 />
            ):null}
            <ErrorModel
            title={strings.PLEASE_SELECT_FIELDS}
            visible={modal}
            closeModle={()=>renderErrorModel('hide')}
            />
            <View>
                <Text style={{marginTop:5,marginBottom:5,textAlign:language?"left":null}}><Text style={{color:'#a51c27',fontWeight:'700'}}>{strings.FILTER} </Text> </Text>
                <View style={{flexDirection:'row',width:'100%',marginBottom:3}}>
                <View style={{width:'62%',flexDirection:'row',alignItems:'center'}}>
                                <View style={{width:'40%'}}>
                                <Text style={{fontWeight:'700',fontSize:12,textAlign:language?"left":null}}>{strings.DEPARTURE}</Text>
                                </View>
                                <View style={{backgroundColor:'rgba(0, 0, 0, 0.1)',borderRadius:7,width:'60%'}}>   
                    <Picker
                        activeItemTextStyle={{fontSize: 10}}
                        style={{color:'black',height:25,transform: [
                            { scaleX: 0.75 }, 
                            { scaleY: 0.75 },
                            ]}}
                        selectedValue={departureCity}
                        onValueChange={(itemValue, itemIndex) =>{
                            setDepartureCity(itemValue);
                        }

                        }>
                            <Picker.Item label="Please Select" value=""/>
                            {cities.map((c,i)=>{
                                return <Picker.Item key={i} label={c.City} value={c.City}/>
                            })}
                    </Picker>
                    </View>
                    </View>
                    <View style={{width:'38%',flexDirection:'row',alignItems:'center',marginBottom:3}}>
                                <View style={{width:'30%'}}>
                                <Text style={{fontWeight:'700',fontSize:12,paddingLeft:3,textAlign:language?"left":null}}> { strings.FROM}</Text>
                                </View>
                                <View style={{width:'70%'}}>   
                               <TouchableOpacity onPress={showDatePickerF} style={{backgroundColor:'rgba(0, 0, 0, 0.1)',borderRadius:7,width:'100%',justifyContent:'center',alignItems:'center',height:25}}>
                               <Text style={{textAlign:'center',fontSize:10}}> {dateF?dateFormat(dateF):"Please Select"}</Text>
                               </TouchableOpacity>
                               </View>
                    </View>
                </View>
                <View style={{flexDirection:'row',width:'100%'}}>
                <View style={{width:'62%',flexDirection:'row',alignItems:'center'}}>
                                <View style={{width:'40%'}}>
                                <Text style={{fontWeight:'700',fontSize:12,paddingLeft:3,textAlign:language?"left":null}}>{strings.ARRIVAL}</Text>
                                </View>
                                <View style={{backgroundColor:'rgba(0, 0, 0, 0.1)',borderRadius:7,width:'60%'}}>   
                    <Picker
                        activeItemTextStyle={{fontSize: 10}}
                        style={{color:'black',height:25,transform: [
                            { scaleX: 0.75 }, 
                            { scaleY: 0.75 },
                            ]}}
                        selectedValue={arrivalCity}
                        onValueChange={(itemValue, itemIndex) =>{
                            setArrivalCity(itemValue);
                        }

                        }>
                            <Picker.Item label="Please Select" value=""/>
                            {cities.map((c,i)=>{
                                return <Picker.Item key={i} label={c.City} value={c.City}/>
                            })}
                    </Picker>
                    </View>
                    </View>
                <View style={{width:'38%',flexDirection:'row',alignItems:'center'}}>
                                <View style={{width:'30%'}}>
                                <Text style={{fontWeight:'700',fontSize:12,paddingLeft:3,textAlign:language?"left":null}}>{strings.TO}</Text>
                                </View>
                                <View style={{width:'70%'}}>   
                               <TouchableOpacity onPress={showDatePicker} style={{backgroundColor:'rgba(0, 0, 0, 0.1)',borderRadius:7,width:'100%',justifyContent:'center',alignItems:'center',height:25}}>
                               <Text style={{textAlign:'center',fontSize:10}}> {date?dateFormat(date):"Please Select"}</Text>
                               </TouchableOpacity>
                               </View>
                    </View>

                </View>
            </View>
            <TouchableOpacity 
                onPress={()=>{
                    if(date && dateF){
                        getUserHistory(userData.user_id,userData.mobile_number,arrivalCity,departureCity,date,dateF)
                    }else{
                        renderErrorModel('show')
                    }
                }}
                style={{flexDirection:'row',marginTop:3,width:'100%',borderRadius:7,height:30,backgroundColor:'#AA3333',justifyContent:'center',alignItems:'center'}}>
                    <SearchIcon
                    size={18}
                    color="white"
                    name="search"
                    />
                    <Text style={{marginLeft:5,color:'white'}}>{strings.SEARCH}</Text>
                </TouchableOpacity>
            <View style={{flex:1,width:'100%'}}>
            {renderContent()}
            </View>
            <View>
            <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisibleF}
        mode="date"
        onConfirm={handleConfirmF}
        onCancel={hideDatePickerF}
      />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cards:{
        flex:1,
        backgroundColor:'white',
        borderRadius:7,
        padding:10,
        width:'90%',
        justifyContent:'flex-start',
        alignItems:'center',
        paddingBottom:10,
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:10,
        marginBottom:90
        
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
    }
})

function mapstateToProps({cities,userData,history}){
    return {cities,userData,history}
}

export default connect(mapstateToProps,actions)(BookingHistory);