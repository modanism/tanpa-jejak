import { Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AndroidStyles from '../../styles/AndroidStyles'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import { AntDesign } from '@expo/vector-icons';


const Register = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={[AndroidStyles.AndroidSafeArea]}>
      <Pressable style={{marginStart:24,width:32, marginBottom:25}} onPress={() => navigation.goBack()}>
        <AntDesign name="left" size={32} color="#005555" />
      </Pressable>
      <View style={styles.container}>
        <Text style={{fontWeight: "bold", fontSize: 34, color: "#005555",marginBottom: 10}}>Create your{"\n"}account</Text>
        <View style={styles.formContainer}>
          <TextInput style={styles.textInput} placeholder='Full Name'/>
          <TextInput style={styles.textInput} placeholder='Username'/>
          <TextInput style={styles.textInput} placeholder='Email'/>
          <TextInput style={styles.textInput} placeholder='Password'/>
          <TextInput style={styles.textInput} placeholder='Confirm Password'/>
          <TextInput style={styles.textInput} placeholder='Phone Number'/>
          <TextInput style={styles.textInput} placeholder='Gender'/>
        </View>
        <CustomButton text={"Register"} isFullWidth={false}/>
        <View style={{flexDirection: "row", justifyContent: 'center'}}>
            <Text style={{textAlign: "center", fontSize:16}}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={{color: '#069A8E',fontSize:16}}> Login</Text>
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Register

const styles = StyleSheet.create({
  container : {
    flex: 1,
    gap: 25,
    paddingHorizontal: 32
  },
  formContainer : {
    flex: 1,
    gap: 18
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