import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Alert, StyleSheet, Image} from 'react-native';
import LogIn from '../login/LoginStyle';
import validator from 'validator';
import Icons from 'react-native-vector-icons/dist/Entypo';
import Btn from '../../component/Btn';
import {useIsFocused} from '@react-navigation/native';

export default function Otp({navigation, route}) {
  const isFocused = useIsFocused();
  const {mobile} = route.params;
  const [otp, setOtp] = useState();
  const [error, setError] = useState();

  const openOTP = text => {
    if (validator.isNumeric(text) && text.length === 6) {
      setError('');
    } else {
      setError('invalid OTP');
    }
    setOtp(text);
  };

  const GeneraterOtp = async () => {
    if (otp === '') {
      Alert.alert('Please Enter Your OTP');
    } else {
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
    }
  };

  //verify OTP
  const verifyOtp = async () => {
    console.log(otp, mobile);
    if (otp === '') {
      Alert.alert('Please Enter Your OTP');
    } else {
      try {
        const apidata = {
          eventID: '1001',
          addInfo: {
            Mobile_no: mobile,
            OTP: otp,
          },
        };
        const url = 'http://192.168.33.157:5385/otpVerify';
        const result = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(apidata),
        });
        const data = await result.json();
        // console.log('Response from server:', data);
        if (data.rData.rMessage == 'OTP Valid  Only for 10 min') {
          navigation.navigate('createPassword', {mobile: mobile});
        } else if (data.rData.rCode === 1) {
          Alert.alert('Invalid OTP');
        }
      } catch (error) {
        console.log('Error', error);
        console.log('error in api calling -------------from createpassword');
      }
    }
  };

  // useEffect(() => {
  //   GeneraterOtp();
  // }, [isFocused]);
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
        <Icons
          name="chevron-thin-left"
          size={20}
          color="#fff"
          style={{position: 'absolute', top: 52, left: 10}}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={LogIn.heading}>OTP</Text>
        <Text style={LogIn.para}>Please Enter your OTP</Text>
      </View>
      <View style={LogIn.main}>
        <View style={LogIn.detail}>
          {/* User details or other information */}
          <Text style={LogIn.lable}>Enter OTP</Text>
          <TextInput
            placeholder="Enter Your OTP"
            value={otp}
            onChangeText={openOTP}
            style={LogIn.input}
            keyboardType="numeric"
            maxLength={6}
          />
          <Text style={{color: '#000', paddingLeft: 35}}>{error}</Text>
        </View>

        <Btn btn_name={'Verify OTP'} onPress={verifyOtp} />
        <Btn btn_name={'Resend OTP'} onPress={GeneraterOtp} />
      </View>
    </View>
  );
}
