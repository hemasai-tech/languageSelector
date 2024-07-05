import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ToastAndroid, Alert, BackHandler } from 'react-native';
import CustomInput from './inputComponent/CustomInput';
import CustomButton from './customButton/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

const Login = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const [mobileNumber, setMobileNumber] = useState('');

  const getLogin = async () => {
    let login = await AsyncStorage.getItem('user');
    if (login) {
      navigation.navigate('Home');
    } else {
      navigation.navigate('Login');
    }
  };
  useEffect(() => {
    const backAction = () => {
      Alert.alert(t('hold_on'), t('exit_prompt'), [
        {
          text: t('cancel'),
          onPress: () => null,
          style: 'cancel',
        },
        { text: t('yes'), onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [t]);
  useEffect(() => {
    getLogin();
  }, []);

  const handleLoginPress = async () => {
    if (mobileNumber === '') {
      ToastAndroid.show(t('please_enter_mobile_number'), ToastAndroid.SHORT);
      return;
    } else {
      await AsyncStorage.setItem('user', mobileNumber);
      navigation.navigate('OtpScreen');
    }
  };

  return (
    <View style={styles.container}>
      <CustomInput
        placeholder={t('enter_mobile_number')}
        value={mobileNumber}
        onChangeText={setMobileNumber}
      />
      <CustomButton title={t('login')} onPress={handleLoginPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});

export default Login;
