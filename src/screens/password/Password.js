import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Alert, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LogIn from '../login/LoginStyle';
import validator from 'validator';
import Btn from '../../component/Btn';
import Icons from 'react-native-vector-icons/dist/Entypo';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Password = ({navigation, route}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setshowPassword] = useState(true);
  const {mobile} = route.params;

  const getapidata = async () => {
    if (password === '') {
      Alert.alert('Please Enter Your Password');
    } else if (password.length < 3) {
      Alert.alert('Password should be at least 3 characters long');
    } else {
      try {
        const apidata = {
          eventID: '1001',
          addInfo: {
            UserId: mobile,
            U_PASSCODE: password,
            guid: '4C4C4544-004A-5910-8034-C2C04F4E4D33',
          },
        };

        const url = 'http://192.168.33.157:5385/login';
        const result = await fetch(url, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(apidata),
        });
        const data = await result.json();

        if (data.rData.rMessage === 'Login Successfully') {
          await AsyncStorage.setItem('auth_token', data.rData.Token);
          if (data.rData.id !== undefined) {
            await AsyncStorage.setItem('Id', data.rData.id.toString());
          }
          navigation.navigate('MyTabs');
        } else if (data.rData.rCode === 1) {
          Alert.alert('Wrong Password');
        } else if (data.rData.rCode === 2) {
          // console.log(data.rData)
          navigation.navigate('Otp', {mobile: mobile});
        }
      } catch (error) {
        console.log(error);
        console.log('error in api calling----------password');
      }
    }
    setPassword('');
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
        <Icons
          name="chevron-thin-left"
          size={20}
          color="#fff"
          style={{position: 'absolute', top: 55, left: 8}}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={LogIn.heading}>Password</Text>
        <Text style={[LogIn.para, {paddingBottom: 20, marginBottom: 20}]}>
          Please enter your password
        </Text>
      </View>
      <View style={LogIn.main}>
        <View style={LogIn.detail}>
          {/* User details or other information */}
          <Text style={LogIn.lable}>Enter Password</Text>
          <View style={LogIn.input}>
            {showPassword ? (
              <Icons
                name="eye-with-line"
                size={22}
                color="#bebebe"
                style={{position: 'absolute', bottom: '20%', right: 10}}
                onPress={() => setshowPassword(!showPassword)}
              />
            ) : (
              <Icons
                name="eye"
                size={22}
                color="#bebebe"
                style={{position: 'absolute', right: 10, bottom: '20%'}}
                onPress={() => setshowPassword(!showPassword)}
              />
            )}

            <TextInput
              placeholder="Enter Password"
              secureTextEntry={showPassword}
              onChangeText={text => {
                setPassword(text);
              }}
              value={password}
              maxLength={6}
            />
          </View>
        </View>

        <Btn btn_name={'Done'} onPress={getapidata} />
      </View>
    </View>
  );
};

export default Password;
