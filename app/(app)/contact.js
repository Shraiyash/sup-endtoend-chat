import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Keyboard, ScrollView, StyleSheet, Image } from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import { useLocalSearchParams } from 'expo-router'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import { useRouter } from 'expo-router';
import MessageList from '../../components/MessageList';
// import { FeatherIcon } from '@expo/vector-icons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import CustomKeyboard from '../../components/customKeyboard';
import { useAuth } from '../../context/authContext';
import { db } from '../../firebaseConfig';
import { addDoc, collection, onSnapshot, orderBy, query, Timestamp } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { getRoomId } from '../../utils/common';
import ContactHeader from '../../components/ContactHeader';
import Contacts from 'react-native-contacts';
import ContactsList from '../../components/ContactsList';
import { Ionicons } from '@expo/vector-icons';


const CONTACTS = [
    {
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3164&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Hannah Abbot',
      phone: '+1 (972) 566-2684',
    },
    // {
    //   img: 'https://hrilab.weill.cornell.edu/sites/default/files/styles/panopoly_image_original/public/member_images/kaur_gunisha_cropped.jpg?itok=HzJOb0jx',
    //   name: 'Gunisha',
    //   phone: '+1 (845) 456-2237',
    // },
    {
      img: 'https://media.licdn.com/dms/image/v2/D4E03AQFFWAG6oQhkpA/profile-displayphoto-shrink_800_800/B4EZRL3MsdGwAc-/0/1736439549665?e=1750896000&v=beta&t=dUHnqd0n1yiVKkvcBZTvdUMGP34MU0LUknXax-EzitM',
      name: 'Nitish',
      phone: '+1 (959) 422-3635',
    },
    {
      img: 'https://media.licdn.com/dms/image/v2/D4D03AQGs7F0qM2wGuQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1690733219080?e=1750896000&v=beta&t=shNgggHf8hQndVQSn2X9jRqYW6xwZxB0MAAk_ZOUauo',
      name: 'Abhik Kumar De',
      phone: '+1 (951) 472-2967',
    },
    {
      img: 'https://adplist-bucket.s3.amazonaws.com/media/profile_photos/8dc83a3f50394bd897956ad4ec7b8421UdqrN.webp',
      name: 'Dad',
      phone: '+1 (887) 478-2693',
    },
    {
      img: 'https://images.unsplash.com/photo-1573497019236-17f8177b81e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
      name: 'Shelby Ballard',
      phone: '+1 (824) 467-3579',
    },
    // {
    //   img: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
    //   name: 'Bernard Baker',
    //   phone: '+1 (862) 581-3022',
    // },
    {
      img: 'https://media.licdn.com/dms/image/v2/D4D03AQG5S3hs82xPuw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1719669198734?e=2147483647&v=beta&t=TETjnLA-liBT583moBmVs_Z8cw1kuT_WZ1BUjXNYCrg',
      name: 'Harsh',
      phone: '+1 (913) 497-2020',
    },
  ];



