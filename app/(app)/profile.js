import { View, Text, TouchableOpacity, Pressable, StyleSheet, TextInput, Button,TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'
import React, { useRef,useEffect } from 'react'
import { useAuth } from '../../context/authContext'
import { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import ChatList from '../../components/ChatList';
import Loading from '../../components/Loading';
import { getDocs, query, where } from 'firebase/firestore';
import { usersRef } from '../../firebaseConfig';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchBar from 'react-native-search-bar';
import { AntDesign, Entypo, Feather, FontAwesome6, Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import ProfileHeader from '../../components/ProfileHeader';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import CustomKeyboard from '../../components/customKeyboard';
import PhoneInput from "react-native-phone-number-input";
import DropdownComponent from '../../components/DropDownComponent';




export default function Profile() {
      const item = useLocalSearchParams();
      const router = useRouter();
  const {logout, user} = useAuth();
  const [users, setUsers] = useState([]);
  const insets = useSafeAreaInsets();
  const phoneInput = useRef<PhoneInput>(null);
  const [value, setValue] = useState('');

  const sendHome = () => {
    router.replace({pathname: '/home'})   
}

  const sendProfile = () => {
    router.replace({pathname: '/profile'})   
  }

  const inputRef = useRef(null);

  const handlePress = () => {
    Keyboard.dismiss();
    inputRef.current?.blur();
  };


  useEffect(() => {
    if(user?.uid){
      getUsers();
    }
  }, [])

  const getUsers = async () => {
      // fetch users
      const q = query(usersRef, where('userId', '!=', user?.uid));

      const querySnapshot = await getDocs(q);
      let data = [];
      querySnapshot.forEach(doc => {
          data.push({...doc.data()});
      });

      setUsers(data);
  }

  
  const handleLogout = async () => {
    await logout();
  }

  // console.log('user data', user );
  return (
    <CustomKeyboard>
    <TouchableWithoutFeedback onPress={handlePress} accessible={false}>
    <View className='flex-1' style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar style="light" />
        <ProfileHeader item={item} router={router} />
        <View style={{backgroundColor: '#6e63e0', height: 50}} />
        <View style={{ position: 'absolute', top: 5, left: 0, right: 0, height: 60, backgroundColor: 'white', borderTopLeftRadius: 50, borderTopRightRadius: 50 , paddingTop: 22, paddingLeft: 230}} className='flex-end justify-between items-center'>
        {/* <Text style={{fontSize: 23}} className="text-black font-bold text-center pt-1 tracking-wider">Edit Profile</Text> */}
        <TouchableOpacity style={{width: wp(30), height: hp(4.7), backgroundColor: '#6e63e0'}} onPress={() => router.push({pathname: '/VerifyNum'})} className="flex-row rounded-full border border-neutral-500 justify-between pl-10 items-center shadow shadow-neutral-300">
                <Text className="text-white font-semibold items-center justify-center text-center text-xl tracking-wider">Save </Text>
                {/* <Ionicons name='checkmark' size={hp(2.5)} color={'white'} style={{ alignSelf: 'auto' }}/> */}
        </TouchableOpacity>
        
        </View>
        <View className='flex-1 p-6 pt-2'>
            
            {/* add content here */}



          <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 20, gap: 16 }}
            >
            {/* <Text style={{fontSize: 20, paddingBottom: -40}} className='font-bold'>Name:</Text>
            <View className="flex-row gap-5 bg-neutral-100 px-4 items-center rounded-2xl">
                <Octicons name="person" size={hp(2.7)} color="black"/>
                <TextInput
                style={{fontSize: hp(2), height: hp(7), width: wp(100)}}
                autoCapitalize="none"
                className="flex-1 font-semibold rounded-2xl px-4 bg-neutral-100"
                placeholder='Yash Pandey'
                />
            </View> */}
            <Text style={{fontSize: 18, paddingBottom: -40}} className='font-bold'>Username</Text>
            <View className="flex-row gap-5 bg-neutral-100 px-4 items-center rounded-2xl">
            <Octicons name="person" size={hp(2.7)} color="black"/>
            <TextInput
              style={{fontSize: hp(2), height: hp(5), width: wp(100)}}
              autoCapitalize="none"
              className="flex-1 font-semibold rounded-2xl px-4 bg-neutral-100"
              placeholder='yash2002'
            />
          </View>
          <Text style={{fontSize: 18, paddingBottom: -40}} className='font-bold'>Email address</Text>
          <View className="flex-row gap-5 bg-neutral-100 px-4 items-center rounded-2xl">
            <Octicons name="mail" size={hp(2.7)} color="black"/>
            <TextInput
              style={{fontSize: hp(2), height: hp(5), width: wp(100)}}
              autoCapitalize="none"
              className="flex-1 font-semibold rounded-2xl px-4 bg-neutral-100"
              placeholder='yash@gmail.com'
            />
         </View>
        
         <Text style={{fontSize: 18, paddingBottom: -40}} className='font-bold'>Password</Text>
         <View className="flex-row gap-5 bg-neutral-100 px-4 items-center rounded-2xl">
            <Octicons name="lock" size={hp(2.7)} color="black"/>
            <TextInput
              style={{fontSize: hp(2), height: hp(5), width: wp(100)}}
              autoCapitalize="none"
              secureTextEntry={true}
              className="flex-1 font-bold rounded-2xl px-4 bg-neutral-100"
              placeholder='************'
            />
          </View>

          <Text style={{fontSize: 18, paddingBottom: -40}} className='font-bold'>Phone number</Text>
          <View className="flex-row gap-5 bg-neutral-100 px-4 pb-30 items-center rounded-2xl">
            <Feather name="phone" size={hp(2.7)} color="black"/>
            {/* <PhoneInput
                ref={phoneInput}
                defaultValue={value}
                defaultCode="DM"
                layout="first"
                onChangeText={(text) => {
                setValue(text);
                }}
                onChangeFormattedText={(text) => {
                setFormattedValue(text);
                }}
                withDarkTheme
                withShadow
                autoFocus
            /> */}
            <View style={{borderRadius: 10, borderColor: 'gray', height: hp(2.9)}} className='flex-row gap-3 border items-center pr-2'>
                <Text style={{color: 'gray', fontSize: hp(2)}} className='pl-3 font-bold'>🇺🇸 +1</Text>
                <AntDesign name='caretdown' size={15} color="gray" />
            </View>
            <TextInput
              style={{fontSize: hp(2), height: hp(5), width: wp(100), paddingLeft: -30}}
              autoCapitalize="none"
              className="flex-1 font-semibold rounded-2xl px-4 bg-neutral-100"
              placeholder='(234)-567-8910'
            />
         </View>
         <Text style={{fontSize: 18, paddingBottom: -40}} className='font-bold'>Gender</Text>
         <View className="flex-row gap-5 bg-neutral-100 px-4 items-center rounded-2xl">
            <FontAwesome6 name="person-half-dress" size={hp(2.7)} color="black"/>
            <DropdownComponent />
          </View>
         </ScrollView>


            
        </View>
      {/* Bottom Navbar */}
      <View
        style={{
          position: 'absolute',
          bottom: 25,
          left: 0,
          right: 0,
          height: 57,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#6e63e0',
          borderWidth: '0',
          shadowColor: 'gray',
          shadowOffset: 0,
          shadowOpacity: true,
        }} className='justify-between items-center border bg-neutral-300 border-neutral-100 pl-2 pr-2 mx-8 rounded-full'
      >
        <TouchableOpacity style={{backgroundColor: '', borderColor: '#6e63e0', borderWidth: 5}}className='items-center justify-center border border-black rounded-full' onPress={sendHome}>
            <Ionicons style={{alignItems: 'center'}} name="home-outline" size={hp(4)} color="white" className='p-2' />
        </TouchableOpacity>

        <TouchableOpacity style={{backgroundColor: 'white'}}className='items-center justify-center rounded-full' onPress={() => {}}>
            <Feather style={{alignItems: 'center'}} name="plus" size={hp(4)} color="black" className='p-1' />
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: '', borderColor: '#6e63e0', borderWidth: 5}}className='items-center border border-black justify-center rounded-full' onPress={sendProfile}>
            <Ionicons style={{alignItems: 'center'}} name="person" size={hp(4)} color="white" className='p-2' />
        </TouchableOpacity>
      </View>
    </View>
    </TouchableWithoutFeedback>
    </CustomKeyboard>
  )
}