import { View, Text } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import React from 'react'

export default function MessageItem({message, currentUser}) {
  if(currentUser?.userId == message?.userId){
    return(
        <View style={{padding: 5.5}} className='flex-row items-center justify-end mb-2 pr-2 mr-2'>
            <View style={{width: wp(80)}}>
                <View style={{backgroundColor: '#6e63e0'}} className='flex my-[-3px] self-end p-3 rounded-3xl'>
                    <Text style={{color: 'white', fontSize: 16.5}} className='font-semibold'>
                        {message?.text}
                    </Text>
                </View>
                
            </View>
        </View>
    )
  } else{
    return (
        <View style={{padding: 5.5}} className='flex-row items-center justify-start mb-2 pr-2 mr-2'>
            <View style={{width: wp(80)}}>
                <View style={{}} className='flex my-[-3px] self-start p-3 bg-neutral-200 rounded-3xl'>
                    <Text style={{color: 'black', fontSize: 16.5}} className='font-semibold'>
                        {message?.text}
                    </Text>
                </View>
                    
            </View>
        </View>
    )
  }
}