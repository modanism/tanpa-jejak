import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  Pressable,
  Image,
  TextInput,
  Platform,
  StatusBar,
  Button,
  ScrollView,
} from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import AndroidStyles from "../styles/AndroidStyles";
import * as Location from "expo-location";
import { useEffect } from "react";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Services from "../components/Services";
import Item from "../components/Item";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../ProductReducer";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import { FAB } from "react-native-paper";
import colors from "../utils/colors";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import FoodCard from "../components/FoodCard";
import FoodCardDetail from "../components/FoodCardDetail";

const HomeScreen = () => {
  const [items, setItems] = useState([]);
  const [foodModalData, setFoodModalData] = useState(null);

  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  const navigation = useNavigation();

  const [displayCurrentAddress, setdisplayCurrentAddress] = useState(
    "Loading your location"
  );
  const [locationServicesEnabled, setlocationServicesEnabled] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      checkIfLocationEnabled();
      getCurrentLocation();
    } else {
      navigation.navigate("Login");
    }
  }, []);

  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Location not enabled",
        "Please enable your location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    } else {
      setlocationServicesEnabled(enabled);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestBackgroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Allow the app to use the locationn services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    }

    const { coords } = await Location.getCurrentPositionAsync();
    // console.log(coords);

    if (coords) {
      const { latitude, longitude } = coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      // console.log(response);

      for (let item of response) {
        let address = `${item.city}, ${item.district}, ${item.region}`;
        setdisplayCurrentAddress(address);
      }
    }
  };

  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();
  useEffect(() => {
    if (product.length > 0) return;
    const fetchProducts = async () => {
      // services.map((service) => dispatch(getProducts(service)));
      const colRef = collection(db, "types");
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach((doc) => {
        items.push(doc.data());
      });
      items?.map((service) => dispatch(getProducts(service)));
    };
    fetchProducts();
  }, []);

  // console.log(product);
  // const services = [
  //   {
  //     id: "0",
  //     image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
  //     name: "shirt",
  //     quantity: 0,
  //     price: 10,
  //   },
  //   {
  //     id: "11",
  //     image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
  //     name: "T-shirt",
  //     quantity: 0,
  //     price: 10,
  //   },
  //   {
  //     id: "12",
  //     image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
  //     name: "dresses",
  //     quantity: 0,
  //     price: 10,
  //   },
  //   {
  //     id: "13",
  //     image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
  //     name: "jeans",
  //     quantity: 0,
  //     price: 10,
  //   },
  //   {
  //     id: "14",
  //     image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
  //     name: "Sweater",
  //     quantity: 0,
  //     price: 10,
  //   },
  //   {
  //     id: "15",
  //     image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
  //     name: "shorts",
  //     quantity: 0,
  //     price: 10,
  //   },
  //   {
  //     id: "16",
  //     image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
  //     name: "Sleeveless",
  //     quantity: 0,
  //     price: 10,
  //   },
  // ];

  // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  //{ flex: 1, backgroundColor: "#F0F0F0" }

  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["60%", "60%"], []);

  const openModal = useCallback((item) => {
    setFoodModalData(item);
    setIsModalVisible(true);
    bottomSheetModalRef.current?.present();
  });
  // const openModal = useCallback((item) => {
  //   const itemWithUpdatedQuantity = {
  //     ...item,
  //     quantity: cart.find((c) => c.id === item.id)?.quantity || 0
  //   };

  //   setFoodModalData(itemWithUpdatedQuantity);
  //   bottomSheetModalRef.current?.present();
  // }, [cart]);

  // callbacks

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCloseModal = () => {
    console.log("DONE");
    setIsModalVisible(false);
    console.log(isModalVisible);
  };

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={AndroidStyles.AndroidSafeArea}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
            paddingHorizontal: 10,
            gap: 8,
            marginBottom: 20,
          }}
        >
          <MaterialIcons name="location-on" size={35} color="#005555" />
          <View>
            <Text>Nearest Food Bank</Text>
            {/* <Text style={{ fontSize: 18, fontWeight: "700" }}>{displayCurrentAddress}</Text> */}
            <Text style={{ fontSize: 18, fontWeight: "700" }}>
              Tubagus Ismail XIV 25B
            </Text>
          </View>

          {/* <Pressable
              onPress={() => navigation.navigate("Profile")}
              style={{ marginLeft: "auto", marginRight: 7 }}
            >
              <Image
                style={{ width: 50, height: 50, borderRadius: 25 }}
                source={{
                  uri: "https://lh3.googleusercontent.com/ogw/AOLn63F35QJXsK0vWtuf-LxhR3UKfv8jwF018pNQ-hRVSw=s32-c-mo",
                }}
              />
            </Pressable> */}
        </View>
        <ScrollView style={{ paddingHorizontal: 15 }}>
          <Text
            style={{
              fontSize: 34,
              fontWeight: "bold",
              color: "#005555",
            }}
          >
            Explore
          </Text>
          <Text style={{ fontSize: 17, color: "#2D3130", marginBottom: 20 }}>
            What do you want to eat today?
          </Text>

          <View
            style={{
              backgroundColor: "#EDEDED",
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              borderRadius: 10,
              marginBottom: 20,
            }}
          >
            <Feather name="search" size={24} color="#C4C4C4" />
            <TextInput placeholder="Restaurant or dishes" />
          </View>

          {/* <Services/> */}
          <View style={{ padding: 10 }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "500",
                color: "#005555",
                fontWeight: "bold",
              }}
            >
              For You
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {product.map((item, index) => (
                <FoodCard
                  item={item}
                  key={index}
                  onPress={() => openModal(item)}
                />
              ))}
            </ScrollView>
          </View>
        </ScrollView>

        <FAB
          icon="cart"
          color="white"
          style={styles.fab}
          onPress={() => navigation.navigate("Cart")}
        />
      </SafeAreaView>
      {isModalVisible && (
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          enablePanDownToClose={true}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backgroundStyle={{
            backgroundColor: "#F6F6F6",
          }}
        >
          <FoodCardDetail
            foodModalData={foodModalData}
            onCloseModal={handleCloseModal}
            isVisible={isModalVisible}
          />
        </BottomSheetModal>
      )}
    </BottomSheetModalProvider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    backgroundColor: colors.greenNormal,
    borderRadius: "50%",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
