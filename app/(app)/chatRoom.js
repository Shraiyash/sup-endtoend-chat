import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import { useLocalSearchParams } from 'expo-router'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import { useRouter } from 'expo-router';
import MessageList from '../../components/MessageList';
import { Feather } from '@expo/vector-icons';
import CustomKeyboard from '../../components/customKeyboard';
import { useAuth } from '../../context/authContext';
import { db } from '../../firebaseConfig';
import { addDoc, collection, onSnapshot, orderBy, query, Timestamp } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { getRoomId } from '../../utils/common';


export default function ChatRoom() {
    const item = useLocalSearchParams();
    const {user} = useAuth();
    const router = useRouter();
    const [messages, setMessages] = useState([]);
    const insets = useSafeAreaInsets();
    const textRef =useRef('');
    const inputRef = useRef(null);
    const ScrollViewRef = useRef(null);

    useEffect(() => {
        createRoomIfNotExists();

        let roomId = getRoomId(user?.userId, item?.userId);
        const docRef = doc(db, 'rooms', roomId);
        const messagesRef = collection(docRef, "messages");
        const q = query(messagesRef, orderBy('createdAt', 'asc'));

        let unsub = onSnapshot(q, (snapShot) => {
            let allMessages = snapShot.docs.map(doc => {
                return doc.data();
            })
            setMessages([...allMessages]);
        });

        const KeyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow', updateScrollView
        )

        return () => {
            unsub();
            KeyboardDidShowListener.remove();
        }

    }, [])

    useEffect(() => {
        updateScrollView();
    }, [messages])


    const updateScrollView = ()=>{
        setTimeout(() => {
            ScrollViewRef?.current?.scrollToEnd({animated: true})
        }, 100)
    }
    const createRoomIfNotExists = async () => {
        let roomId = getRoomId(user?.userId, item?.userId);
        await setDoc(doc(db, 'rooms', roomId), {
            roomId,
            createdAt: Timestamp.fromDate(new Date())
        });
    }

    const handleSendMessage = async () => {
        let message = textRef.current.trim();
        if(!message){
            return;
        }
        try {
            let roomId = getRoomId(user?.userId, item?.userId);
            const docRef = doc(db, 'rooms', roomId);
            const messagesRef = collection(docRef, "messages");
            textRef.current = '';
            if(inputRef.current){
                inputRef.current.clear();
            }

            const newDoc = await addDoc(messagesRef, {
                userId: user?.userId,
                text: message,
                profileUrl: user?.profileUrl,
                senderName: user?.username,
                createdAt: Timestamp.fromDate(new Date())
            });

            console.log('message id', newDoc.id);
            
        } catch (err) {
            Alert.alert('Message', err.message);
        }
    }

    console.log('messages', messages);
  return (
    <CustomKeyboard inChat={true}>
        <View className='flex-1' style={{ flex: 1, backgroundColor: '#6e63e0' }}>
            <StatusBar style="light" />
            <ChatRoomHeader item={item} router={router}/>
            <View style={{backgroundColor: '#6e63e0', height: 50}} />
            <View style={{ flex: 1, backgroundColor: 'white', borderTopLeftRadius: 50, borderTopRightRadius: 50, overflow: 'hidden', paddingBottom: insets.bottom, }}>
                <View className='flex-1 pt-1 pl-4'>
                    <MessageList ScrollViewRef={ScrollViewRef} messages={messages} currentUser={user} />
                </View>
                <View className='pt-2'>
                    <View style={{height: hp(4)}}className='flex-row items-center justify-between mx-3 pb-1 shadow-lg shadow-gray-200'>
                        <View style={{borderColor: 'gray', borderWidth: 2}}className='flex-row justify-between bg-white border border-neutral-300 rounded-full pl-4'>
                            <TouchableOpacity style={{backgroundColor: '#6e63e0'}}className='items-center my-[4px] mx-[-10px] justify-center rounded-full' onPress={() => {}}>
                                <Feather style={{alignItems: 'center'}} name="plus" size={hp(2.5)} color="white" className='pl-2 pr-2' />
                            </TouchableOpacity>
                            <TextInput
                                ref={inputRef}
                                onChangeText={value => textRef.current = value}
                                placeholder="Type a message"
                                style={{fontSize: hp(2.2), width: wp(80), height: hp(5)}}
                                className="flex-1 pl-5 rm-2"
                            />
                            <TouchableOpacity onPress={handleSendMessage} style={{backgroundColor: '#6e63e0'}} className='mr-[4px] my-[4px] pt-2 pr-2 pl-2 rounded-full'>
                                <Feather name="send" size={hp(2.5)} color="white" className='pr-0.5' />
                            </TouchableOpacity>
                            
                        </View>
                    </View>

                </View>
            </View>
        </View>
    </CustomKeyboard>
  )
}