/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native'
import CustomButton from '../components/CustomButton'
import Icon from 'react-native-vector-icons/MaterialIcons';
import InputField from '../components/InputField';
export const IMAGENAME = require('../assets/images/png/logo.png')
export const GOOGLELOGO = require('../assets/images/png/logo_google.png')
export const FACEBOOKLOGO = require('../assets/images/png/logo_facebook.png')
export const TWITERLOGO = require('../assets/images/png/logo_twiter.png')

import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import { firebaseConfig } from '../firebase-config.js';


const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email,password).then((userCredential)=> {
      console.log('Login !!!')
      const user = userCredential.user;
      console.log('user: ' + JSON.stringify(user))
      navigation.navigate('BottomNavigation')
    }).catch(error => {
      console.error(error)
      Alert.alert(error.message)
    })
  }

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <ScrollView style={{ paddingHorizontal: 20 }} showsVerticalScrollIndicator={false}>
        <Image
          source={IMAGENAME}
          style={{ width: 230, height: 230, alignSelf: 'center' }}
        />
        <Text style={styles.headerText}>Login Screen</Text>
        <InputField placeholder={'Email Id'} icon={<Icon name='email' size={30} />} onChangeText={(text) => setEmail(text)} />
        <InputField placeholder={'Password'} icon={<Icon name='lock-outline' size={30} />} inputType={'password'} fieldButtonLabel={'Forgot?'} fieldButtonFunction={() => { }} onChangeText={(text) => setPassword(text)} />
        <CustomButton buttonLabel={'Login'} onPress={handleSignIn} />
        <Text style={{ textAlign: 'center', color: '#666', marginBottom: 30, fontWeight: '600' }}>Or, login with...</Text>
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
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30 }}>
          <Text style={{ color: '#666', fontWeight: '600' }}>New to the app? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{ color: '#AD40AF', fontWeight: '700' }}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  headerText: {
    marginTop: 20,
    marginBottom: 20,
    fontFamily: 'Roboto-Medium',
    fontSize: 28,
    fontWeight: '500',
    color: '#333',
  },
  containerInput: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    paddingBottom: 8,
    marginBottom: 25,
    borderBottomWidth: 1,
  },
  containerLoginOther: {
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 0,
  },
});
export default LoginScreen;
