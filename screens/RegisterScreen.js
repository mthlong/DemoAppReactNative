/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import InputField from '../components/InputField';
import DatePicker from 'react-native-date-picker'
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../components/CustomButton'

import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase-config.js';
import UserPermission from '../utilities/UserPermission';
// import * as ImagePicker from 'expo-image-picker';

export const IMAGENAME = require('../assets/images/png/logo.png');
export const GOOGLELOGO = require('../assets/images/png/logo_google.png')
export const FACEBOOKLOGO = require('../assets/images/png/logo_facebook.png')
export const TWITERLOGO = require('../assets/images/png/logo_twiter.png')
const RegisterScreen = ({ navigation: { goBack } }) => {
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [dobLabel, setDobLabel] = useState('Date of Birth')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [image, setImage] = useState(null);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  handlePickAvatar = async () => {
    UserPermission.getCameraPermision()

    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsEditing: true,
    //   aspect: [4,3]
    // });

    // console.log(result);

    // if (!result.canceled) {
    //   setImage(result.assets[0].uri);
    // }
  }

  const handleCreateAccount = () => {
    if (password != rePassword) {
      Alert.alert("Password do not match!!!")
    } else {
      createUserWithEmailAndPassword(auth, email, password).then((userCre) => {
        console.log('Account created !!!')
        updateProfile(userCre.user, { displayName: fullName }).then((s) => {
          console.log('user: ' + JSON.stringify(userCre.user))
        })
        Alert.alert(
          'Notification',
          'Account created with email: ' + userCre.user.email,
          [
            { text: "Login", onPress: () => goBack() },
            { text: "Close", onPress: () => null }
          ],
          { cancelable: false }
        )

      }).catch(error => {
        console.error(error)
        Alert.alert(error.message)
      })
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <ScrollView style={{ paddingHorizontal: 20 }} showsVerticalScrollIndicator={false}>
        <View >
        <TouchableOpacity style = {styles.backButtonBG}
        onPress={() => {goBack()}}>
          <Icon name="arrow-back-ios" size={20} color='#ffffff' />
        </TouchableOpacity>
        </View>
        <Image
          source={IMAGENAME}
          style={{ width: 230, height: 230, alignSelf: 'center' }}
        />
        <Text style={styles.headerText}>Register Screen</Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}>
          <TouchableOpacity
            style={styles.containerLoginOther}
            onPress={() => { }}>
            <Image source={GOOGLELOGO} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.containerLoginOther} onPress={() => { }}>
            <Image
              source={FACEBOOKLOGO}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.containerLoginOther} onPress={() => { }}>
            <Image
              source={TWITERLOGO}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
        </View>
        <Text style={{ textAlign: 'center', color: '#666', marginBottom: 30, fontWeight: '600' }}>Or, register with email</Text>

        <TouchableOpacity style = {styles.avatarPlacehorder}>
          {image ?? <Image source={{uri: image}} style = {styles.avatar} />}
          <Icon name="add" size={40} color='#ffffff' style={{ marginTop: 6, marginLeft: 2 }} />
        </TouchableOpacity>

        <InputField onChangeText={(text) => setFullName(text)} placeholder={'Full name'} icon={<Icon name='person-outline' size={30} />} />
        <InputField onChangeText={(text) => setEmail(text)} placeholder={'Email Id'} icon={<Icon name='email' size={30} />} />
        <InputField onChangeText={(text) => setPassword(text)} placeholder={'Password'} icon={<Icon name='lock-outline' size={30} />} inputType={'password'} />
        <InputField onChangeText={(text) => setRePassword(text)} placeholder={'Confirm password'} icon={<Icon name='lock-outline' size={30} />} inputType={'password'} />
        <View style={styles.datePicker}>
          <Icon name='date-range' size={30} style={{ marginRight: 5 }} />
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Text style={{ color: '#666', marginLeft: 5, marginTop: 5 }}>{dobLabel}</Text>
          </TouchableOpacity>
        </View>
        <DatePicker
          modal
          open={open}
          date={date}
          mode='date'
          maximumDate={new Date('2005-01-01')}
          minimumDate={new Date('1900-01-01')}
          onConfirm={(date) => {
            setOpen(false)
            setDate(date)
            setDobLabel(date.toDateString())
          }}
          onCancel={() => {
            setOpen(false)
          }}
        />
        <CustomButton buttonLabel={'Register'} onPress={handleCreateAccount} />
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30 }}>
          <Text style={{ color: '#666', fontWeight: '600' }}>Already registered? </Text>
          <TouchableOpacity onPress={() => goBack()}>
            <Text style={{ color: '#AD40AF', fontWeight: '700' }}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  datePicker: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 30,
  },
  headerText: {
    marginTop: 20,
    marginBottom: 20,
    fontFamily: 'Roboto-Medium',
    fontSize: 28,
    fontWeight: '500',
    color: '#333',
  },
  containerLoginOther: {
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  backButtonBG: {
    position: 'absolute',
    width: 30, 
    height: 30, 
    borderRadius: 50,
    opacity: 30, 
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#E1E2E6',
  }, 
  avatar: {
    position: 'absolute',
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    backgroundColor: '#E1E2E6',
    justifyContent: 'center', 
    alignItems: 'center'
  }, 
  avatarPlacehorder: {
    justifyContent: 'center', 
    alignItems: 'center',
    alignSelf: 'center',
    width: 100, 
    height: 100, 
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 40, 
  }
});
export default RegisterScreen;
