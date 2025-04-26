import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack} from 'expo-router'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { blurhash } from '../utils/common'
import { Ionicons } from '@expo/vector-icons'


export default function ProfileHeader({item, router}) {
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
                <View style={{backgroundColor: '#6e63e0'}} className="flex-row justify-center items-center pb-3 pt-4">
                           <View style={{backgroundColor: '#6e63e0'}} className='pt-20'>
                              <Image
                                  style={{ borderColor: 'white', height: hp(15), aspectRatio: 1, borderRadius: 100, marginBottom: 10, marginRight: 10 }}
                                  source= 'https://ieeexplore.ieee.org/mediastore/IEEE/content/author_profile_image/37089914428.png'
                                  placeholder={blurhash}
                                  transition={100}
                                  borderCurve="continuous"
                                  borderColor= 'white'
                                  borderWidth={2}
                                  borderRadius={100}
                              />
                                <View
                                  style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 10,
                                    backgroundColor: 'white',
                                    borderRadius: 50,
                                    width: 40,
                                    height: 40,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderWidth: 1,
                                    borderColor: 'black'
                                  }}
                                >
                                  <MaterialIcons name='edit' color={'#6e63e0'} size={hp(3.5)} />
                                </View>
                                {/* <Text className=''>Yash Pandey</Text> */}
                            </View>

                            <Text style={{color: 'white', fontSize: 30}} className='pl-5 pt-20 justify-center font-bold items-center'>Yash Pandey</Text>
                
                      </View>
            )

        }}

    />
    // <View style={{height: hp(5), backgroundColor: '#6e63e0', overflow: 'hidden'}} className="flex-row items-center justify-between px-5 pt-4">

    // </View>
  )
}