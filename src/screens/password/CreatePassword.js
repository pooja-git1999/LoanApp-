import {View, Text, TextInput, Alert, StyleSheet, Image} from 'react-native';
import React, {useEffect} from 'react';
import {useState} from 'react';
import Icons from 'react-native-vector-icons/dist/Entypo';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Btn from '../../component/Btn';
import LogIn from '../login/LoginStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
const CreatePassword = ({navigation, route}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setshowPassword] = useState(true);
  const [CnPassword, setCnPassword] = useState();
  const [showCnPassword, setShowCnPassword] = useState(true);
  const {mobile} = route.params;

  const PasswordGenerater = async () => {
    if (password === '' || CnPassword === '') {
      Alert.alert('Please Enter Password');
    } else if (password.length < 3) {
      Alert.alert('Password should be at least 3 characters long');
    } else {
      if (password !== CnPassword) {
        Alert.alert('Password not Matched');
      } else {
        const apidata = {
          eventID: '1001',
          addInfo: {
            UserId: mobile,
            NewPassword: password,
          },
        };
        // console.log(apidata,'apidata')
        try {
          const url = 'http://192.168.33.157:5385/createPassword';
          const result = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(apidata),
          });
          const data = await result.json();
          console.log('Response from server:', data);
          if (
            data.rData.rMessage == 'Password created and updated successfully'
          ) {
            navigation.navigate('Password', {mobile: mobile});
          }
        } catch (error) {
          console.log('Error', error);
          console.log('error in api calling -------------from createpassword');
        }
      }
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
        <Icons
          name="chevron-thin-left"
          size={20}
          color="#fff"
          style={{position: 'absolute', top: 52, left: 10}}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={LogIn.heading}>Create Password</Text>
        <Text style={LogIn.para}>Create your password</Text>
      </View>
      <View style={LogIn.main}>
        <Text style={LogIn.lable}>Create Password</Text>
        <View style={Passwordstyles.input}>
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
            placeholder="Create Password"
            secureTextEntry={showPassword}
            onChangeText={text => {
              setPassword(text);
            }}
            value={password}
            maxLength={6}
          />
        </View>
        <Text style={LogIn.lable}>Confirm Password</Text>
        <View style={Passwordstyles.input}>
          {showCnPassword ? (
            <Icons
              name="eye-with-line"
              size={22}
              color="#bebebe"
              style={{position: 'absolute', bottom: '20%', right: 10}}
              onPress={() => setShowCnPassword(!showCnPassword)}
            />
          ) : (
            <Icons
              name="eye"
              size={22}
              color="#bebebe"
              style={{position: 'absolute', right: 10, bottom: '20%'}}
              onPress={() => setShowCnPassword(!showCnPassword)}
            />
          )}
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry={showCnPassword}
            onChangeText={text => {
              setCnPassword(text);
            }}
            value={CnPassword}
            maxLength={6}
          />
        </View>
        <Btn btn_name={'DONE'} onPress={PasswordGenerater} />
      </View>
    </View>
  );
};
const Passwordstyles = StyleSheet.create({
  input: {
    width: '85%',
    marginTop: 10,
    height: 45,
    paddingLeft: 25,
    paddingRight: 30,
    fontWeight: '500',
    fontSize: 15,
    borderRadius: 10,
    backgroundColor: '#ededed',
    alignSelf: 'center',
    marginBottom: 30,
  },
  form_container: {
    marginTop: 60,
  },
  logo: {
    height: 50,
    width: 50,
    alignSelf: 'center',
  },
  logotxt: {
    color: '#000',
    fontWeight: '600',
    textAlignVertical: 'center',
    fontSize: 20,
    textAlign: 'center',
  },
});
export default CreatePassword;