export default function contact() {
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

    const sections = React.useMemo(() => {
        const sectionsMap = CONTACTS.reduce((acc, { name, img, phone }) => {
          // Split on spaces and grab the first name
          const [firstName] = name.split(' ');
          const letter = firstName[0].toUpperCase();
      
          // Accumulate into buckets by that initial
          acc[letter] = acc[letter] || [];
          acc[letter].push({ name, img, phone });
          return acc;
        }, {});
      
        // Turn into sorted array
        return Object.entries(sectionsMap)
          .map(([letter, items]) => ({ letter, items }))
          .sort((a, b) => a.letter.localeCompare(b.letter));
      }, []);


    Contacts.getAll().then(contacts => {
        // setContacts(contacts);
    });


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
            <ContactHeader item={item} router={router}/>
            <View style={{backgroundColor: '#6e63e0', height: 10}} />
            <View style={{ flex: 1, backgroundColor: 'white', borderTopLeftRadius: 50, borderTopRightRadius: 50, overflow: 'hidden', paddingBottom: insets.bottom, }}>
            <ScrollView contentContainerStyle={styles.container}>
                {/* <View style={styles.header}>
                <Text style={styles.title}>Contacts</Text>
                </View> */}
                <View className='pt-8 pb-5'>
                    <View style={{height: hp(1.8)}}className='flex-row items-center justify-between mx-3 pb-1'>
                        <View style={{borderWidth: 2}}className='flex-row justify-between bg-white border border-neutral-300 rounded-full pl-4'>
                            <TouchableOpacity style={{backgroundColor: '#6e63e0'}}className='items-center my-[4px] mx-[-10px] justify-center rounded-full'>
                                <Ionicons style={{alignItems: 'center'}} name="search" size={hp(2.5)} color="white" className='pl-2 pr-2' />
                            </TouchableOpacity>
                            <TextInput
                                ref={inputRef}
                                placeholder="Search"
                                style={{fontSize: hp(2.2), width: wp(80), height: hp(5)}}
                                className="flex-1 pl-5 rm-2"
                            />
                            
                    </View>
                    </View>

                </View>
                {sections.map(({ letter, items }) => (
                <View style={styles.section} key={letter}>
                    <Text style={styles.sectionTitle}>{letter}</Text>
                    <View style={styles.sectionItems} className='gap-3'>
                    {items.map(({ img, name, phone }, index) => {
                        return (
                        <View key={index} style={styles.cardWrapper}>
                            <TouchableOpacity
                            onPress={() => {
                                // handle onPress
                            }}>
                            <View style={styles.card}>
                                {img ? (
                                <Image
                                    alt=""
                                    resizeMode="cover"
                                    source={{ uri: img }}
                                    style={styles.cardImg} />
                                ) : (
                                <View style={[styles.cardImg, styles.cardAvatar]}>
                                    <Text style={styles.cardAvatarText}>{name[0]}</Text>
                                </View>
                                )}
                                <View style={styles.cardBody}>
                                <Text style={styles.cardTitle}>{name}</Text>
                                <Text style={styles.cardPhone}>{phone}</Text>
                                </View>
                                <View style={styles.cardAction} className='flex-row justify-between gap-2'>
                                    <Text className='pt-1 font-semibold'>Say Sup </Text>
                                <Ionicons
                                    color="#6e63e0"
                                    name="chatbubble"
                                    size={22} />
                                </View>
                            </View>
                            </TouchableOpacity>
                            
                        </View>
                        
                        );
                    })}
                    </View>
                </View>
                ))}
            </ScrollView>
            </View>
        </View>
    </CustomKeyboard>
  )
}

const styles = StyleSheet.create({
    container: {
      paddingVertical: 24,
      paddingHorizontal: 0,
    },
    header: {
      paddingHorizontal: 24,
    },
    title: {
      fontSize: 32,
      fontWeight: '700',
      color: '#1d1d1d',
      marginBottom: 12,
    },
    /** Section */
    section: {
      marginTop: 12,
      paddingLeft: 12,
      paddingRight: 12,
      paddingBottom: 10
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: '#000',
    },
    sectionItems: {
      marginTop: 8,
    },
    /** Card */
    card: {
      paddingVertical: 14,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingBottom: 14
    //   marginRight: 30
    },
    cardWrapper: {
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#d6d6d6',
    //   marginRight: 12
    //   padding: 2,
    //   marginLeft: 2
    },
    cardImg: {
      width: 62,
      height: 52,
      borderRadius: 100,
      paddingLeft: 10,
      marginRight: 10
    },
    cardAvatar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#9ca1ac',
    },
    cardAvatarText: {
      fontSize: 19,
      fontWeight: 'bold',
      color: '#fff',
    },
    cardBody: {
      marginRight: 'auto',
      marginLeft: 8,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: '#000',
    },
    cardPhone: {
      fontSize: 15,
      lineHeight: 20,
      fontWeight: '500',
      color: '#616d79',
      marginTop: 3,
    },
    cardAction: {
      paddingRight: 16,
    },
  });