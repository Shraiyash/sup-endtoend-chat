import { View, Text, TouchableOpacity, TextInput, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native'
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
                    <TouchableWithoutFeedback>
                    <View style={{backgroundColor: '#6e63e0', paddingTop: 70, paddingBottom: -30}} className='justify-center'>
                        <View className='flex-row'>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Entypo style={{paddingLeft: 10}} name="chevron-left" size={32} color="white" />
                        </TouchableOpacity>
                        <Text style={{color: 'white', fontSize: 30, paddingLeft: 53}} className='font-bold space-between items-center'>Contact Details</Text>
                        </View>
                        <View style={{backgroundColor: '#6e63e0', paddingTop: -50}} className="flex-row justify-center items-center pb-3">
                                <View style={{backgroundColor: '#6e63e0'}} className='pt-10 pl-20'>
                                    <Image
                                        style={{ borderColor: 'white', height: hp(15), aspectRatio: 1, borderRadius: 100, marginBottom: 10, marginRight: 10 }}
                                        source= 'https://media.licdn.com/dms/image/v2/D4D03AQG5S3hs82xPuw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1719669198734?e=2147483647&v=beta&t=TETjnLA-liBT583moBmVs_Z8cw1kuT_WZ1BUjXNYCrg'
                                        placeholder={blurhash}
                                        transition={100}
                                        borderCurve="continuous"
                                        borderColor= 'white'
                                        borderWidth={2}
                                        borderRadius={100}
                                    />
                                    
                                        {/* <Text className=''>Yash Pandey</Text> */}
                                    </View>
                                    {/* <View
                                        style={{
                                            position: 'absolute',
                                            bottom: 30,
                                            right: 30,
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
                                        </View> */}
                                    <TextInput
                                        // onChangeText={value => usernameRef.current = value} 
                                        style={{fontSize: hp(3), height: hp(7), width: wp(2), marginRight: 80, marginLeft: 10, marginTop: 20, color: 'black'}}
                                        autoCapitalize="none"
                                        className="flex-1 font-semibold font-black rounded-2xl px-4 bg-neutral-100 items-center justify-center"
                                        placeholder='Harsh'
                                        placeholderTextColor="#414040" 
                                    />
                        
                            </View>
                        </View>
                        </TouchableWithoutFeedback>
                        
            )

        }}

    />
    // <View style={{height: hp(5), backgroundColor: '#6e63e0', overflow: 'hidden'}} className="flex-row items-center justify-between px-5 pt-4">

    // </View>
  )
}