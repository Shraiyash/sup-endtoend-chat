import { View, Text, FlatList} from 'react-native'
import React from 'react'
import ChatItem from './ChatItem'
import { useRouter } from 'expo-router'

export default function ChatList({users, currentUser}) {
    const router = useRouter();
  return (
    <View className='flex-1'>
      <FlatList 
        data={users}
        contentContainerStyle={{fle: 1, paddingVertical: 0}}
        keyExtractor={item => Math.random()}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => <ChatItem noBorder={index+1 == users.length} item={item} router={router} index={index} currentUser={currentUser} /> }
      />
    </View>
  )
}