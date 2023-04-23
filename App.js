import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigation';
import { useFonts } from 'expo-font';

export default function App() {

  const [fontsLoaded] = useFonts({
    'SF-Pro': require('./assets/fonts/HelveticaNeueInterface.ttf'),
  });

  console.log('Fonts loaded?', fontsLoaded);


  if (!fontsLoaded) {
    console.log("Error: fonts not loaded")
    return null;
  }



  return (
    <Navigation />

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
