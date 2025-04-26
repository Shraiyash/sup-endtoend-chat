import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Image } from 'expo-image'
import { blurhash, formattedDate, getRoomId, renderTime } from '../utils/common'
import { router } from 'expo-router'
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebaseConfig'


    
export default function ChatItem({item, noBorder, router, currentUser}) {

    const [lastMessage, setLastMessage] = useState(undefined);

    useEffect(() => {    
            let roomId = getRoomId(currentUser?.userId, item?.userId);
            const docRef = doc(db, 'rooms', roomId);
            const messagesRef = collection(docRef, "messages");
            const q = query(messagesRef, orderBy('createdAt', 'desc'));
    
            let unsub = onSnapshot(q, (snapShot) => {
                let allMessages = snapShot.docs.map(doc => {
                    return doc.data();
                })
                setLastMessage(allMessages[0]? allMessages[0]: null);
            });
    
            return unsub;
        }, [])

        console.log('last message', lastMessage);
    
    const openChatRoom = () => {
        router.push({pathname: '/chatRoom', params: item})   
    }

    const styles = StyleSheet.create({
        boldText: {
          fontWeight: 'bold',
        },
      });

    const getTime = ()=> {
        if(lastMessage){
            let date = lastMessage?.createdAt;
            return formattedDate(new Date(date?.seconds * 1000));
        }
        

    }

    

    const renderLastMessage = ()=> {
        if(typeof lastMessage =='undefined') return 'Loading...';
        if(lastMessage){
            if(currentUser?.userId == lastMessage?.userId) return "You: "+lastMessage?.text;
            return lastMessage?.text;
        }else{
            return 'Say Sup, 🤙';
        }
    }
  return (
    <TouchableOpacity style={{paddingTop: 10, paddingBottom: 20}} className={'mx-4 pb-2 mb-4 justify-between flex-row gap-4 items-center' + (noBorder ? '' : ' border-b border-neutral-200')} onPress={openChatRoom}>
    
        {/* <Image 
            source={{uri: item?.profileUrl}}
            style={{width: hp(7), height: hp(7)}}
            className="rounded-full"
        /> */}
        <Image
            style={{width: hp(7), height: hp(7), borderRadius: 100}}
            source={item?.profileUrl}
            placeholder={blurhash}
            transition={100}
        />


        <View style={{}} className="flex-1 gap-1">
            <View className='pt-2 flex-row justify-between'>
                <Text style={{fontSize: hp(2.2)}} className="text-black font-bold">
                {item && (item?.username || item?.displayName)
              ? item?.username.charAt(0).toUpperCase() + item?.username.slice(1)
              : "Guest"}
                </Text>
                <Text style={{fontSize: hp(1.5)}} className="font-medium text-neutral-400">
                    {getTime()}
                </Text>
            </View>
            <View className='pt-2 flex-row justify-between'>
                <Text style={{fontSize: hp(1.7)}} className="font-medium text-neutral-400">

                {
                          item?.username == 'harsh' ? (
                            <Text style={{ fontWeight: 'bold', color: 'black' }}>
                                {renderLastMessage()}
                            </Text>
                          ) : (
                            renderLastMessage()
                          )
                }
                </Text>
                {
                          item?.username == 'harsh' ? (
                              
                              <Text> 🟣 </Text>
                          ) : (
                                <Text></Text>
                          )
                }
            </View>
        </View>
    </TouchableOpacity>
  )
}