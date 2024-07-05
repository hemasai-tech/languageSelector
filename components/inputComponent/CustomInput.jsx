import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

const CustomInput = ({ placeholder, value, onChangeText }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType="phone-pad"
    />
  )
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 0.5,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor:'#F6F5F5',
    color:'#000000'
  },
})

export default CustomInput
