import React, { Component } from 'react'
import { Text, View,Modal ,StyleSheet,Dimensions, TouchableOpacity,Image} from 'react-native'
import IconSuccess from "react-native-vector-icons/AntDesign"
import strings from '../localization/string'

const {width,height}=Dimensions.get('window')
function Poster({visible,closeModle,title,go}){
    return (
        <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        style={{flex:1,justifyContent:'center',elevation:5}}
        >
            <View style={{flex:1,justifyContent:'center',alignItems:'center',height:height,backgroundColor:'rgba(0,0,0,0.7)'}}>
                <View style={styles.con}>
                    <Image
                    resizeMode="stretch"
                    style={{width:'100%',flex:1}}
                    source={require('../../assets/poster.png')}
                    />

                    <TouchableOpacity style={styles.btn} onPress={()=>{
                        closeModle()
                        go?go():null
                    }}>
                        <Text style={styles.btnText}>{strings.OK}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
const styles=StyleSheet.create({
    con:{
        backgroundColor:'white',
        width:width/1.2,
        height:height/1.5,
        borderRadius:7,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    btn:{
        marginTop:15,
        height:50,
        backgroundColor:'green',
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    btnText:{
        color:'white',
        fontFamily:'Poppins-Regular',
        fontSize:17,
        textAlign:'center',
        textAlignVertical:'center',
        marginTop:2
    },
    icon:{
        backgroundColor:'white',
        borderWidth:4,
        borderColor:'#001441',
        width:'18%',
        height:'18%',
        borderRadius:'18%'/2,
        justifyContent:'center',
        alignItems:'center'
    }
})
export default Poster;