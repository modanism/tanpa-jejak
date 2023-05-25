import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AndroidStyles from '../styles/AndroidStyles'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'

const ProfileScreen = () => {

    const navigation = useNavigation();
    const user = auth.currentUser
    const signOutUser = () => {
        signOut(auth).then(() => {
            navigation.replace("Login")
        }).catch(err => {
            console.log(err)
        })
    }

  return (
    <SafeAreaView style={[AndroidStyles.AndroidSafeArea, {flex:1,justifyContent:"center",alignItems:"center"}]}>
      <Pressable style={{marginVertical:10}}>
        <Text>Welcome {user.email}</Text>
      </Pressable>
      <Pressable onPress={signOutUser}>
        <Text>Sign Out</Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})