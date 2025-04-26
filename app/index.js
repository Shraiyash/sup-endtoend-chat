import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

export default function StartPage() {
  const router = useRouter();

  // useEffect(() => {
  //   // Redirect to the sign in page on mount.
  //   router.replace('/signIn');
  // }, []);

  return (
    <View style= {{backgroundColor: '#6e63e0'}} className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="gray" />
    </View>
  );
}