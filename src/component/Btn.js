import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function Btn({ btn_name, bgColor, onPress, txtColor }) {
    return (
        <View style={{ alignItems: 'center' }}>
            <TouchableOpacity style={styles.btn_style} onPress={onPress} >
                <Text style={styles.center} >{btn_name}</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    btn_style: {
        width: '85%',
        marginTop: 10,
        height: 45,
        textAlignVertical:'center',
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: '#374a72',
       justifyContent:'center'
    },
    center: {
        fontWeight: '500',
        fontSize: 20,
        color: '#fff'
    },
})