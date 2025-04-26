import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack} from 'expo-router'
import { Entypo } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { blurhash } from '../utils/common'
import { Ionicons } from '@expo/vector-icons'


export default function CallHeader({item, router}) {
    // console.log("ChatRoomHeader user:", item);

    

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
                <View style={{paddingBottom: 30}} className='flex-row items-center pt-1'>
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
                        <Text style={{fontSize: hp(4), paddingLeft: 43}} className="text-white justify-center items-center font-bold">
                            {item && (item?.username || item?.displayName)
                            ? item?.username.charAt(0).toUpperCase() + item?.username.slice(1)
                            : "Harsh"}
                        </Text>

                    </View>
                </View>
            )

        }}

    />
    // <View style={{height: hp(5), backgroundColor: '#6e63e0', overflow: 'hidden'}} className="flex-row items-center justify-between px-5 pt-4">

    // </View>
  )
}