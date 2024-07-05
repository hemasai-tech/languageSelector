import React, { useEffect, useState } from 'react'
import { View, TextInput, StyleSheet, Alert } from 'react-native'

const OtpScreen = (props) => {
  const { navigation } = props
  const [otp, setOtp] = useState(['', '', '', ''])
  const correctOtp = '1234'


/* This `useEffect` hook is used to subscribe to the blur event of the
navigation object. When the component loses focus, the callback function inside the
`useEffect` hook is triggered, which resets the OTP input fields to empty strings. */
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setOtp(['', '', '', '']);
    });

    return unsubscribe;
  }, [navigation]);

  /**
   * The `handleChange` function in a React component updates the OTP input values, shifts focus to the
   * next input field, and validates the OTP when all fields are filled.
   */
  const handleChange = (text, index) => {
    const newOtp = [...otp]
    newOtp[index] = text
    setOtp(newOtp)

    if (text && index < 3) {
      inputs[index + 1].focus()
    }

    if (newOtp.join('').length === 4) {
      validateOtp(newOtp.join(''))
    }
  }

  /**
   * The function `validateOtp` compares the input OTP with a correct OTP and displays a success message
   * if they match, or an error message if they do not match.
   */
  const validateOtp = (inputOtp) => {
    if (inputOtp === correctOtp) {
      navigation.navigate("Home")

    } else {
      Alert.alert('Error', 'OTP is incorrect, Please enter 1,2,3,4 as OTP')
    }
  }

  const inputs = []

  return (
    <View style={styles.container}>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpBox}
            maxLength={1}
            keyboardType="number-pad"
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            ref={(input) => inputs[index] = input}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
  },
  otpBox: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    textAlign: 'center',
    fontSize: 20,
  },
})

export default OtpScreen
