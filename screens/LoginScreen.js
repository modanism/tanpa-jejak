import {
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { setAuth } from "../AuthReducer";

const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);

  const dispatch = useDispatch();


  const inputBorderColor = (inputName) =>
    focusedInput === inputName ? "#A1E3D8" : "#EDEDED";

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        setIsLoading(false);
      }

      if (authUser) {
        navigation.navigate("TabNavigator");
      }
    });

    return unsubscribe;
  }, []);

  const login = () => {
    console.log(email);
    console.log(password);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user detail", user.uid);
        // dispatch(setAuth(user))

        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode} : ${errorMessage}`);
      });
  };

  return (
    <ImageBackground
      source={require("../assets/images/bg-login.png")}
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
        {isLoading ? (
          <SafeAreaView style={styles.formContainer}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator size="large" color="blue" />
            </View>
          </SafeAreaView>
        ) : (
          <SafeAreaView style={styles.formContainer}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 34,
                color: "#005555",
                marginBottom: 10,
              }}
            >
              Welcome back!
            </Text>
            <TextInput
              style={[
                styles.textInput,
                { borderColor: inputBorderColor("email") },
              ]}
              onFocus={() => setFocusedInput("email")}
              onBlur={() => setFocusedInput(null)}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              secureTextEntry={true}
              style={[
                styles.textInput,
                { borderColor: inputBorderColor("password") },
              ]}
              onFocus={() => setFocusedInput("password")}
              onBlur={() => setFocusedInput(null)}
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />

            <TouchableOpacity
              onPress={login}
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
                Login
              </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text style={{ textAlign: "center", fontSize: 16 }}>
                Don't have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={{ color: "#069A8E", fontSize: 16 }}>
                  {" "}
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    backgroundColor: "white",
    height: 500,
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    paddingHorizontal: 35,
    gap: 18,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  loginButton: {
    backgroundColor: "#069A8E",
    paddingVertical: 14,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  textButton: {
    textAlign: "center",
    color: "white",
    fontSize: 17,
    fontWeight: 600,
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
