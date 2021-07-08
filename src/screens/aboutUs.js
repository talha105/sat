import React from 'react'
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
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import * as actions from "../store/actions";
import ProIcon from "react-native-vector-icons/AntDesign";
import CirIcon from "react-native-vector-icons/Entypo";
import strings from "../localization/string"

const {width,height}=Dimensions.get('window');

function AboutUs({navigation}) {
    return (
        <View style={{flex:1}}>
             <ImageBackground style={styles.backgroundImage} source={require('../../assets/regBackground.png')}>
             <View style={styles.topBar}>
                        <View style={{width:'25%'}}/>
                        <View style={{width:'50%',alignItems:'center'}}>
                            <Text style={styles.title}>{strings.ABOUT_US}</Text>
                        </View>
                        <View style={{width:'25%',alignItems:'flex-end',paddingRight:10}}/>
                        {/* <TouchableOpacity onPress={()=>navigation.navigate('profile')} style={{width:'25%',alignItems:'flex-end',paddingRight:10}}>
                        <ProIcon style={{margin:10}} name="profile" size={30} color="white" />
                        </TouchableOpacity> */}
                    </View>
                    <View style={styles.cards}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Text style={{textAlign:'justify',fontSize:12}}>{strings.aboutText1}</Text>
                            <Text style={{textAlign:'justify',fontSize:12}}>{strings.aboutText2}</Text>
                            <Text style={{textAlign:'justify',fontSize:12}}>{strings.aboutText3}</Text>
                            <Text style={{textAlign:'justify',fontSize:12}}>{strings.aboutText4}</Text>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <CirIcon
                                name="circle"
                                size={10}
                                color="#000000"
                                />
                                <Text style={{textAlign:'justify',fontSize:12,marginLeft:5}}>
                                    {strings.aboutBullet1}
                                </Text>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <CirIcon
                                name="circle"
                                size={10}
                                color="#000000"
                                />
                                <Text style={{textAlign:'justify',fontSize:12,marginLeft:5}}>
                                    {strings.aboutBullet1}
                                </Text>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <CirIcon
                                name="circle"
                                size={10}
                                color="#000000"
                                />
                                <Text style={{textAlign:'justify',fontSize:12,marginLeft:5}}>
                                    {strings.aboutBullet2}
                                </Text>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <CirIcon
                                name="circle"
                                size={10}
                                color="#000000"
                                />
                                <Text style={{textAlign:'justify',fontSize:12,marginLeft:5}}>
                                    {strings.aboutBullet3}
                                </Text>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <CirIcon
                                name="circle"
                                size={10}
                                color="#000000"
                                />
                                <Text style={{textAlign:'justify',fontSize:12,marginLeft:5}}>
                                    {strings.aboutBullet4}
                                </Text>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <CirIcon
                                name="circle"
                                size={10}
                                color="#000000"
                                />
                                <Text style={{textAlign:'justify',fontSize:12,marginLeft:5}}>
                                    {strings.aboutBullet5}
                                </Text>
                            </View>
                            <Text style={{textAlign:'justify',fontSize:12}}>{strings.aboutText5}</Text>
                            <Text style={{textAlign:'justify',fontSize:12}}>{strings.aboutText6}</Text>
                            <Text style={{textAlign:'justify',fontSize:12,fontWeight:'700'}}>{strings.aboutHeading}</Text>
                            <Text style={{textAlign:'justify',fontSize:12}}>{strings.aboutText7}</Text>
                        </ScrollView>
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
        flexDirection:'row',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:20,
        marginBottom:10
        
    },
})

export default connect(null,actions)(AboutUs);
