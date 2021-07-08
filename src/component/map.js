import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView,{PROVIDER_GOOGLE,Marker} from "react-native-maps"
export default function Map({lat,lon,title,des}) {
    return (
        <View style={{flex:1,...StyleSheet.absoluteFillObject}}>
            <MapView
            loadingEnabled
            provider={PROVIDER_GOOGLE}
            style={{...StyleSheet.absoluteFillObject}}
            initialRegion={{
                latitude: lat,
                longitude: lon,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,    
            }}
        >
            <Marker
            pinColor={"red"}
            coordinate={{latitude: lat,
            longitude: lon}}
            title={title}
            description={des}
         />
        </MapView>
        </View>
    )
}
