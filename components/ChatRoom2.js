import { SafeAreaView, View, Text, TextInput } from 'react-native'
import React, {useState} from 'react'
import { useLocalSearchParams } from 'expo-router'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import { useRouter } from 'expo-router';
import MessageList from '../../components/MessageList';


export default function ChatRoom2() {
    const item = useLocalSearchParams();
    const router = useRouter();
    const [messages, setMessages] = useState([]);
    const insets = useSafeAreaInsets();
  return (
    <SafeAreaView className='flex-1' style={{ flex: 1, backgroundColor: '#6e63e0' }}>

    </SafeAreaView>
    // <Text>
    //     ChatRoom
    // </Text>
    // <SafeAreaView style={{ flex: 1, backgroundColor: '#6e63e0' }}>
    //     <StatusBar style="light" />
    //     <ChatRoomHeader item={item} router={router}/>
    //     <View style={{backgroundColor: '#6e63e0', height: 50}} />
    //     <View style={{ flex: 1, backgroundColor: 'white', borderTopLeftRadius: 50, borderTopRightRadius: 50, overflow: 'hidden', paddingBottom: insets.bottom, }}>
    //         <View className='flex-1 pt-12 pl-4'>
    //             <MessageList messages={messages} />
    //         </View>
    //         <View className='pt-2'>
    //             <View className='flex-row items-center justify-between mx-3'>
    //                 <View className='flex-row justify-between bg-white border border-neutral-300 rounded-full pl-5'>
    //                     <TextInput
    //                         placeholder="Type a message"
    //                         style={{fontSize: hp(2.5), width: wp(80), height: hp(6)}}
    //                         className="flex-1 rm-2"
    //                     />
                        
    //                 </View>
    //             </View>

    //         </View>
    //     </View>
    // </SafeAreaView>
  )
}