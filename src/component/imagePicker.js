import React, { Component } from 'react'
import { Text, View,Modal ,StyleSheet,Dimensions, TouchableOpacity} from 'react-native'
import CameraIcon from "react-native-vector-icons/AntDesign"
import GalleryIcon from "react-native-vector-icons/FontAwesome"
import strings from '../localization/string'

const {width,height}=Dimensions.get('window')
function ImagePickerModal({visible,closeModle,goToCamera,goToGallery}){
    return (
        <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        style={{flex:1,justifyContent:'center',elevation:5}}
        >
            <View style={{flex:1,justifyContent:'center',alignItems:'center',height:height,backgroundColor:'rgba(0,0,0,0.7)'}}>
                <View style={styles.con}>
                    <View style={{flexDirection:'row',justifyContent:'space-around',width:'70%'}}>
                        <TouchableOpacity 
                        onPress={()=>goToCamera()}
                        style={{width:60,height:60,borderRadius:60/2,borderColor:'#AA3333',borderWidth:3,justifyContent:'center',alignItems:'center'}}>
                        <CameraIcon
                        size={30}
                        color="#AA3333"
                        name="camerao"
                        
                        />
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={()=>goToGallery()}
                        style={{width:60,height:60,borderRadius:60/2,borderColor:'#AA3333',borderWidth:3,justifyContent:'center',alignItems:'center'}}>
                        <GalleryIcon
                        size={30}
                        color="#AA3333"
                        name="photo"
                        />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={()=>{
                        closeModle()
                    }}>
                        <Text style={styles.btnText}>{strings.CANCEL}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
const styles=StyleSheet.create({
    con:{
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        width:width/1.5,
        height:height/4,
        borderRadius:20,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    iconCon:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    },
    btn:{
        marginTop:15,
        height:30,
        backgroundColor:'#AA3333',
        width:'70%',
        borderRadius:7
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
export default ImagePickerModal;