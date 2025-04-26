import { View, Text } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'
import Home from './home'
import HomeHeader from '../../components/HomeHeader'
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function _layout() {
  return (
    <SafeAreaProvider>
      <View style={{ backgroundColor: '#6e63e0', flex: 1 }}>
        <Stack>
          <Stack.Screen
            name="home"
            options={{
              header: () => <HomeHeader />,
            }}
          />
        </Stack>
      </View>
    </SafeAreaProvider>
  );
}