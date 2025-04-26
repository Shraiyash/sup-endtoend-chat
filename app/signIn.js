import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { useRef } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useRouter } from 'expo-router'
import {widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Octicons } from '@expo/vector-icons'
import Loading from '../components/Loading'
import CustomKeyboard from '../components/customKeyboard'
import { useAuth } from '../context/authContext'

export default function signIn() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const {login} = useAuth();


  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleLogin = async () => {
      if(!emailRef.current || !passwordRef.current){
        Alert.alert("Sign In", "Please fill in all fields");
        return;
      }

      setLoading(true);
      const response = await login(emailRef.current, passwordRef.current);
      setLoading(false);
      console.log('got result', response);
      if(!response.success){
        Alert.alert("Sign In", response.msg);
        // return;
      }
  }


  return (
    <CustomKeyboard>
      <StatusBar className="dark pt-12" />
      <View style={{paddingTop: hp(3), paddingHorizontal: wp(5)}} className="flex-1 gap-5">
       
        <View className="items-center pt-20">
          <Text style={{color: '#8c52ff'}}className="text-5xl text-black font-bold text-center tracking-wider">Sup</Text>
          <Image style={{height: hp(35), width: wp(80)}} resizeMode='contain' source={require('../assets/images/log-in.png')} />
        </View>

        <View className="flex-1 gap-5">
          <Text className="text-3xl text-black font-bold text-center tracking-wider">Login here</Text>
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
          <Text style={{fontSize: hp(1.7), height: hp(4), paddingHorizontal: wp(2)}}className="text-black font-semibold text-right tracking-wider pt-2">Forgot password?</Text>



        <View>
          {
            loading ? (
              <View style={{height: hp(5)}}className="flex-row justify-center items-center">
                <Loading size={hp(10)} />
              </View>
            ) : 
            <View className="flex-row justify-center items-center">
            <TouchableOpacity onPress={handleLogin} style={{width: wp(30), backgroundColor: '#8680f8'}} className="flex-row rounded-2xl py-4 justify-center items-center">
              <Text className="text-white font-semibold text-center text-xl tracking-wider">Sign In</Text>
            </TouchableOpacity>
            </View>
          }

        </View>

          {/* <View className="flex-row justify-center items-center">
          
          </View> */}

          <View className="flex-row justify-center items-center pt-3">
          <Text style={{fontSize: hp(1.7), height: hp(4)}} className="text-black text-center tracking-wider">Don't have an account? </Text>
            <Pressable onPress={() => router.push('/signUp')}>
             <Text style={{fontSize: hp(1.7), height: hp(4), color: '#8c52ff'}} className="text-indigo-500 font-bold text-center tracking-wider"> Sign Up</Text>
            </Pressable>
            </View>
      </View>
    </View>
    </CustomKeyboard>
  )
}