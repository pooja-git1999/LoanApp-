import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import React from 'react'
import Pdf from 'react-native-pdf';
import Icon from 'react-native-vector-icons/dist/AntDesign';

export default function FullScreenPdf({ route, navigation }) {
    const { pdfUrl } = route.params;
    const isPdf = pdfUrl.startsWith('data:application/pdf;base64')
    return (
        <View style={styles.container}>
            {isPdf ? (
                <Pdf source={{ uri: pdfUrl }}
                trustAllCerts={false}
                style={styles.pdf}
               /> 
            ) : (
                <Image source={{uri:pdfUrl}} style={{height:'100%',width:'100%',resizeMode:'contain'}}/>
            )}
            
             
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
                <Icon name="arrowleft" size={30} color="#000" />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    pdf: {
        flex: 1,
        width: '100%'
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1,
    },
});