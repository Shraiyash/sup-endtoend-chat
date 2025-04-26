import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import { useLocalSearchParams } from 'expo-router'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import { useRouter } from 'expo-router';
import MessageList from '../../components/MessageList';
import { AntDesign, Entypo, Feather, FontAwesome5, FontAwesome6, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons } from '@expo/vector-icons';
import CustomKeyboard from '../../components/customKeyboard';
import { useAuth } from '../../context/authContext';
import { db } from '../../firebaseConfig';
import { addDoc, collection, onSnapshot, orderBy, query, Timestamp } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { blurhash, getRoomId } from '../../utils/common';
import CallHeader from '../../components/CallHeader';
import { Image } from 'expo-image';
import ContactDetailsHeader from '../../components/ContactDetailsHeader';
import ProfileHeader from '../../components/ProfileHeader';
import DropdownComponent from '../../components/DropDownComponent';


export default function ContactDetails() {
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
    // <CustomKeyboard inChat={true}>
        <View className='flex-1' style={{ flex: 1, backgroundColor: '#6e63e0' }}>
            <StatusBar style="light" />
            
            <ContactDetailsHeader item={item} router={router}/>
            <View style={{backgroundColor: '#6e63e0', height: 30, paddingTop: 5}} />
            <View style={{ flex: 1, backgroundColor: 'white', borderTopLeftRadius: 50, borderTopRightRadius: 50, overflow: 'hidden', paddingTop: 20, paddingBottom: insets.bottom, }}>

            <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1, padding: 20, gap: 16}}
                    >
                    {/* <Text style={{fontSize: 20, paddingBottom: -40}} className='font-bold'>Name:</Text>
                    <View className="flex-row gap-5 bg-neutral-100 px-4 items-center rounded-2xl">
                        <Octicons name="person" size={hp(2.7)} color="black"/>
                        <TextInput
                        style={{fontSize: hp(2), height: hp(7), width: wp(100)}}
                        autoCapitalize="none"
                        className="flex-1 font-semibold rounded-2xl px-4 bg-neutral-100"
                        placeholder='Yash Pandey'
                        />
                    </View> */}
                    <Text style={{fontSize: 18, paddingBottom: -40}} className='font-bold'>Birthday</Text>
                    <View style={{width: wp(50)}} className="flex-row gap-5 bg-neutral-100 px-4 items-center gap-5 rounded-2xl">
                    <FontAwesome6 name="cake-candles" size={hp(2.5)} color="black"/>
                    <TextInput
                    style={{fontSize: hp(2), height: hp(5), width: wp(30)}}
                    autoCapitalize="none"
                    className="flex-row font-semibold rounded-2xl px-4 bg-neutral-100"
                    placeholder='11/26/2005'
                    />
                    <TouchableOpacity style={{width: wp(38), height: hp(4.7), backgroundColor: '#6e63e0', alignSelf: 'flex-end', marginLeft: 25}} onPress={() => router.replace({pathname: '/VerifyNum'})} className="flex-row rounded-full border border-neutral-500 justify-between items-center shadow shadow-neutral-300">
                        <Text className="text-white font-semibold items-center justify-center items-center pl-3  text-center  tracking-wider">Happy Birthday </Text>
                        <MaterialIcons name="celebration" size={hp(2)} color="white" className='pr-3 pl-1' />
                    </TouchableOpacity>
                </View>
                <Text style={{fontSize: 18, paddingBottom: -40}} className='font-bold'>Instagram</Text>
                <View style={{width: wp(50)}} className="flex-row gap-5 bg-neutral-100 px-4 items-center rounded-2xl">
                <FontAwesome6 name="instagram" size={hp(2.5)} color="black"/>
                    <TextInput
                    style={{fontSize: hp(2), height: hp(5), width: wp(38)}}
                    autoCapitalize="none"
                    className="flex-row font-semibold rounded-2xl px-4 bg-neutral-100"
                    placeholder='shivpandeyy05'
                    />
                    <TouchableOpacity style={{width: wp(38), height: hp(4.7), backgroundColor: '#6e63e0', alignSelf: 'flex-end', marginLeft: -5}} onPress={() => router.replace({pathname: '/VerifyNum'})} className="flex-row rounded-full border border-neutral-500 justify-between items-center shadow shadow-neutral-300">
                        <Text className="text-white font-semibold items-center justify-center items-center pl-3  text-center  tracking-wider">Follow on Insta </Text>
                        <Entypo name="instagram" size={hp(1.8)} color="white" className='pr-3 pl-1' />
                    </TouchableOpacity>
                </View>
                
                {/* <Text style={{fontSize: 18, paddingBottom: -40}} className='font-bold'>Password</Text>
                <View className="flex-row gap-5 bg-neutral-100 px-4 items-center rounded-2xl">
                    <Octicons name="lock" size={hp(2.7)} color="black"/>
                    <TextInput
                    style={{fontSize: hp(2), height: hp(5), width: wp(100)}}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    className="flex-1 font-bold rounded-2xl px-4 bg-neutral-100"
                    placeholder='************'
                    />
                </View> */}

                <Text style={{fontSize: 18, paddingBottom: -40}} className='font-bold'>Phone number</Text>
                <View className="flex-row gap-5 bg-neutral-100 px-4 pb-30 items-center rounded-2xl">
                    <Feather name="phone" size={hp(2.7)} color="black"/>
                    {/* <PhoneInput
                        ref={phoneInput}
                        defaultValue={value}
                        defaultCode="DM"
                        layout="first"
                        onChangeText={(text) => {
                        setValue(text);
                        }}
                        onChangeFormattedText={(text) => {
                        setFormattedValue(text);
                        }}
                        withDarkTheme
                        withShadow
                        autoFocus
                    /> */}
                    <View style={{borderRadius: 10, height: hp(2.9)}} className='flex-row gap-1 items-center pr-2'>
                        <Text style={{color: 'gray', fontSize: hp(2)}} className='pl-3 font-bold'>+1</Text>
                        {/* <AntDesign name='caretdown' size={15} color="gray" /> */}
                    </View>
                    <TextInput
                    style={{fontSize: hp(2), height: hp(5), width: wp(100), paddingLeft: -50}}
                    autoCapitalize="none"
                    className="flex-1 font-semibold rounded-2xl px-4 bg-neutral-100"
                    placeholder='(109)-876-5432'
                    />
                </View>
                <Text style={{fontSize: 18, paddingBottom: -40}} className='font-bold'>Gender</Text>
                <View className="flex-row gap-5 bg-neutral-100 px-4 items-center rounded-2xl">
                    <FontAwesome6 name="person-half-dress" size={hp(2.7)} color="black"/>
                    <DropdownComponent />
                </View>
                </ScrollView>
                <View className='pb-5'>
                <TouchableOpacity style={{width: wp(38), height: hp(5), backgroundColor: '#6e63e0', alignSelf: 'center'}} onPress={() => router.replace({pathname: '/VerifyNum'})} className="flex-row rounded-full border border-neutral-500 items-center shadow shadow-neutral-300">
                        <Text style={{marginLeft: 23, fontSize: hp(2)}} className="text-white font-semibold items-center text-center tracking-wider">Save Details</Text>
                        {/* <Entypo name="instagram" size={hp(1.8)} color="white" className='pr-3 pl-1' /> */}
                </TouchableOpacity>
                </View>

            </View>
        </View>
    // </CustomKeyboard>
  )
}