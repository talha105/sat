import React,{useEffect,useMemo,useState} from 'react'
import { StyleSheet, Text, View,Image,ImageBackground ,TouchableOpacity,FlatList, TextInput, Dimensions} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import CarIcon from "react-native-vector-icons/AntDesign"
import BackIcon from "react-native-vector-icons/Ionicons"
import SeatIcon from "react-native-vector-icons/MaterialCommunityIcons"
import {Picker} from '@react-native-picker/picker';
import * as actions from "../store/actions"
import { connect } from 'react-redux';
import SearchIcon from "react-native-vector-icons/FontAwesome"
import Skeleton from "../component/skeleton";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ProIcon from "react-native-vector-icons/AntDesign";
import Loader from "../component/loader";
import MapModal from "../component/mapModal";
import dateFormat from "../utils/dateFormat";
import strings from "../localization/string"
import PointsIcon from "react-native-vector-icons/MaterialCommunityIcons"
import _ from "lodash"
import ErrorModel from "../component/errorModel"
import ChargerIcon from "react-native-vector-icons/FontAwesome5"
import WifiIcon from "react-native-vector-icons/Fontisto"
import FridgeIcon from "react-native-vector-icons/MaterialCommunityIcons"
import AsynceStorage from "@react-native-async-storage/async-storage"

const {width,height}=Dimensions.get('window')


