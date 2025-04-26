import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { useRef } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useRouter } from 'expo-router'
import {widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Feather, Octicons } from '@expo/vector-icons'
import Loading from '../components/Loading'
import CustomKeyboard from '../components/customKeyboard'
import { useAuth } from '../context/authContext'

export default function signUp() {
  const router = useRouter();
  const register = useAuth();
  const [loading, setLoading] = React.useState(false);


  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");
  const profileUrlRef = useRef("");

  const handleRegister = async () => {
      if(!emailRef.current || !passwordRef.current || !usernameRef.current || !profileUrlRef.current){
        Alert.alert("Sign Up", "Please fill in all fields");
        return;
      }

      setLoading(true);

      let response = await register.register(emailRef.current, passwordRef.current, usernameRef.current, profileUrlRef.current);
      setLoading(false);

      // router.replace({pathname: '/VerifyNum'}) 

      console.log('got result', response);

      if(!response.success){
        Alert.alert("Sign Up", response.msg);
        return;
      }
  }


  return (
    <CustomKeyboard>
      <StatusBar className="dark pt-12" />
      <View style={{paddingTop: hp(2), paddingHorizontal: wp(5)}} className="flex-1 gap-5">
       
        <View className="items-center pt-20">
          <Text style={{color: '#8c52ff'}}className="text-5xl text-black font-bold text-center tracking-wider">Sup</Text>
          <Image style={{height: hp(27), width: wp(80)}} resizeMode='contain' source={require('../assets/images/sup2.png')} />
        </View>

        <View className="flex-1 gap-5">
          <Text className="text-3xl text-black font-bold text-center tracking-wider">Create Account</Text>
          <View className="flex-row gap-5 bg-neutral-100 px-4 items-center rounded-2xl">
            <Octicons name="person" size={hp(2.7)} color="black"/>
            <TextInput
              onChangeText={value => usernameRef.current = value} 
              style={{fontSize: hp(2), height: hp(6), width: wp(100)}}
              autoCapitalize="none"
              className="flex-1 font-semibold rounded-2xl px-4 bg-neutral-100"
              placeholder='Username'
            />
          </View>
          <View className="flex-row gap-5 bg-neutral-100 px-4 items-center rounded-2xl">
            <Octicons name="mail" size={hp(2.7)} color="black"/>
            <TextInput
              onChangeText={value => emailRef.current = value} 
              style={{fontSize: hp(2), height: hp(6), width: wp(100)}}
              autoCapitalize="none"
              className="flex-1 font-semibold rounded-2xl px-4 bg-neutral-100"
              placeholder='Email address'
            />
         </View>
         <View className="flex-row gap-5 bg-neutral-100 px-4 items-center rounded-2xl">
            <Octicons name="lock" size={hp(2.7)} color="black"/>
            <TextInput
              onChangeText={value => passwordRef.current = value} 
              style={{fontSize: hp(2), height: hp(6), width: wp(100)}}
              autoCapitalize="none"
              secureTextEntry={true}
              className="flex-1 font-semibold rounded-2xl px-4 bg-neutral-100"
              placeholder='Password'
            />
          </View>
          <View className="flex-row gap-5 bg-neutral-100 px-4 items-center rounded-2xl">
          <Feather name="phone" size={hp(2.7)} color="black"/>
            <TextInput
              onChangeText={value => profileUrlRef.current = value} 
              style={{fontSize: hp(2), height: hp(6), width: wp(100)}}
              autoCapitalize="none"
              className="flex-1 font-semibold rounded-2xl px-4 bg-neutral-100"
              placeholder='Phone Number'
            />
         </View>
        

        <View>
          {
            loading ? (
              <View style={{height: hp(5)}}className="flex-row justify-center items-center">
                <Loading size={hp(10)} />
              </View>
            ) : 
            <View className="flex-row justify-center items-center">
            <TouchableOpacity onPress={handleRegister} style={{width: wp(30), backgroundColor: '#8680f8'}} className="flex-row rounded-2xl py-4 justify-center items-center">
              <Text className="text-white font-semibold text-center text-xl tracking-wider">Sign Up</Text>
            </TouchableOpacity>
            </View>
          }

        </View>

          {/* <View className="flex-row justify-center items-center">
          
          </View> */}

          <View className="flex-row justify-center items-center pt-3">
          <Text style={{fontSize: hp(1.7), height: hp(4)}} className="text-black text-center tracking-wider">Already have an account? </Text>
            <Pressable onPress={() => router.push('/signIn')}>
             <Text style={{fontSize: hp(1.7), height: hp(4), color: '#8c52ff'}} className="text-indigo-500 font-bold text-center tracking-wider"> Log In</Text>
            </Pressable>
            </View>
      </View>
    </View>
    </CustomKeyboard>
  )
}