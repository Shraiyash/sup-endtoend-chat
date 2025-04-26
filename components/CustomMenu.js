import {
    MenuOption,
} from 'react-native-popup-menu';
import {widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Text } from 'react-native';
import {View } from 'react-native';

  

export const MenuItem = ({ text, value, action, icon }) => {
    return (
       <MenuOption onSelect={() => action(value)}>
        <View className="px-4 justify-between flex-row py-1 items-center gap-2">
            <Text style={{fontSize: hp(1.7)}} className="text-black font-semibold">
                {text}
            </Text>
            {icon}
        </View>
       </MenuOption>
    );
}