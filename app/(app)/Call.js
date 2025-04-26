import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native'
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


export default function Call() {
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
    <CustomKeyboard inChat={true}>
        <View className='flex-1' style={{ flex: 1, backgroundColor: '#6e63e0' }}>
            <StatusBar style="light" />
            <CallHeader item={item} router={router}/>
            <View style={{backgroundColor: '#6e63e0', height: 30, paddingTop: 5}} />
            <View style={{ flex: 1, backgroundColor: 'white', borderTopLeftRadius: 50, borderTopRightRadius: 50, overflow: 'hidden', paddingTop: 20, paddingBottom: insets.bottom, }}>
                <View style={{paddingTop: 200}} className='flex-1 pl-4 items-center'>
                    <Image
                        style={{ borderColor: 'white', height: hp(20), aspectRatio: 1, borderRadius: 100, marginBottom: 10, marginRight: 10 }}
                        source= 'https://media.licdn.com/dms/image/v2/D4D03AQG5S3hs82xPuw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1719669198734?e=2147483647&v=beta&t=TETjnLA-liBT583moBmVs_Z8cw1kuT_WZ1BUjXNYCrg'
                        placeholder={blurhash}
                        transition={100}
                        borderCurve="continuous"
                        borderColor= 'white'
                        borderWidth={2}
                        borderRadius={100}
                    />
                    <Entypo name='dots-three-horizontal' size={hp(7)} />
                    {/* <MessageList ScrollViewRef={ScrollViewRef} messages={messages} currentUser={user} /> */}
                </View>
                <View
                    style={{
                    position: 'absolute',
                    bottom: 45,
                    left: 0,
                    right: 0,
                    height: 65,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#6e63e0',
                    borderWidth: '0',
                    shadowColor: 'gray',
                    shadowOffset: 0,
                    shadowOpacity: true
                    }} className='justify-between items-center border bg-neutral-300 border-neutral-100 pl-2 pr-2 mx-8 rounded-full'
                >
                    <TouchableOpacity style={{backgroundColor: '', borderColor: '#6e63e0', borderWidth: 5}}className='items-center justify-center border border-black rounded-full' onPress={endCall}>
                        <FontAwesome5 style={{alignItems: 'center'}} name="volume-up" size={hp(3)} color="white" className='p-2' />
                    </TouchableOpacity>

                    <TouchableOpacity style={{backgroundColor: ''}}className='items-center justify-center rounded-full' onPress={endCall}>
                        <FontAwesome5 style={{alignItems: 'center'}} name="microphone-slash" size={hp(2.8)} color="white" className='p-1' />
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: '', borderColor: '#6e63e0', borderWidth: 5}}className='items-center border border-black justify-center rounded-full' onPress={endCall}>
                        <Ionicons style={{alignItems: 'center'}} name="videocam" size={hp(4)} color="white" className='p-2' />
                    </TouchableOpacity>

                    <TouchableOpacity style={{backgroundColor: 'red'}}className='items-center justify-center rounded-full' onPress={endCall}>
                        <MaterialCommunityIcons style={{alignItems: 'center'}} name="phone-hangup" size={hp(4)} color="white" className='p-1' />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </CustomKeyboard>
  )
}