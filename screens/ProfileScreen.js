import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import AndroidStyles from "../styles/AndroidStyles";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../AuthReducer";
import colors from "../utils/colors";
import { Entypo } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";


const ProfileScreen = () => {
  // const [userData, setUserData] = useState(null)
  // console.log(userData)
  const navigation = useNavigation();

  const [userCred, setUserCred] = useState(null);

  // const userData = useSelector((state) => state.auth.auth);
  // const user = userData[0];
  const dispatch = useDispatch();

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const fetchProducts = async () => {
  //   const colRef = doc(db, "users", auth.currentUser.uid);
  //   const docSnap = await getDoc(colRef);
  //   if (docSnap.exists()) {
  //     dispatch(setAuth(docSnap.data()));
  //     console.log(docSnap.data())
  //     setUserCred(docSnap.data())
  //   } else {
  //     // docSnap.data() will be undefined in this case
  //     console.log("No such document!");
  //   }
  // };

  // useEffect(() => {
  //   fetchProducts();

  // }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchOrders = async () => {
        try {
          const userUid = auth.currentUser.uid;
          const docRef = doc(db, "users", userUid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserCred(docSnap.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.log("Error fetching orders:", error);
        }
      };

      fetchOrders();
    }, [])
  );

  return (
    <SafeAreaView style={[AndroidStyles.AndroidSafeArea]}>
      <ScrollView style={styles.container}>
        <Text style={styles.screenTitle}>Welcome, {userCred?.username}</Text>
        <View style={styles.userContainer}>
          <View style={styles.profileContainer}>
            <FontAwesome name="user" size={50} color="white" />
          </View>
          <View>
            <Text style={styles.textName}>{userCred?.fullname}</Text>
            <Text style={{ color: colors.gray, fontWeight: "bold" }}>
              CUSTOMER ID
            </Text>
            <Text>{auth.currentUser.uid.slice(0, 12).toUpperCase()}</Text>
          </View>
        </View>
        <View>
          <View
            style={{
              paddingHorizontal: 19,
              backgroundColor: colors.greenOld,
              paddingVertical: 4,
              width: 100,
              alignItems: "center",
              borderRadius: 10,
              marginBottom: 12,
            }}
          >
            <Text
              style={{ color: colors.white, fontSize: 13, fontWeight: "700" }}
            >
              Address
            </Text>
          </View>
          <View style={styles.addressContainer}>
            {userCred?.city && userCred?.street && userCred?.province ? (
              <View>
                <Text style={styles.streetText}>{userCred?.street}</Text>
                <Text style={styles.cityText}>
                  {userCred?.city}, {userCred?.province}
                </Text>
              </View>
            ) : (
              <View>
                <Text style={styles.streetText}>Add your address</Text>
              </View>
            )}
            <TouchableOpacity onPress={() => navigation.navigate("Address")}>
              <Entypo name="chevron-right" size={40} color={colors.gray} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.signOut} onPress={signOutUser}>
          <Text style={{ color: "white", fontWeight: "700" }}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  screenTitle: {
    fontSize: 34,
    color: colors.greenOld,
    fontWeight: "700",
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
});
