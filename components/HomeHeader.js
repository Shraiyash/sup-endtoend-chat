import { View, Text, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuth } from '../context/authContext'
import { Image } from 'expo-image'
import { blurhash } from '../utils/common'
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu'
import { MenuItem } from './CustomMenu'
import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router';
import InstaStory from 'react-native-insta-story';



const ios = Platform.OS === 'ios';

export default function HomeHeader() {
  const { logout, user } = useAuth();
  const { top } = useSafeAreaInsets();
    const [users, setUsers] = useState([]);

    const sendProfile = () => {
      router.push({pathname: '/profile'})   
    }
    

  const handleProfiel = () => {
    console.log('profile');
  }
  const handleLogout = async () => {
    await logout();
  }

  const data = [
    // {
    //   user_id: 1,
    //   user_image:
    //     'https://ieeexplore.ieee.org/mediastore/IEEE/content/author_profile_image/37089914428.png',
    //   user_name: 'Add Story',
    //   stories: [
    //     {
    //       story_id: 1,
    //       story_image:
    //         'https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg',
    //       swipeText: 'Custom swipe text for this story',
    //       onPress: () => console.log('story 1 swiped'),
    //     },
    //     {
    //       story_id: 2,
    //       story_image:
    //         'https://image.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-601.jpg',
    //     },
    //   ],
    // },
    {
      user_id: 6,
      user_image:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3164&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      user_name: 'Hannah',
      stories: [
        {
          story_id: 1,
          story_image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjORKvjcbMRGYPR3QIs3MofoWkD4wHzRd_eg&usqp=CAU',
          swipeText: 'Custom swipe text for this story',
          onPress: () => console.log('story 1 swiped'),
        },
        {
          story_id: 2,
          story_image:
            'https://files.oyebesmartest.com/uploads/preview/vivo-u20-mobile-wallpaper-full-hd-(1)qm6qyz9v60.jpg',
          swipeText: 'Custom swipe text for this story',
          onPress: () => console.log('story 2 swiped'),
        },
      ],
    },
    {
      user_id: 2,
      user_image:
        'https://media.licdn.com/dms/image/v2/D4D03AQG5S3hs82xPuw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1719669198734?e=2147483647&v=beta&t=TETjnLA-liBT583moBmVs_Z8cw1kuT_WZ1BUjXNYCrg',
      user_name: 'Harsh',
      stories: [
        {
          story_id: 1,
          story_image:
            'https://media.licdn.com/dms/image/v2/D4D22AQEouiCYeOHCHA/feedshare-shrink_1280/B4DZZPoGHqGgAo-/0/1745092636101?e=1747872000&v=beta&t=_5IUNaGKNM9KQiCgtIFoY5dD4bsRP2vh0-eAeivyMSw',
          swipeText: '',
          onPress: () => console.log('story 1 swiped'),
        },
        {
          story_id: 2,
          story_image:
            'https://files.oyebesmartest.com/uploads/preview/vivo-u20-mobile-wallpaper-full-hd-(1)qm6qyz9v60.jpg',
          swipeText: 'Custom swipe text for this story',
          onPress: () => console.log('story 2 swiped'),
        },
      ],
    },
    {
      user_id: 3,
      user_image:
        'data:image/jpeg;base64,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',
      user_name: 'Dad',
      stories: [
        {
          story_id: 1,
          story_image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjORKvjcbMRGYPR3QIs3MofoWkD4wHzRd_eg&usqp=CAU',
          swipeText: 'Custom swipe text for this story',
          onPress: () => console.log('story 1 swiped'),
        },
        {
          story_id: 2,
          story_image:
            'https://files.oyebesmartest.com/uploads/preview/vivo-u20-mobile-wallpaper-full-hd-(1)qm6qyz9v60.jpg',
          swipeText: 'Custom swipe text for this story',
          onPress: () => console.log('story 2 swiped'),
        },
      ],
    },
    {
      user_id: 4,
      user_image:
        'https://media.licdn.com/dms/image/v2/D4D03AQG_LjiELi36Jw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1726805448542?e=1750291200&v=beta&t=knJaYmrwY4RGFH8a7dEBa1L5T8ESaCyQ0vxT7NIVmQU',
      user_name: 'Rebanta',
      stories: [
        {
          story_id: 1,
          story_image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjORKvjcbMRGYPR3QIs3MofoWkD4wHzRd_eg&usqp=CAU',
          swipeText: 'Custom swipe text for this story',
          onPress: () => console.log('story 1 swiped'),
        },
        {
          story_id: 2,
          story_image:
            'https://files.oyebesmartest.com/uploads/preview/vivo-u20-mobile-wallpaper-full-hd-(1)qm6qyz9v60.jpg',
          swipeText: 'Custom swipe text for this story',
          onPress: () => console.log('story 2 swiped'),
        },
      ],
    },
    {
      user_id: 5,
      user_image:
        'https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      user_name: 'Josh',
      stories: [
        {
          story_id: 1,
          story_image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjORKvjcbMRGYPR3QIs3MofoWkD4wHzRd_eg&usqp=CAU',
          swipeText: 'Custom swipe text for this story',
          onPress: () => console.log('story 1 swiped'),
        },
        {
          story_id: 2,
          story_image:
            'https://files.oyebesmartest.com/uploads/preview/vivo-u20-mobile-wallpaper-full-hd-(1)qm6qyz9v60.jpg',
          swipeText: 'Custom swipe text for this story',
          onPress: () => console.log('story 2 swiped'),
        },
      ],
    }
  ];

    useEffect(() => {
      if(user?.uid){
        getUsers();
      }
    }, [])
  
    const getUsers = async () => {
        // fetch users
        const q = query(usersRef, where('userId', '!=', user?.uid));
  
        const querySnapshot = await getDocs(q);
        let data = [];
        querySnapshot.forEach(doc => {
            data.push({...doc.data()});
        });
  
        setUsers(data);
    }

  return (
    <View style={{ paddingTop: ios ? top : top + 20, backgroundColor: '#6e63e0' }} className="px-5 pb-6">
      {/* First Row */}
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center pt-2 pb-1">
          <Text style={{}}className="text-3xl text-neutral-200 font-semibold text-center tracking-wider">Sup, </Text>
          {/* <Text style={{ fontSize: 19, color: 'white' }}>Sup,</Text> */}
          <Text style={{ color: 'white'}} className="text-3xl text-black font-bold">
            {" "}
            {user && (user.username || user.displayName)
              ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
              : "Guest"} 🤙
          </Text>
        </View>
        <View className="flex-row items-center pt-2 pb-1">
          <Menu>
            <MenuTrigger>
              <Image
                style={{ height: hp(4.7), aspectRatio: 1, borderRadius: 100 }}
                source={user?.profileUrl}
                placeholder={blurhash}
                transition={100}
              />
            </MenuTrigger>
            <MenuOptions
              customStyles={{
                optionsContainer: {
                  borderRadius: 15,
                  borderCurve: 'continuous',
                  borderWidth: 0,
                  marginTop: 47,
                  backgroundColor: 'white',
                  shadowOpacity: 0.2,
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 10,
                  shadowColor: 'black',
                }
              }}
            >
              <MenuItem
                text="Profile"
                action={sendProfile}
                value={null}
                icon={<MaterialIcons name="person-outline" size={hp(2.9)} color="black" />}
              />
              <Divider />
              <MenuItem
                text="Sign Out"
                action={handleLogout}
                value={null}
                icon={<MaterialCommunityIcons name="logout" size={hp(2.5)} color="black" />}
              />
            </MenuOptions>
          </Menu>
        </View>
      </View>

      {/* Second Row */}
      <View className="flex-row items-center pt-4">
           <View className='my-[-50px]'>
              <Image
                  style={{ borderColor: 'white', height: hp(7.5), aspectRatio: 1, borderRadius: 100, marginBottom: -5, marginRight: 10, marginTop: 2 }}
                  source={user?.profileUrl}
                  placeholder={blurhash}
                  transition={100}
                  borderCurve="continuous"
                  borderColor= 'white'
                  borderWidth={2}
                  borderRadius={100}
              />
              <Text style={{fontSize: 10, marginTop: 10, fontWeight: "bold"}} className='text-white font-bold'>Add to Story</Text>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 15,
                    right: 12,
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
                  <Text style={{ color: 'black', fontSize: 14 }}>+</Text>
                </View>
            </View>
            <InstaStory
            data={data}
            duration={10}
            avatarSize={hp(7)}
            pressedAvatarTextColor= 'white'
            unPressedAvatarTextColor= 'white'
            pressedBorderColor= 'black'
            unPressedBorderColor= 'white'

            style={{ marginTop: -8, marginBottom: -10, marginLeft: -10}}
            avatarTextStyle={{
              color: 'white', fontWeight: 'bold'
            }}
          />




      </View>
    </View>
  )
}

const Divider = () => {
  return (
    <View className="w-full h-0.5 bg-gray-200" />
  )
}