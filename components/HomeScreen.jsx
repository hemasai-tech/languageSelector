// src/components/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, BackHandler, Dimensions, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getApiCallRequest } from '../redux/actions';
import CustomButton from './customButton/CustomButton';

const { width, height } = Dimensions.get('screen')

const HomeScreen = (props) => {
  const { navigation } = props;

  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const { loading, data, error } = useSelector((state) => state);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    dispatch(getApiCallRequest());
  }, [dispatch]);

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

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setSelectedLanguage(lang);
  };

  const onLogout = () => {
    AsyncStorage.clear();
    navigation.replace("Login")
  }

  const renderColors = ({ item, index }) => {
    return (
      <View style={styles.colorView}>
        <View>
          <Image source={{ uri: item?.imageUrl }} style={styles.img} />
        </View>
        <View style={styles.hexTxt}>
          <Text style={[styles.hex, { color: `#${item.hex}` }]}>#{item.hex}</Text>
          <Text style={styles.hex}>
            {item.title}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.logOut}>
        <CustomButton title={t('log_out')} onPress={onLogout} />
      </View>
      <View style={styles.pickerView}>
        <Picker selectedValue={selectedLanguage} onValueChange={(itemValue) => changeLanguage(itemValue)}>
          <Picker.Item label={t('select_language')} value="en" />
          <Picker.Item label="English" value="en" />
          <Picker.Item label="తెలుగు" value="te" />
          <Picker.Item label="ಕನ್ನಡ" value="kn" />
        </Picker>
      </View>
      <Text style={styles.langTxt}>{t('welcome')}</Text>
      {loading ?
        <View style={styles.loader}>
          <ActivityIndicator size={'large'} />
        </View>
        : error
          ? <Text>{error}</Text> :
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderColors}
          />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    height: height * 0.3,
    width: width * 0.7,
    borderRadius: 20
  },
  colorView: {
    padding: 10,
  },
  hexTxt: {
    paddingHorizontal: 10
  },
  hex: {
    color: '#000',
    fontWeight: '800'
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height / 4
  },
  langTxt: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    padding: 4,
    color: '#000'
  },
  logOut: {
    marginLeft: 'auto',
    marginRight: 20,
    top: 10
  },
  logOutTxt: {
    color: '#FFF',
    fontWeight: '400',
    fontSize: 16
  },
  pickerView: {
    borderWidth: 0.5,
    paddingHorizontal: 10,
    marginVertical: 20,
    marginHorizontal: 10,
    borderRadius: 10
  }
})

export default HomeScreen;
