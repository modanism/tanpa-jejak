import * as React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import AndroidStyles from "../styles/AndroidStyles";
import colors from "../utils/colors";
import OnGoingTab from "../components/OnGoingTab";
import HistoryTab from "../components/HistoryTab";

const FirstRoute = () => (
  <OnGoingTab />
);

const SecondRoute = () => (
  <HistoryTab />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function ActivityScreen() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "On Going" },
    { key: "second", title: "History" },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: colors.greenOld }}
      style={{ backgroundColor: "#F5F5F5", color: colors.greenOld }}
      renderLabel={({ route }) => (
        <Text
          style={{ color: colors.greenOld, fontSize: 17, fontWeight: "600" }}
        >
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <SafeAreaView style={AndroidStyles.AndroidSafeArea}>
      <View style={{paddingHorizontal:30,paddingTop:40}}>
        <Text style={styles.screenTitle}>My Activity</Text>

      </View>
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenTitle: {
    fontSize: 34,
    color: colors.greenOld,
    fontWeight: "700",
    marginBottom: 20,
  },
});
