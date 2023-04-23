import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Button = ({text, full}) => {
  return (
    <Pressable style={full ? {} : {marginVertical: 28}}>
      <Text>{text}</Text>
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({})