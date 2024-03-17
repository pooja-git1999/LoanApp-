import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Modal,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Pdf from 'react-native-pdf';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

export default function Document() {
  const navigation = useNavigation();

  const [pdfUrl, setpdfUrl] = useState([]);

  const showData = async () => {
    const token = await AsyncStorage.getItem('auth_token');
    const ID = await AsyncStorage.getItem('Id');
    const apidata = {
      eventID: '1001',
      addInfo: {
        SUBSR_ID: ID,
        //2354050 check for this id
      },
    };
    try {
      const url = 'http://192.168.33.157:5385/document';
      const result = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          guid: '4C4C4544-004A-5910-8034-C2C04F4E4D33',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apidata),
      });
      const data = await result.json();

      if (data && data.rData && data.rData.DocumentData) {
        setpdfUrl(data.rData.DocumentData); // Set loan data to state
        // console.log(data.rData.DocumentData[0].DOCUMENT_NAME)
      }
    } catch (error) {
      console.log(error);
      console.log('error in api calling--------------clAIM');
    }
  };
  useEffect(() => {
    showData();
  }, []);
  const openFullScreenPdf = pdfUrl => {
    navigation.navigate('FullScreenPdf', {pdfUrl});
  };

  const downloadFile = fileData => {
    const {config, fs} = RNFetchBlob;
    const date = new Date();
    const fileDir = fs.dirs.DownloadDir;

    // Split the data to extract the MIME type and base64 data
    const parts = fileData.split(';base64,');
    if (parts.length !== 2) {
      console.error('Invalid data format');
      Alert.alert('Error', 'Invalid data format');
      return;
    }

    const mimeType = parts[0].replace('data:', ''); // Extract MIME type
    const base64Data = parts[1]; // Extract base64 data

    // Determine file extension from MIME type
    const extension = mimeType.split('/')[1];

    // Construct file path
    const filePath = `${fileDir}/download_${Math.floor(
      date.getTime() / 1000,
    )}.${extension}`;

    // Write file to device storage
    fs.writeFile(filePath, base64Data, 'base64')
      .then(() => {
        console.log('File saved to:', filePath);
        Alert.alert('File Downloaded Successfully');
      })
      .catch(error => {
        console.error('Error saving file:', error);
        Alert.alert('Error', 'Failed to save file');
      });
  };

  return (
    <View style={styles.container}>
      {pdfUrl.length > 0 ? (
        <View style={{flex: 1}}>
          <FlatList
            data={pdfUrl}
            renderItem={({item}) => (
              <View style={styles.pdfItem}>
                <TouchableOpacity
                  onPress={() => openFullScreenPdf(item.ATTACHMENT)}>
                  <Text>{item.DOCUMENT_NAME}</Text>
                </TouchableOpacity>

                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => {
                      downloadFile(item.ATTACHMENT);
                    }}>
                    <Icon
                      name="download"
                      size={22}
                      color="#bbb"
                      style={{paddingRight: 15}}
                    />
                  </TouchableOpacity>
                  <Icon
                    name="eye"
                    size={22}
                    color="#bbb"
                    onPress={() => openFullScreenPdf(item.ATTACHMENT)}
                  />
                </View>
              </View>
            )}
          />
        </View>
      ) : (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Text>No Document available</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 15,
    paddingTop: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  pdfItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    padding: 8,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    width: '100%',
  },
  pdfView: {
    flex: 7,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: -30,
  },
});
