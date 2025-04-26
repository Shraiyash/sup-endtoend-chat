import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Slot, useRouter, useSegments } from 'expo-router'
import { AuthContextProvider, useAuth } from '../context/authContext'
import "../global.css"
import { MenuProvider } from 'react-native-popup-menu'

const MainLayout = () => {
    const {isAuthenticated} = useAuth();
    const segments = useSegments();
    const router = useRouter();


    // Check if the user is authenticated
    // If not, redirect to the login page
    useEffect(() => {
        if(typeof isAuthenticated === 'undefined') return;
        const inApp = segments[0] == '(app)';
        if(isAuthenticated && !inApp) {
            // Redirect to home
            router.replace('home');
            
        } else if(isAuthenticated==false) {
            // Redirect to sign in
            router.replace('signIn');
        }    
    }, [isAuthenticated])

    return (
        <Slot style={{backgroundColor: '#6e63e0'}}/>
    )

}

export default function RootLayout() {
    return (
        <MenuProvider style={{backgroundColor: 'white'}}>
            <AuthContextProvider>
            <MainLayout />
            </AuthContextProvider>
        </MenuProvider>
    )
}