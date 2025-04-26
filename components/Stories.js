import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '../context/authContext';
import StoriesList from './StoriesList';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'


export default function Stories({users, currentUser}) {


  return (
    <View className="flex-row items-center pt-5">

    <StoriesList users={users} />

    
    
    
    </View>
  )
}