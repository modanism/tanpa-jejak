import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

import HomeScreen from "../screens/HomeScreen";
import ActivityScreen from "../screens/ActivityScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "../utils/colors";

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={{tabBarStyle : {
        paddingVertical : 15,
        borderTopRightRadius : 20,
        borderTopLeftRadius: 20
    }}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation, route }) => {
          const isFocused = navigation.isFocused();
          return {
            headerShown: false,
            tabBarShowLabel: false,

            tabBarIcon: ({ focused }) => (
              <Entypo
                name="home"
                size={36}
                color={focused ? colors.greenNormal : colors.gray}
              />
            ),
          };
        }}
      />
      <Tab.Screen
        name="Activity"
        component={ActivityScreen}
        options={({ navigation, route }) => {
          const isFocused = navigation.isFocused();
          return {
            headerShown: false,
            tabBarShowLabel: false,

            tabBarIcon: ({ focused }) => (
              <Entypo
                name="text-document-inverted"
                size={30}
                color={focused ? colors.greenNormal : colors.gray}
              />
            ),
          };
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation, route }) => {
          const isFocused = navigation.isFocused();
          return {
            headerShown: false,
            tabBarShowLabel: false,

            tabBarIcon: ({ focused }) => (
              <FontAwesome5
                name="user-alt"
                size={30}
                color={focused ? colors.greenNormal : colors.gray}
              />
            ),
          };
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
