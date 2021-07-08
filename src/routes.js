import React, { Component, useEffect, useState } from "react";
import {Dimensions,ActivityIndicator, View} from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from "./screens/welcome";
import RegForm from "./screens/regForm"
import OtpDetails from "./screens/otpDetails"
import Booking from "./screens/booking"
import Payment from "./screens/payment/payment";
import TicketInformation from "./screens/ticketInformation";
import History from "./screens/history/history";
import Complaint from "./screens/complaint";
import AboutUs from "./screens/aboutUs";
import Login from "./screens/login"
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { connect } from "react-redux";
import AboutIcon from "react-native-vector-icons/MaterialCommunityIcons"
import TicketIcon from "react-native-vector-icons/FontAwesome5"
import HistoryIcon from "react-native-vector-icons/FontAwesome5"
import ComplaintIcon from "react-native-vector-icons/MaterialCommunityIcons"
import ProfileIcon from "react-native-vector-icons/AntDesign"
import BookingIcon from "react-native-vector-icons/FontAwesome"
import AddComplaint from "./screens/AddComplains"
import Profile from "./screens/profile"
import PayWebView from "./screens/payment/PayWebView"
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as  actions from "./store/actions";
import BookTicket from "./screens/bookTickets"
import strings from "./localization/string"


const Tab = createMaterialBottomTabNavigator();


function BookingRoutes(){
  const Stack=createStackNavigator();
  return(
    <Stack.Navigator>
      <Stack.Screen 
        name="booking" 
        options={{headerShown:false}} 
        component={Booking} />
      <Stack.Screen 
        name="payment" 
        options={{headerShown:false}} 
        component={Payment} />
        <Stack.Screen 
        name="paywebView" 
        options={{headerShown:false}} 
        component={PayWebView} />
    </Stack.Navigator>
  )
}

function Complains(){
  const Stack=createStackNavigator();
  return(
    <Stack.Navigator>
      <Stack.Screen 
        name="complaints" 
        options={{headerShown:false}} 
        component={Complaint} />
      <Stack.Screen 
        name="addComplaint" 
        options={{headerShown:false}} 
        component={AddComplaint} />
    </Stack.Navigator>
  )
}

function BottomTabs() {
  return (
    <Tab.Navigator
    activeColor="#FFFFFF"
      inactiveColor="#FF6C6C"
      backBehavior="order"
      labeled={false}
      barStyle={{ backgroundColor: '#701400' }}
      initialRouteName="booking"
    >
      <Tab.Screen 
      name="booking" 
      component={BookingRoutes} 
      options={{
        tabBarIcon:({color})=><BookingIcon name="hand-pointer-o" size={25} color={color}/>
      }}
      />
      <Tab.Screen 
      name="history" 
      component={History} 
      options={{
        tabBarIcon:({color})=><HistoryIcon name="history" size={24} color={color}/>
      }}
      />
      <Tab.Screen 
      name="profile" 
      component={Profile}
      options={{
        tabBarIcon:({color})=><ProfileIcon name="solution1" size={26} color={color}/>
      }}
      />
      <Tab.Screen 
      name="complaint" 
      component={Complains}
      options={{
        tabBarIcon:({color})=><ComplaintIcon name="account-question-outline" size={26} color={color}/>
      }}
       />
       <Tab.Screen 
      name="bookTickets" 
      component={BookTicket} 
      options={{
        tabBarIcon:({color})=><TicketIcon name="ticket-alt" size={23} color={color}/>
      }}
      />
      <Tab.Screen 
      name="aboutus" 
      component={AboutUs} 
      options={{
        tabBarIcon:({color})=><AboutIcon name="information-outline" size={26} color={color}/>
      }}
      />
    </Tab.Navigator>
  );
}
function AuthScreens(){
    const Stack=createStackNavigator();
  return(
        <Stack.Navigator initialRouteName="welcome">
        <Stack.Screen 
        name="login" 
        options={{headerShown:false}} 
        component={Login} />
        <Stack.Screen 
        name="ticketInformation" 
        options={{headerShown:false}} 
        component={TicketInformation} />
        <Stack.Screen 
        name="payment" 
        options={{headerShown:false}} 
        component={Payment} />
        <Stack.Screen 
        name="otpDetails" 
        options={{headerShown:false}} 
        component={OtpDetails} /> 
        <Stack.Screen 
            name="regForm" 
            options={{headerShown:false}} 
            component={RegForm} /> 
        <Stack.Screen 
            name="welcome" 
            options={{headerShown:false}} 
            component={Welcome} /> 
        </Stack.Navigator>
  )
}
function Routes({userData,otpRed,getOtp,verifyOTP}){
  const [loading,setLoading]=useState(false)
  useEffect(()=>{
    ifUserExsit();
    setLan()
  },[otpRed])

  async function setLan(){
    const lang=await AsyncStorage.getItem('lang')
    lang?strings.setLanguage(lang):null
  }
  async function ifUserExsit(){
    const otp=await AsyncStorage.getItem('otp');
    const no=await AsyncStorage.getItem('no')
    if(otp){
    verifyOTP(otp,null,null,no,getOtp,true).then(()=>{
      setLoading(true)
    })
    }else{
      setLoading(true)
    }
  }
  console.log('tttt',otpRed)

if(loading){
  return(
    <NavigationContainer>
        {otpRed?BottomTabs():AuthScreens()}
    </NavigationContainer>
  )
}else{
return (
  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator
            color="red"
            size={30}
            />
  </View>
)
}
}

function mapStateToProps({userData,otpRed,verifyOtp}){
  return {userData,otpRed,verifyOtp}
}


export default connect(mapStateToProps,actions)(Routes)