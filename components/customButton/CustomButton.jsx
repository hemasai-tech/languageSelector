import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
})

export default CustomButton
