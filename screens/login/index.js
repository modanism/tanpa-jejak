import { ImageBackground, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from "@react-navigation/native";
import CustomButton from '../../components/CustomButton';



const Login = () => {

    const [focusedInput, setFocusedInput] = useState(null);
    const navigation = useNavigation()


    const inputBorderColor = (inputName) => focusedInput === inputName ? '#A1E3D8' : '#EDEDED';

  return (
    <ImageBackground source={require('../../assets/images/bg-login.png')} style={styles.backgroundImage}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''}>
            <SafeAreaView style={styles.formContainer}>
                <Text style={{fontWeight: "bold", fontSize: 34, color: "#005555",marginBottom: 10}}>Welcome back!</Text>
                <TextInput style={[styles.textInput, {borderColor : inputBorderColor('email')}]} onFocus={() => setFocusedInput('email')} onBlur={() => setFocusedInput(null)} placeholder='Email'/>
                <TextInput style={[styles.textInput, {borderColor : inputBorderColor('password'),marginBottom:40}]} secureTextEntry={true} onFocus={() => setFocusedInput('password')} onBlur={() => setFocusedInput(null)} placeholder='Password'/>
                <CustomButton text={"Login"} isFullWidth={false}/>
                <View style={{flexDirection: "row", justifyContent: 'center'}}>
                    <Text style={{textAlign: "center", fontSize:16}}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                        <Text style={{color: '#069A8E',fontSize:16}}> Register</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    </ImageBackground>
  )
}

export default Login

const styles = StyleSheet.create({
    container : {
        flex: 1,
    },
    formContainer : {
        backgroundColor: 'white',
        height: 500,
        justifyContent: 'space-evenly',
        borderTopStartRadius: 50,
        borderTopEndRadius: 50,
        paddingHorizontal: 35,
        paddingVertical: 70,
        fontFamily: 'SF-Pro',
        gap: 18

    },
    backgroundImage : {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-end'
    },
    loginButton : {
        backgroundColor: "#069A8E",
        paddingVertical: 14,
        borderRadius: 10,
        marginHorizontal: 20

    },
    textButton : {
        textAlign:"center",
        color: 'white',
        fontSize: 17,
        fontWeight: 600
    },
    textInput : {
        backgroundColor: '#EDEDED',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#EDEDED'
    }
})