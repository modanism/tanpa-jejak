import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({text, isFullWidth}) => {
  return (
    <TouchableOpacity style={isFullWidth ? styles.button : [styles.button,{marginHorizontal: 20}]}>
      <Text style={styles.textButton}>{text}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    button : {
        backgroundColor: "#069A8E",
        paddingVertical: 14,
        borderRadius: 10
    },
    textButton : {
        textAlign:"center",
        color: 'white',
        fontSize: 17,
        fontWeight: 600
    },
})