import React, { useState } from 'react';
import { TextInput, StyleSheet, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const PasswordInput = ({placeholder,password, setPassword}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevVisible) => !prevVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          secureTextEntry={!isPasswordVisible}
          style={styles.textInput}
          placeholder={placeholder}
          value={password}
          onChangeText={(text) => {
            setPassword(text)
          }}

        />
      </View>
      <TouchableOpacity style={styles.iconContainer} onPress={togglePasswordVisibility}>
        <MaterialCommunityIcons
          name={isPasswordVisible ? 'eye-off' : 'eye'}
          size={24}
          color="#888"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
  },
  textInput: {
    backgroundColor: "#EDEDED",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#EDEDED",
  },
  iconContainer: {
    marginLeft: 10,
  },
});

export default PasswordInput;
