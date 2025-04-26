import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { blurhash } from '../utils/common'


export default function StoriesList({users}) {
  return (
    <View className='flex-row space-between gap-3'>
        <View style={{ position: '' }}>
                    <Image
                        style={{ height: hp(6), aspectRatio: 1, borderRadius: 100 }}
                        source={users?.profileUrl}
                        placeholder={blurhash}
                        transition={100}
                        borderCurve="continuous"
                        borderColor="white"
                        borderWidth={2}
                        borderRadius={100}
                    />
                    {/* {<MaterialCommunityIcons name="plus" size={hp(2)} color="white" />} */}
                    <View
                        style={{
                            position: 'absolute',
                            bottom: -8,
                            right: 0,
                            backgroundColor: 'white',
                            borderRadius: 50,
                            width: 20,
                            height: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 1,
                            borderColor: 'black'
                        }}
                        >
                        <Text style={{ color: 'black', fontSize: 12 }}>+</Text>
                        </View>
                        <Image
                        style={{ height: hp(6), aspectRatio: 1, borderRadius: 100 }}
                        source={users[2]?.profileUrl}
                        placeholder={blurhash}
                        transition={100}
                        borderCurve="continuous"
                        borderColor="white"
                        borderWidth={2}
                        borderRadius={100}
                    />
        </View>
    </View>
  )
}