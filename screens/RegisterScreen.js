import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import {} from "react-native";
import AndroidStyles from "../styles/AndroidStyles";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigation = useNavigation();

  const register = () => {
    if (email === "" || password === "" || phone === "") {
      Alert.alert(
        "Invalid Details",
        "Please fill all the details",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    } else {
      createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          console.log("user credential", userCredential);
          const user = userCredential._tokenResponse.email;
          const myUserUid = auth.currentUser.uid;

          setDoc(doc(db, "users", `${myUserUid}`), {
            email: user,
            phone: phone,
          });
        }
      );
    }
  };
  return (
    <SafeAreaView style={[AndroidStyles.AndroidSafeArea]}>
      <Pressable
        style={{ marginStart: 24, width: 32, marginBottom: 25 }}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="left" size={32} color="#005555" />
      </Pressable>
      <View style={styles.container}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 34,
            color: "#005555",
            marginBottom: 10,
          }}
        >
          Create your{"\n"}account
        </Text>
        <View style={styles.formContainer}>
          <TextInput style={styles.textInput} placeholder="Full Name" />
          <TextInput style={styles.textInput} placeholder="Username" />
          <TextInput style={styles.textInput} placeholder="Email" />
          <TextInput style={styles.textInput} placeholder="Password" />
          <TextInput style={styles.textInput} placeholder="Confirm Password" />
          <TextInput style={styles.textInput} placeholder="Phone Number" />
          <TextInput style={styles.textInput} placeholder="Gender" />
        </View>
        <Pressable
          onPress={register}
          style={{
            width: 300,
            backgroundColor: "#069A8E",
            padding: 15,
            borderRadius: 8,
            marginTop: 50,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              color: "white",
            }}
          >
            Register
          </Text>
        </Pressable>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={{ textAlign: "center", fontSize: 16 }}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: "#069A8E", fontSize: 16 }}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );

  // return (
  //   <SafeAreaView
  //     style={[
  //       AndroidStyles.AndroidSafeArea,
  //       {
  //         flex: 1,
  //         backgroundColor: "white",
  //         alignItems: "center",
  //         padding: 10,
  //       },
  //     ]}
  //   >
  //     <KeyboardAvoidingView>
  //       <View
  //         style={{
  //           justifyContent: "center",
  //           alignItems: "center",
  //           marginTop: 100,
  //         }}
  //       >
  //         <Text style={{ fontSize: 20, color: "#662d91", fontWeight: "bold" }}>
  //           Register
  //         </Text>
  //         <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>
  //           Create a new account
  //         </Text>
  //       </View>
  //       <View style={{ marginTop: 50 }}>
  //         <TextInput
  //           placeholder="Email"
  //           value={email}
  //           onChangeText={(text) => setEmail(text)}
  //           style={{
  //             fontSize: email ? 18 : 18,
  //             borderBottomWidth: 1,
  //             borderBottomColor: "gray",
  //             width: 300,
  //             marginVertical: 10,
  //           }}
  //         />
  //         <TextInput
  //           placeholder="Password"
  //           value={password}
  //           secureTextEntry={true}
  //           onChangeText={(text) => setPassword(text)}
  //           style={{
  //             fontSize: password ? 18 : 18,
  //             borderBottomWidth: 1,
  //             borderBottomColor: "gray",
  //             width: 300,
  //             marginVertical: 10,
  //           }}
  //         />
  //         <TextInput
  //           placeholder="Phone No."
  //           value={phone}
  //           onChangeText={(text) => setPhone(text)}
  //           style={{
  //             fontSize: phone ? 18 : 18,
  //             borderBottomWidth: 1,
  //             borderBottomColor: "gray",
  //             width: 300,
  //             marginVertical: 10,
  //           }}
  //         />
  //         <Pressable
  //           onPress={register}
  //           style={{
  //             width: 200,
  //             backgroundColor: "#318ce7",
  //             padding: 15,
  //             borderRadius: 8,
  //             marginTop: 50,
  //             marginLeft: "auto",
  //             marginRight: "auto",
  //           }}
  //         >
  //           <Text
  //             style={{
  //               fontSize: 18,
  //               textAlign: "center",
  //               color: "white",
  //             }}
  //           >
  //             Sign Up
  //           </Text>
  //         </Pressable>
  //         <Pressable
  //           onPress={() => navigation.goBack()}
  //           style={{
  //             marginTop: 20,
  //           }}
  //         >
  //           <Text
  //             style={{
  //               textAlign: "center",
  //               fontSize: 17,
  //               color: "gray",
  //               fontWeight: "500",
  //             }}
  //           >
  //             Already have an account? Sign In
  //           </Text>
  //         </Pressable>
  //       </View>
  //     </KeyboardAvoidingView>
  //   </SafeAreaView>
  // );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 25,
    paddingHorizontal: 32,
  },
  formContainer: {
    flex: 1,
    gap: 18,
  },
  textInput: {
    backgroundColor: "#EDEDED",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#EDEDED",
  },
});
