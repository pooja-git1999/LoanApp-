import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useEffect, useState} from 'react';
import Loan from './src/screens/loan/Loan';
import Claim from './src/screens/claim/Claim';
import Icons from 'react-native-vector-icons/dist/AntDesign';
import Icon from 'react-native-vector-icons/dist/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import Document from './src/screens/dashboard/Document';
const Tab = createMaterialTopTabNavigator();

export default function MyTabs({navigation}) {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const focused = useIsFocused();
  const showData = async () => {
    const token = await AsyncStorage.getItem('auth_token');
    const ID = await AsyncStorage.getItem('Id');
    const apidata = {
      eventID: '1001',
      addInfo: {
        SUBSR_ID: ID,
      },
    };
    try {
      const url = 'http://192.168.33.157:5385/dashboard';
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
      setNumber(data.rData.UserData[0].MOBILE1);
      setMail(data.rData.UserData[0].EMAIL);
      setName(data.rData.UserData[0].SubscriberName);
    } catch (error) {
      console.log(error);
      console.log('error in api calling---------MYTabs');
    }
  };
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            await AsyncStorage.clear();
            navigation.navigate('Login');
          },
        },
      ],
      {cancelable: false},
    );
  };
  useEffect(() => {
    showData();
  }, [focused]);
  return (
    <View style={{flex: 1}}>
      <View style={styles.logo}>
        <Image
          source={require('./src/assets/AGI.png')}
          style={{height: 50, width: '80%', resizeMode: 'contain'}}
        />
      </View>

      <View style={styles.top_container}>
        <View style={{marginHorizontal: 75}}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '500',
              color: '#fff',
              textTransform: 'uppercase',
              textAlign: 'center',
            }}>
            {name}
          </Text>
          <Text style={styles.usertxt}>{number}</Text>
          <Text style={styles.usertxt}>{mail}</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleLogout()}
          style={{right: 15, position: 'absolute'}}>
          <Icons name="logout" size={16} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={{flex: 6}}>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: 'black',
            tabBarLabelStyle: {fontSize: 15, fontWeight: '700'},
            tabBarStyle: {
              height: 55,
              borderTopColor: '#bbb',
              borderTopWidth: 1,
            },
          }}>
          <Tab.Screen
            name="Loan"
            component={Loan}
            options={{
              tabBarLabel: 'Loan',
              header: () => <DashboardHeader />,
            }}></Tab.Screen>
          <Tab.Screen
            name="Claim"
            component={Claim}
            options={{
              tabBarLabel: 'Claim',
              header: () => <DashboardHeader />,
            }}></Tab.Screen>
          <Tab.Screen
            name="Document"
            component={Document}
            options={{
              tabBarLabel: 'Document',
              header: () => <DashboardHeader />,
            }}></Tab.Screen>
        </Tab.Navigator>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 80,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo_name: {
    color: '#000',
    fontSize: 20,
    fontWeight: '700',
    textAlignVertical: 'center',
    paddingTop: 10,
  },
  top_container: {
    flex: 0.7,
    backgroundColor: '#374a72',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingLeft:'40%'
    //#374a72
  },
  usertxt: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    alignContent: 'center',
    textAlign: 'center',
  },
  userInfo: {
    flexDirection: 'row',
  },
  wlcm: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    flexWrap: 'wrap',
  },
  lable: {
    fontWeight: '700',
    color: '#fff',
    fontSize: 16,
  },
});
