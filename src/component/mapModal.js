import React, { Component } from 'react'
import { Text, View,Modal ,StyleSheet,Dimensions, TouchableOpacity} from 'react-native'
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';
import CrossIcon from "react-native-vector-icons/Entypo"
import Map from "./map"
const {width,height}=Dimensions.get('window')
function MapModal({visible,closeModle,lon,lat,title,des}){
    return (
        <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        style={{flex:1,justifyContent:'center',elevation:5}}
        >
            <View style={{flex:1,justifyContent:'center',alignItems:'center',height:height,backgroundColor:'rgba(0,0,0,0.7)'}}>
                <View style={styles.con}>
                    <View style={styles.iconCon}>
                        <TouchableOpacity style={{marginTop:10,marginRight:10,zIndex:2}} onPress={()=>{
                        closeModle()
                    }}>
                            <CrossIcon
                            name="cross"
                            color="gray"
                            size={30}
                            />
                        </TouchableOpacity>
                        <Map
                        lat={Number(lat)}
                        lon={Number(lon)}
                        title={title}
                        des={des}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}
const styles=StyleSheet.create({
    con:{
        backgroundColor:'white',
        alignItems:'flex-end',
        width:width/1.25,
        height:height/2,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    iconCon:{
        flex:1,
        width:'100%',
        alignItems:'flex-end'
    },
    btn:{
        marginTop:15,
        height:30,
        backgroundColor:'green',
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
export default MapModal;