import React from 'react'
import { 
    StyleSheet,
    Text, 
    View ,
    ImageBackground,
    Dimensions,
    Image,
    TouchableOpacity,
} from 'react-native';
import strings from "../localization/string"
import AsynceStorage from "@react-native-async-storage/async-storage";

const {height,width}=Dimensions.get('window')

 function Welcome({navigation}) {
    return (
        <View>
            <ImageBackground style={styles.backgroundImage} source={require('../../assets/background.png')}>
            <View style={{flex:1,width:'100%'}}>
                <View style={{flex:3,justifyContent:'center',alignItems:'center'}}>
                    <Image resizeMode="contain" style={{width:200,height:200,marginTop:100}} source={require('../../assets/logo.png')}/>
                </View>


                <View style={{flex:1,width:'100%',}}>
                    <View style={{width:'100%',flexDirection:'row',justifyContent:'space-around'}}>
                        <View style={{width:'35%',margin:10}}>
                        <TouchableOpacity onPress={async()=>{
                            await strings.setLanguage('ar')
                            await AsynceStorage.setItem('lang','ar')
                            navigation.navigate('login')
                        }}>
                            <Text style={styles.langBtn}>العربية</Text>
                        </TouchableOpacity>
                        </View>
                        <View style={{width:'35%',margin:10}}>
                        <TouchableOpacity onPress={async()=>{
                            await strings.setLanguage('en')
                            await AsynceStorage.setItem('lang','en')
                            navigation.navigate('login')
                        }}>
                            <Text style={styles.langBtn}>English</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{width:'100%',flexDirection:'row',justifyContent:'space-around'}}>
                        <View style={{width:'35%',margin:10}}>
                        <TouchableOpacity onPress={async()=>{
                            await strings.setLanguage('fr')
                            await AsynceStorage.setItem('lang','fr')
                            navigation.navigate('login')
                        }}>
                            <Text style={styles.langBtn}>Français</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundImage:{
        width:width,
        height:height
    },
    langBtn:{
        color:'white',
        borderWidth:2,
        borderColor:'white',
        padding:10,
        borderRadius:20,
        textAlign:'center',
    }
})


export default Welcome