function Booking({getCities,cities,getAgencies,agencies,getBuses,busses,userData,navigation,booking}) {

    const [date,setDate]=useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [loading,setLoading]=useState(false)
    const [loading2,setLoading2]=useState(false)
    const [mapModel,setMapModel]=useState(false)
    const [departureCity, setDepartureCity] = useState("");
    const [agency, setAgency] = useState("");
    const [arrivalCity, setarrivalCity] = useState("");
    const [submit,setSubmit]=useState(false)
    const [noOfPas,setNoOfPas]=useState("")
    const [weekDate,setWeekDate]=useState(new Date())
    const [modal,setModal]=useState(false)
    const [week,setWeek]=useState([
        {
            day:'MON',
            date:new Date(),
            selected:false
        },
        {
            day:'TUE',
            date:new Date(),
            selected:false
        },
        {
            day:'THU',
            date:new Date(),
            selected:false
        },
        {
            day:'WED',
            date:new Date(),
            selected:false
        }
    ])
    const [agencyCor,setAgencyCordinates]=useState({
        LATITUDE:"",
        LONGITUDE:"",
        DESIGNATION:"",
        ADRESSE:""

    })

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = (date) => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date)
    hideDatePicker();
    
  };
  const renderWeekDaysMemo=useMemo(()=>{
    var dateBox1 =new Date();
        dateBox1.setDate(date.getDate());
        var dateBox2 =new Date();
        dateBox2.setDate(date.getDate() + 1);
    
        var dateBox3 =new Date();
        dateBox3.setDate(date.getDate() + 2);
    
        var dateBox4 =new Date();
        dateBox4.setDate(date.getDate() + 3);
    
        const weekDays=["SUN","MON","TUE","WED","THU","FRI","SAT"]
        
        const renderDays=[
            {
                day:weekDays[dateBox1.getDay()],
                date:dateBox1,
                selected:false
            },
            {
                day:weekDays[dateBox2.getDay()],
                date:dateBox2,
                selected:false
            },
            {
                day:weekDays[dateBox3.getDay()],
                date:dateBox3,
                selected:false
            },
            {
                day:weekDays[dateBox4.getDay()],
                date:dateBox4,
                selected:false
            }
        ]
        setWeek(renderDays)
},[date])
  function renderMap(con){
    if(con==="show"){
        setMapModel(true)
    }
    if(con==="hide"){
        setMapModel(false)
    }
  }


    useEffect(() => {
        getLanguage()
        getCities()
        // getBuses('NADOR','RABAT','01',null,userData,null,'5') // remove later
    }, [])


    const [language, setLanguage]=useState("");
    async function getLanguage(){
        const lan=await AsynceStorage.getItem('lang')
        if(lan=="ar"){
            setLanguage(lan)
        }
        
    }


    const renderWeek=({item,index})=>{
        

                return (
                    <TouchableOpacity 
                    onPress={()=>{
                        setSubmit(true);
                        if(departureCity && arrivalCity && agency && noOfPas && date){
                            getBuses(departureCity,arrivalCity,agency,item.date,userData,renderLoader2,noOfPas)
                            setWeek((pS)=>{
                                const array=[...pS];
                                array.forEach((it)=>it.selected=false)
                                array[index].selected=true
                                console.log(array)
                                return array
                            })
                        }
                        
                    }}
                    style={{...styles.box,backgroundColor:item.selected?'red':'#62181d'}}>
                        {loading2?(<Loader/>):(
                            <>
                            <Text style={{color:'white',fontWeight:'700'}}>{item.day}</Text>
                        <Text style={{color:'white'}}>{item.date?item.date.getDate():null}</Text>
                            </>
                        )}
                    </TouchableOpacity>
                )

    }

    const renderList=()=>{
        if(busses.length>0){
            return(
                <FlatList
                data={busses}
                style={{paddingLeft:10,paddingRight:10,marginTop:30}}
                renderItem={renderTicket}
                keyExtractor={(item,i)=>i.toString()}
                />
            )
        }
        else if(busses.length==0){
            return(
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontWeight:'700',fontSize:30}}>{strings.NO_RESULT_FOUND}</Text>
                </View>
            )
        }
        else{
            return(
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <SearchIcon
                    name="search"
                    size={60}
                    color='#dedede'
                    />
                    <Text style={{fontSize:40,fontWeight:'700',color:'#dedede'}}>{strings.SEARCH}</Text>
                </View>
            )
        }
    }

    function renderLoader(con){
        if(con===true){
            setLoading(true)
        }
        if(con===false){
            setLoading(false)
        }
    }
    function renderLoader2(con){
        if(con===true){
            setLoading2(true)
        }
        if(con===false){
            setLoading2(false)
        }
    }
    const renderTicket=({item})=>{
        return(
            <TouchableOpacity activeOpacity={0.7} onPress={()=>{
                if(item.Epuise){
                    renderErrorModel('show')
                }else{
                    function goToPay(info){
                        navigation.navigate('payment',{
                            ticketInfo:item,
                            ticketBookInfo:info
                        });
                    }
                    booking(item,userData.mobile_number,userData.user_id,noOfPas,goToPay);
                }
                
            }}>
                <View style={styles.ticket}>
                    <View style={styles.tLeft}>
                    <View style={{flexDirection:'row',justifyContent:"space-between",position:'absolute',top:-5,width:(width/2)-70}}>
                    <View>
                        <ChargerIcon
                        name="charging-station"
                        color="green"
                        size={15}
                        />
                    </View>
                    <View>
                        <WifiIcon
                        name="wifi-logo"
                        color="green"
                        size={15}
                        />
                    </View>
                    <View>
                        <FridgeIcon
                        name="fridge"
                        color="green"
                        size={15}
                        />
                    </View>
                    <View>
                        <FridgeIcon
                        name="chair-rolling"
                        color="green"
                        size={15}
                        />
                    </View>
                    <View>
                        <FridgeIcon
                        name="air-conditioner"
                        color="green"
                        size={15}
                        />
                    </View>
                    </View>
                        <Text style={{color:'#a51c27',fontWeight:'700'}}>{item.Type_bus}</Text>
                        <Text style={{color:'#2c2c2c'}}>{item.Depature_bus}</Text>
                        <Text style={{color:'#2c2c2c',fontWeight:'700',marginTop:20}}>{item.Departure_time}</Text>
                    </View>
                    <View style={styles.tCenter}>
                        <View style={{height:25,width:25,backgroundColor:item.Epuise?"red":"green",justifyContent:'center',alignItems:'center',borderRadius:30/2,position:'absolute',top:5,zIndex:2}}>
                        <SeatIcon style={styles.icon} name="seat-passenger" color={'white'} size={20}/>
                        </View>
                        <Image
                        resizeMode="contain"
                        style={{width:90,height:90}}
                        source={require('../../assets/sat.png')}
                        />
                        {/* <Image
                        resizeMode="contain"
                        style={{width:60,height:60}}
                        source={require('../../assets/grayBus.png')}
                        /> */}
                        <Text style={{textAlign:'center',fontSize:12}}>{item.duration}</Text>
                    </View>
                    <View style={styles.tRight}>
                        {item.PointPurchase?(
                            <PointsIcon
                            style={{position:'absolute',top:-5}}
                            size={20}
                                color="#d1a700"
                                name="star-four-points"
                                />
                        ):null}
                        <Text style={{color:'#2c2c2c',fontWeight:'700'}}><Text style={{color:'#a51c27',fontWeight:'700'}}>{strings.PRICE} </Text> {item.Amount}</Text>
                        <Text style={{color:'#2c2c2c'}}>{item.Arrival_bus}</Text>
                        <Text style={{color:'#2c2c2c',fontWeight:'700',marginTop:20}}>{item.Arrival_time}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    function renderErrorModel(con){
        if(con=="show"){
            setModal(true)
        }
        if(con=="hide"){
            setModal(false)
        }
        
    }
    return (
        <View style={{flex:1}}>
            <View style={styles.top}>
                <ImageBackground resizeMode="stretch"  style={styles.bookingBac} source={require('../../assets/bookingBac.png')}>
                    <MapModal
                    visible={mapModel}
                    closeModle={()=>renderMap('hide')}
                    lat={agencyCor.LATITUDE}
                    lon={agencyCor.LONGITUDE}
                    title={agencyCor.DESIGNATION}
                    des={agencyCor.ADRESSE}
                    />
                    <ErrorModel
                    title={strings.NO_SEATS_AVAILABLE}
                    visible={modal}
                    closeModle={()=>renderErrorModel('hide')}
                    />
                    <View style={styles.topBar}>
                        <View style={{width:'33.33%'}}/>
                        <View style={{width:'33.33%',alignItems:'center',height:40,justifyContent:'center'}}>
                            <Text style={styles.title}>{strings.BOOKING}</Text>
                        </View>
                        <View style={{width:'25%',alignItems:'flex-end',paddingRight:10}}/>
                        {/* <TouchableOpacity onPress={()=>navigation.navigate('profile')} style={{width:'33.33%',alignItems:'flex-end',paddingRight:10}}>
                        <ProIcon style={{margin:10}} name="profile" size={30} color="white" />
                        </TouchableOpacity> */}
                    </View>
                    <View style={styles.mid}>
                        <View style={styles.left}>
                            <View style={styles.text}>
                                <Text style={{color:'white',fontWeight:'700',fontSize:12,marginTop:4,textAlign:language?"left":null}}>{strings.DEPARTURE_CITY}</Text>
                                <View style={{backgroundColor:'rgba(0, 0, 0, 0.28)',borderRadius:7,width:'90%'}}>
                                <Picker
                                activeItemTextStyle={{fontSize: 10}}
                                style={{color:'white',height:25,transform: [
                                    { scaleX: 0.75 }, 
                                    { scaleY: 0.75 },
                                 ]}}
                                selectedValue={departureCity}
                                onValueChange={(itemValue, itemIndex) =>{
                                    setDepartureCity(itemValue);
                                    getAgencies(itemValue,userData.user_id, userData.mobile_number)
                                }

                                }>
                                    <Picker.Item label="Please Select" value=""/>
                                    {cities.map((c,i)=>{
                                        return <Picker.Item key={i} label={c.City} value={c.City}/>
                                    })}
                                </Picker>
                                </View>
                                {!departureCity && submit?<Text style={{fontSize:10,color:'white',textAlign:'right',width:'90%'}}>{strings.PLEASE_FILL}</Text>:<Text></Text>}
                            </View>
                            <View style={styles.text}>
                                <Text style={{color:'white',fontWeight:'700',fontSize:12,textAlign:language?"left":null}}>{strings.ARRIVAL_CITY}</Text>
                                <View style={{backgroundColor:'rgba(0, 0, 0, 0.28)',borderRadius:7,width:'90%'}}>
                                <Picker
                                style={{color:'white',height:25,transform: [
                                    { scaleX: 0.75 }, 
                                    { scaleY: 0.75 },
                                 ]}}
                                selectedValue={arrivalCity}
                                onValueChange={(itemValue, itemIndex) =>
                                    setarrivalCity(itemValue)
                                }>
                                <Picker.Item label="Please Select" value=""/>
                                {cities.map((c,i)=>{
                                        return <Picker.Item key={i} label={c.City} value={c.City}/>
                                    })}
                                </Picker>
                                </View>
                                {!arrivalCity && submit?<Text style={{fontSize:10,color:'white',textAlign:'right',width:'90%'}}>{strings.PLEASE_SELECT}</Text>:<Text></Text>}
                            </View>

                            <View style={styles.text}>
                                <Text style={{color:'white',fontWeight:'700',fontSize:12,textAlign:language?"left":null}}>{strings.BOOK_DATE}</Text>
                                <TouchableOpacity onPress={showDatePicker}>
                                <Text style={{color:'white',backgroundColor:'rgba(0, 0, 0, 0.28)',width:'90%',padding:5,borderRadius:7,fontWeight:'600',fontSize:12}}>{date?dateFormat(date):"Select"}</Text>
                                </TouchableOpacity>
                            </View>
                            {!date && submit?<Text style={{fontSize:10,color:'white',textAlign:'right',width:'90%'}}>{strings.PLEASE_FILL}</Text>:<Text></Text>}
                            {/* <View style={styles.text}>
                                <Text style={{color:'white',fontWeight:'700',fontSize:12}}>{strings.AGENCIES}</Text>
                                <View style={{backgroundColor:'rgba(0, 0, 0, 0.28)',borderRadius:7,width:'90%'}}>
                                <Picker
                                enabled={agencies.length>0 && agencies[0].DESIGNATION?true:false}
                                style={{color:'white',height:25,transform: [
                                    { scaleX: 0.75 }, 
                                    { scaleY: 0.75 },
                                 ]}}
                                selectedValue={agency}
                                onValueChange={(itemValue, itemIndex) =>{
                                    setAgency(itemValue)
                                }
                                }>
                                    <Picker.Item label={agencies.length===0?"Not Available":"Please Select"} value=""/>
                                {agencies.map((a,i)=>{
                                        return <Picker.Item key={i} label={a.DESIGNATION}  value={a.CODE_AGENCE}/>
                                    })}
                                </Picker>
                                </View>
                                {!agency && submit?<Text style={{fontSize:10,color:'white',textAlign:'right',width:'90%'}}>{strings.PLeas}</Text>:<Text></Text>}
                            </View> */}

                        </View>
                        <View style={styles.center}>
                        <View style={styles.text}>
                                <View style={{flexDirection:'row',alignItems:'flex-end',justifyContent:'space-between',width:'90%'}}>
                                <Text style={{color:'white',fontWeight:'700',fontSize:12}}>{strings.AGENCIES}</Text>
                                <TouchableOpacity 
                                onPress={()=>{
                                    if(agency && agencies.length>0){
                                        const selectAgen=agencies.filter((a)=>agency===a.CODE_AGENCE)
                                        setAgencyCordinates(selectAgen[0])
                                        renderMap('show')
                                    }else{
                                        alert('First select agency')
                                    }
                                }}
                                style={{width:'30%',backgroundColor:'green',height:20,borderRadius:7,justifyContent:'center',alignItems:'center'}}>
                                <Text style={{color:'white',fontSize:12}}>{strings.MAP}</Text>
                            </TouchableOpacity>
                                </View>
                                <View style={{backgroundColor:'rgba(0, 0, 0, 0.28)',borderRadius:7,width:'90%'}}>
                                <Picker
                                enabled={agencies.length>0 && agencies[0].DESIGNATION?true:false}
                                style={{color:'white',height:25,transform: [
                                    { scaleX: 0.75 }, 
                                    { scaleY: 0.75 },
                                 ]}}
                                selectedValue={agency}
                                onValueChange={(itemValue, itemIndex) =>{
                                    setAgency(itemValue)
                                }
                                }>
                                    <Picker.Item label={agencies.length===0?"Not Available":"Please Select"} value=""/>
                                {agencies.map((a,i)=>{
                                        return <Picker.Item key={i} label={a.DESIGNATION}  value={a.CODE_AGENCE}/>
                                    })}
                                </Picker>
                                </View>
                                {!agency && submit?<Text style={{fontSize:10,color:'white',textAlign:'right',width:'90%'}}>{strings.PLEASE_SELECT}</Text>:<Text></Text>}
                            </View>
                        {/* <View style={styles.text}>
                                <Text style={{color:'white',fontWeight:'700',fontSize:12}}>{strings.BOOK_DATE}</Text>
                                <TouchableOpacity onPress={showDatePicker}>
                                <Text style={{color:'white',backgroundColor:'rgba(0, 0, 0, 0.28)',width:'90%',padding:5,borderRadius:7,fontWeight:'600',fontSize:12}}>{date?dateFormat(date):"Select"}</Text>
                                </TouchableOpacity>
                            </View>
                            {!date && submit?<Text style={{fontSize:10,color:'white',textAlign:'right',width:'80%'}}>{strings.PLEASE_FILL}</Text>:<Text></Text>} */}
                            <View style={{width:'100%'}}>
                            <Text style={{color:'white',fontWeight:'700',fontSize:12,textAlign:language?"left":null}}>{strings.NO_OF_PASSENGER_CAPITAL}</Text>
                            <TextInput 
                            onChangeText={(v)=>setNoOfPas(v)}
                            keyboardType="number-pad"
                            placeholder="No of Passengers"
                            placeholderTextColor="white"
                            style={{backgroundColor:'rgba(0, 0, 0, 0.28)',borderRadius:7,width:'90%',height:25,color:'white',padding:0,paddingLeft:10,fontSize:12}}/>
                            {!noOfPas && submit?<Text style={{fontSize:10,color:'white',textAlign:'right',width:'90%'}}>{strings.PLEASE_FILL}</Text>:<Text></Text>}
                            {/* <TouchableOpacity 
                            onPress={()=>{
                                if(agency && agencies.length>0){
                                    const selectAgen=agencies.filter((a)=>agency===a.CODE_AGENCE)
                                    setAgencyCordinates(selectAgen[0])
                                    renderMap('show')
                                }else{
                                    alert('First select agency')
                                }
                            }}
                            style={{width:'40%',backgroundColor:'green',height:25,marginTop:14,borderRadius:7,justifyContent:'center',alignItems:'center'}}>
                                <Text style={{color:'white'}}>{strings.MAP}</Text>
                            </TouchableOpacity> */}
                        <TouchableOpacity 
                        style={styles.searchBtn}
                        onPress={()=>{
                            setSubmit(true);
                            if(departureCity && arrivalCity && date && agency && noOfPas){
                                renderLoader(true)
                                getBuses(departureCity,arrivalCity,agency,date,userData,renderLoader,noOfPas)
                            }
                        }}
                        >
                            {loading?<Loader/>:(
                                <>
                                <SearchIcon
                                name="search"
                                size={15}
                                color="white"
                                />
                                <Text style={{color:'white',fontWeight:'700',textAlign:'center',marginLeft:15}}>{strings.SEARCH_RESULT}</Text>
                                </>
                            )}
                        </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'flex-start',width:'100%',paddingBottom:10,position:'absolute',bottom:-30,zIndex:5}}>
                        
                        <View style={{width:'80%',justifyContent:'center',alignItems:'center'}}>
                        <FlatList
                        data={week}
                        horizontal
                        style={{width:'90%'}}
                        renderItem={renderWeek}
                        initialNumToRender={4}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item,i)=>i.toString()}
                        />
                        </View>
                        {/* <TouchableOpacity 
                        style={styles.searchBtn}
                        onPress={()=>{
                            setSubmit(true);
                            if(departureCity && arrivalCity && date && agency && noOfPas){
                                renderLoader(true)
                                getBuses(departureCity,arrivalCity,agency,date,userData,renderLoader,noOfPas)
                            }
                        }}
                        >
                            {loading?<Loader/>:(
                                <>
                                <SearchIcon
                                name="search"
                                size={15}
                                color="white"
                                />
                                <Text style={{color:'white',fontWeight:'700',textAlign:'center',marginLeft:15}}>{strings.SEARCH_RESULT}</Text>
                                </>
                            )}
                        </TouchableOpacity> */}
                    </View>
                </ImageBackground>
            </View>
            <View style={styles.list}>
                {renderList()}
            </View>
            <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

        </View>
    )
}

