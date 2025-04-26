import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack} from 'expo-router'
import { Entypo } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { blurhash } from '../utils/common'
import { Ionicons } from '@expo/vector-icons'


export default function ChatRoomHeader({item, router}) {
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
            headerLeft: () => (
                <View className='flex-row items-center pt-4'>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Entypo name="chevron-left" size={32} color="white" />
                    </TouchableOpacity>
                    <View className='flex-row items-center gap-3'>
                        {/* <Text>
                            hello
                        </Text> */}
                        <Image
                            style={{width: hp(6), height: hp(6), borderRadius: 100}}
                            source={item?.profileUrl}
                            placeholder={blurhash}
                            transition={100}
                            backgroundColor="white"
                            borderRadius={100}
                        />
                        <TouchableOpacity onPress={() => router.push({pathname: '/ContactDetails'})}>
                        <Text style={{fontSize: hp(2.5)}} className="text-white font-bold">
                            {item && (item?.username || item?.displayName)
                            ? item?.username.charAt(0).toUpperCase() + item?.username.slice(1)
                            : "Guest"}
                        </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            ),
            headerRight: () => (
                <View className='flex-row items-center justify-center gap-8 pt-9 pr-2'>
                    <TouchableOpacity onPress={() => router.push({pathname: '/Call'})}>
                        <Ionicons name="call-outline" size={30} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="videocam-outline" size={32} color="white" />
                    </TouchableOpacity>
                    {/* <Entypo name="dots-three-vertical" size={25} color="white" /> */}
                </View>
            )

        }}

    />
    // <View style={{height: hp(5), backgroundColor: '#6e63e0', overflow: 'hidden'}} className="flex-row items-center justify-between px-5 pt-4">

    // </View>
  )
}