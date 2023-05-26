import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AndroidStyles from "../styles/AndroidStyles";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../AuthReducer";
import colors from "../utils/colors";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const AddressScreen = () => {
  // const [userData, setUserData] = useState(null)
  // console.log(userData)

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");

  const navigation = useNavigation();

  const userData = useSelector((state) => state.auth.auth);
  const user = userData[0];

  const dispatch = useDispatch();

  const userUid = auth.currentUser.uid;

  const editAddress = async () => {
    navigation.navigate("Profile");
    dispatch(
      setAuth({
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        street: street,
        city: city,
        province: province,
      })
    );
    await setDoc(
      doc(db, "users", `${userUid}`),
      {
        street: street,
        city: city,
        province: province,
      },
      {
        merge: true,
      }
    );
  };

  //   useEffect(() => {
  //     const fetchProducts = async () => {
  //       // services.map((service) => dispatch(getProducts(service)));
  //       const colRef = doc(db, "users", auth.currentUser.uid);
  //       const docSnap = await getDoc(colRef);
  //       if (docSnap.exists()) {
  //         dispatch(setAuth(docSnap.data()));
  //       } else {
  //         // docSnap.data() will be undefined in this case
  //         console.log("No such document!");
  //       }
  //     };
  //     fetchProducts();
  //   }, []);

  return (
    <SafeAreaView style={[AndroidStyles.AndroidSafeArea]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={48} color={colors.greenOld} />
      </TouchableOpacity>
      <ScrollView style={styles.container}>
        <Text style={styles.screenTitle}>Edit your address</Text>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.addressInput}
            placeholder="Street"
            multiline={true}
            numberOfLines={5}
            value={street}
            onChangeText={(text) => setStreet(text)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="City"
            value={city}
            onChangeText={(text) => setCity(text)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Province"
            value={province}
            onChangeText={(text) => setProvince(text)}
          />
        </View>
        <TouchableOpacity
          onPress={editAddress}
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
              fontWeight: "600",
              textAlign: "center",
              color: "white",
            }}
          >
            Edit
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  screenTitle: {
    fontSize: 34,
    color: colors.greenOld,
    fontWeight: "700",
    marginBottom: 20,
  },
  userContainer: {
    marginVertical: 25,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profileContainer: {
    backgroundColor: colors.gray,
    padding: 10,
    width: 65,
    height: 65,
    alignItems: "center",
    borderRadius: 35,
  },
  textName: {
    fontSize: 13,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 5,
  },
  addressContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 17,
    paddingVertical: 12,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  streetText: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.blackYoung,
  },
  cityText: {
    fontSize: 13,
    color: colors.gray,
    fontWeight: "600",
  },
  signOut: {
    marginTop: 20,
    textAlign: "center",
    backgroundColor: colors.red,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    width: 100,
  },
  addressInput: {
    backgroundColor: "#EDEDED",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#EDEDED",
    height: 100,
  },
  textInput: {
    backgroundColor: "#EDEDED",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#EDEDED",
  },
  formContainer: {
    flex: 1,
    gap: 18,
  },
});
