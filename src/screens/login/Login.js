import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Alert, StyleSheet, Image} from 'react-native';
import LogIn from './LoginStyle';
import validator from 'validator';
import Btn from '../../component/Btn';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = props => {
  const [error, setError] = useState('');
  const [mobile, setMobile] = useState('');

  const checkMobile = async () => {
    try {
      const apidata = {
        eventID: '1002',
        addInfo: {
          UserId: mobile,
        },
      };
      const url = 'http://192.168.33.157:5385/login';

      const result = await fetch(url, {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apidata),
      });
      const data = await result.json();
      // console.log(data);
      if (data.rData.rCode === 0) {
        console.log('User Password Found');
        props.navigation.navigate('Password', {mobile});
      } else if (data.rData.rCode === 1) {
        GeneraterOtp();
        props.navigation.navigate('Otp', {mobile: mobile});
        console.log(mobile, '--------------mobile from login');
      } else if (data.rData.rCode === 2) {
        Alert.alert('Unauthorize User');
      }
      setMobile('');
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  const openMobile = text => {
    if (validator.isMobilePhone(text)) {
      setError('');
    } else {
      setError('Please enter a Mobile.');
    }
    setMobile(text);
  };

  const GeneraterOtp = async () => {
    
      const apidata = {
        eventID: '1001',
        addInfo: {
          UserId: mobile,
          U_PASSCODE: '',
        },
      };
      try {
        const url = 'http://192.168.33.157:5385/login';
        const result = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(apidata),
        });
        const data = await result.json();
        console.log('Response from server:', data);
        if (data.rData.rCode === 2) {
          // console.log('data.rData.rCode', data.rData.rCode)
          // navigation.navigate('createPassword', { mobile: mobile })
        }
      } catch (error) {
        console.log('Error', error);
        console.log('error in api calling -------------from createpassword');
      }
    
  };

  return (
    <View style={{flex: 1, backgroundColor: '#374a72'}}>
      <View style={LogIn.logo}>
        <Image
          source={require('../../assets/AGI.png')}
          style={{height: 50, width: '80%', resizeMode: 'contain'}}
        />
      </View>
      <View style={LogIn.head}>
        {/* Your header content goes here */}
        <Text style={LogIn.heading}>Login</Text>
        <Text style={LogIn.para}>Please Sign in to continue</Text>
      </View>
      <View style={LogIn.main}>
        <View style={LogIn.detail}>
          {/* User details or other information */}
          <Text style={LogIn.lable}>Mobile no.</Text>
          <TextInput
            placeholder="Enter Your Mobile no."
            value={mobile}
            onChangeText={openMobile}
            style={LogIn.input}
            keyboardType="numeric"
            maxLength={10}
          />
          <Text style={{color: '#000', paddingLeft: 25}}>{error}</Text>
        </View>

        <Btn btn_name={'Login'} onPress={checkMobile} />
      </View>
    </View>
  );
};

export default Login;