const styles = StyleSheet.create({

    top:{
        height:270,
        borderBottomLeftRadius:40,
        borderBottomRightRadius:40,
        zIndex:2
    },
    bookingBac:{
        width:'100%',
        flex:1
    },
    list:{
        flex:3,
        marginTop:5
    },
    topBar:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        marginBottom:10
    },
    title:{
        color:'white',
        fontWeight:'700',
        fontSize:22,
    },
    mid:{
        flexDirection:'row',
        width:'100%',
    },
    text:{
        width:'100%',
    },
    left:{
        justifyContent:'flex-start',
        paddingLeft:15,
        width:'50%',
    },
    center:{
        justifyContent:'flex-start',
        alignItems:'center',
        width:'50%',
    },
    box:{
        justifyContent:'center',
        alignItems:'center',
        width:width/6.5,
        height:width/6.5,
        backgroundColor:'#62181d',
        borderRadius:10,
        marginLeft:5,
        marginRight:5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    ticket:{
        width:'100%',
        marginTop:10,
        borderRadius:7,
        backgroundColor:'#e3e3e3',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
        flexDirection:'row',
        padding:20
    },
    tLeft:{
        width:'33.33%',
        justifyContent:'center',
        alignItems:'flex-start',
    },
    tCenter:{
        width:'33.33%',
        justifyContent:'center',
        alignItems:'center'
    },
    tRight:{
        width:'33.33%',
        justifyContent:'center',
        alignItems:'flex-end',
    },
    icon:{
        position:'absolute',
        top:1,
        zIndex:1
    },
    searchBtn:{
        flexDirection:"row",
        marginTop:15,
        height:26,
        backgroundColor:'#E22626',
        width:'90%',
        borderRadius:7,
        justifyContent:'center',
        alignItems:"center"
    }
})

function mapStateToProps({cities,agencies,busses,userData}){
    return {cities,agencies,busses,userData}
}

export default connect(mapStateToProps,actions)(Booking)
