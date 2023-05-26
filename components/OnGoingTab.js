import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    Image,
  } from "react-native";
  import React, { useEffect } from "react";
  import AndroidStyles from "../styles/AndroidStyles";
  import { Pressable } from "react-native";
  import { useDispatch, useSelector } from "react-redux";
  import {
    cleanCart,
    decrementQuantity,
    incrementQuantity,
    emptyQuantity,
  } from "../CartReducer";
  import { decrementQty, incrementQty, emptyQty } from "../ProductReducer";
  import { useNavigation } from "@react-navigation/native";
  import { doc, getDoc, setDoc } from "firebase/firestore";
  import { auth, db } from "../firebase";
  import colors from "../utils/colors";
  import { Ionicons, Fontisto } from "@expo/vector-icons";
import { setAuth } from "../AuthReducer";
  
  const OnGoingTab = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const cart = useSelector((state) => state.cart.cart);
    const product = useSelector((state) => state.product.product);
  
    const total = cart
      .map((item) => item.quantity * item.price)
      .reduce((curr, prev) => curr + prev, 0);
  
    const userUid = auth.currentUser.uid;
  
    const formatter = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "IDR",
    });

    const fetchProducts = async () => {
      const colRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(colRef);
      if (docSnap.exists()) {
        dispatch(setAuth(docSnap.data()));
        console.log(docSnap.data().orders)
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    };
  
    useEffect(() => {
      fetchProducts();
    }, []);
  
    return (
      <SafeAreaView style={AndroidStyles.AndroidSafeArea}>
        <ScrollView>
          <View
            style={{
              borderRadius: 12,
              margin: 10,
              padding: 10,
              backgroundColor: colors.white,
              gap: 15,
            }}
          >
            {cart.map((item, index) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 15,
                  backgroundColor: colors.white,
                  borderRadius: 15,
                }}
                key={index}
              >
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.innerContainer}>
                  <View style={styles.nameContainer}>
                    <Text style={styles.foodName}>{item.name}</Text>
                    <Text style={styles.foodPrice}>
                      {formatter.format(item.price)}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.foodQuantity}>x{item.quantity}</Text>
                  </View>
                </View>
              </View>
            ))}
            <Text style={styles.totalPrice}>{formatter.format(total)}</Text>
          </View>
        </ScrollView>

      </SafeAreaView>
    );
  };
  
  export default OnGoingTab;
  
  const styles = StyleSheet.create({
    screenTitle: {
      fontSize: 34,
      color: colors.greenOld,
      fontWeight: "700",
    },
    image: {
      width: 40,
      height: 40,
      borderRadius: 10,
      resizeMode: "contain",
    },
    innerContainer: {
      flexDirection: "column",
      justifyContent: "space-between",
      width: 295,
    },
    dataContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    nameContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    foodName: {
      fontSize: 15,
      fontWeight: "700",
      color: colors.blackYoung,
    },
    foodPrice: {
      fontSize: 12,
      fontWeight: "700",
      color: colors.blackYoung,
    },
    foodQuantity: {
      fontSize: 13,
      color: colors.gray,
    },
    totalPrice: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.greenOld,
      textAlign: "right",
      marginBottom: 10,
    },
    paymentMethod: {
      fontSize: 15,
      fontWeight: "bold",
      color: colors.blackYoung,
    },
    discount: {
      fontSize: 13,
      color: colors.gray,
    },
  });
  