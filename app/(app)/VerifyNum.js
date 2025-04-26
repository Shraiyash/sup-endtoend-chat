import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Keyboard, Pressable } from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import { useLocalSearchParams } from 'expo-router'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import { useRouter } from 'expo-router';
import MessageList from '../../components/MessageList';
import { Entypo, Feather, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import CustomKeyboard from '../../components/customKeyboard';
import { useAuth } from '../../context/authContext';
import { db } from '../../firebaseConfig';
import { addDoc, collection, onSnapshot, orderBy, query, Timestamp } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { blurhash, getRoomId } from '../../utils/common';
import CallHeader from '../../components/CallHeader';
import { Image } from 'expo-image';
import VerifyNumHeader from '../../components/VerifyNumHeader';
import { OtpInput } from "react-native-otp-entry";

export default function VerifyNum() {
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

    const endCall = () => {
        router.replace({pathname: '/profile'})   
      }

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
        <View className='' style={{ flex: 1, backgroundColor: '#6e63e0'}}>
            <StatusBar style="light" />
            <VerifyNumHeader item={item} router={router}/>
            <View style={{backgroundColor: '#6e63e0', height: 10}} />
            <View style={{ flex: 1, backgroundColor: 'white', borderTopLeftRadius: 50, borderTopRightRadius: 50, overflow: 'hidden', paddingTop: 0, paddingBottom: insets.bottom}}>
                <View style={{paddingTop: 30}} className='flex-1 pl-10 pr-10 items-center'>
                  <Image
                        style={{ borderColor: 'white', height: hp(25), aspectRatio: 1}}
                        source={'https://t3.ftcdn.net/jpg/10/84/15/42/360_F_1084154227_o4wPk07Q6IikvJ6rXQNjqBkQtmdXkpwM.jpg'}
                        placeholder={blurhash}
                        transition={100}
                        borderCurve="continuous"
                        borderColor= 'white'
                        borderWidth={2}
                        borderRadius={100}
                    />
                    <Text style={{textAlign: 'center', color: 'black'}} className='flex-row pb-8 items-center'>
                      We've sent an SMS with an activation code. Please enter the code below to verify your number.
                    </Text>
                    <OtpInput numberOfDigits={6} onTextChange={(text) => console.log(text)} />

                    <View className="flex-row justify-center items-center pt-5">
                      <Text style={{fontSize: hp(1.7), height: hp(4)}} className="text-black text-center tracking-wider">I didn't recieve a code </Text>
                        <Pressable onPress={() => router.push('/signIn')}>
                          <Text style={{fontSize: hp(1.7), height: hp(4), color: '#8c52ff'}} className="text-indigo-500 font-bold text-center tracking-wider"> Resend</Text>
                        </Pressable>
                    </View>

                </View>
            </View>
            <View style={{height: hp(10)}} className='bg-white'>
              
            </View>
        </View>
  )
}