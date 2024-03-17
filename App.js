import { View, Text, Image } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Login from './src/screens/login/Login';
import Password from './src/screens/password/Password';
import CreatePassword from './src/screens/password/CreatePassword';
import MyTabs from './MyTabs';
import FullScreenPdf from './src/screens/dashboard/FullScreenPdf';
import Otp from './src/screens/OTP/Otp';
const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator  initialRouteName='Login' screenOptions={{headerShown:false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name='Password' component={Password} />
        <Stack.Screen name='createPassword' component={CreatePassword}/>
        <Stack.Screen name='FullScreenPdf' component={FullScreenPdf}></Stack.Screen>
        <Stack.Screen name='MyTabs' component={MyTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App