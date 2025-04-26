import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack} from 'expo-router'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { blurhash } from '../utils/common'
import { Ionicons } from '@expo/vector-icons'


export default function VerifyNumHeader({item, router}) {
    console.log("ChatRoomHeader user:", item);

  return (
    <Stack.Screen
        options={{
            title: "",
            headerShadowVisible: false,
            headerBackTitleVisible: false,
            headerStyle: {
                backgroundColor: "#6e63e0", // Change this to your desired color
              },
            // contentStyle: { paddingBottom: hp(20) },
            header: () => (
                <View style={{backgroundColor: '#6e63e0'}} className="flex-row pb-3 pt-10 gap-10">
                           <View style={{backgroundColor: '#6e63e0'}} className='flex-row pl-6 pt-10'>
                                <TouchableOpacity style={{alignSelf: 'flex-start'}} onPress={() => router.back()}>
                                    <Entypo name="chevron-left" size={32} color="white" />
                                </TouchableOpacity>

                                <View className='items-center justify-center'>
                                <Text style={{color: 'white', fontSize: 22, alignSelf: 'center'}} className='flex-row justify-center pl-6 font-bold items-center'>Verify your phone number</Text>
                                </View>
                            </View>

       
                        
                      </View>
            )

        }}

    />
    // <View style={{height: hp(5), backgroundColor: '#6e63e0', overflow: 'hidden'}} className="flex-row items-center justify-between px-5 pt-4">

    // </View>
  )
}