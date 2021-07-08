import React from 'react'
import { StyleSheet, Text, View,ActivityIndicator} from 'react-native'

export default function Loader() {
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator
            color="white"
            size={20}
            />
        </View>
    )
}

const styles = StyleSheet.create({})
