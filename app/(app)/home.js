import { View, Text, TouchableOpacity, Pressable, TextInput, Button,TouchableWithoutFeedback, Keyboard } from 'react-native'
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
import { Entypo, Feather, Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

export default function Home() {

  const {logout, user} = useAuth();
  const [users, setUsers] = useState([]);
  const insets = useSafeAreaInsets();

  const sendHome = () => {
    router.replace({pathname: '/home'})   
}

const addContact = () => {
  router.push({pathname: '/contact'})   
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

  useFocusEffect(
    React.useCallback(() => {
      // This callback will fire when the screen is focused,
      // so re-fetch your chats / user data here.
      getUsers();
    }, [])
  );

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
    <TouchableWithoutFeedback onPress={handlePress} accessible={false}>
    <View style={{backgroundColor: '#6e63e0'}} className='flex-1'>
      <View style={{borderRadius: 50, overflow: 'hidden',  shadowColor: 'gray', shadowOffset: 0, shadowOpacity: true}} className="flex-1 bg-white px-3 shadow-lg shadow-gray-300 pt-8">
        {/* <Text className="text-3xl font-bold text-black">Home</Text> */}
        {/* <Text>
        Hi, welcome back{" "}
          {user && (user.username || user.displayName)
            ? user.username || user.displayName
            : "Guest"}
        </Text> */}
        <StatusBar style='light'/>
          <View className='pb-5'>
            <View style={{height: hp(1.8)}}className='flex-row items-center justify-between mx-3 pb-1'>
                <View style={{borderWidth: 2}}className='flex-row justify-between bg-white border border-neutral-300 rounded-full pl-4'>
                    <TouchableOpacity style={{backgroundColor: '#6e63e0'}}className='items-center my-[4px] mx-[-10px] justify-center rounded-full'>
                        <Ionicons style={{alignItems: 'center'}} name="search" size={hp(2.5)} color="white" className='pl-2 pr-2' />
                    </TouchableOpacity>
                    <TextInput
                        ref={inputRef}
                        placeholder="Search"
                        style={{fontSize: hp(2.2), width: wp(80), height: hp(5)}}
                        className="flex-1 pl-5 rm-2"
                    />
                    
              </View>
            </View>

          </View>
          
        {
          users.length > 0 ? (
              
              <ChatList currentUser={user} users={users} />
          ) : (
              <View style= {{top: hp(20)}}className="flex items-center">
                  <Loading size={hp(15)} />
              </View>
          )
        }
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
          shadowOpacity: true
        }} className='justify-between items-center border bg-neutral-300 border-neutral-100 pl-2 pr-2 mx-8 rounded-full'
      >
        <TouchableOpacity style={{backgroundColor: '', borderColor: '#6e63e0', borderWidth: 5}}className='items-center justify-center border border-black rounded-full' onPress={sendHome}>
            <Ionicons style={{alignItems: 'center'}} name="home" size={hp(4)} color="white" className='p-2' />
        </TouchableOpacity>

        <TouchableOpacity style={{backgroundColor: 'white'}}className='items-center justify-center rounded-full' onPress={addContact}>
            <Feather style={{alignItems: 'center'}} name="plus" size={hp(4)} color="black" className='p-1' />
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: '', borderColor: '#6e63e0', borderWidth: 5}}className='items-center border border-black justify-center rounded-full' onPress={sendProfile}>
            <Ionicons style={{alignItems: 'center'}} name="person-outline" size={hp(4)} color="white" className='p-2' />
        </TouchableOpacity>
      </View>
    </View>
    </TouchableWithoutFeedback>
  )
}