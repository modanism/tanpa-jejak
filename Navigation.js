import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Login from './screens/login';
import Register from './screens/register';
import Home from './screens/home';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='Login' component={Login} options={{headerShown: false}} />
            <Stack.Screen name='Register' component={Register} options={{headerShown: false}}/>
            <Stack.Screen name='Home' component={Home} options={{headerShown: false}}/>

        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})