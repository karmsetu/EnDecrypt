import '@/global.css';
import { Stack } from 'expo-router';
import useNetworkStatus from '@/hooks/useNetworkStatus';
import Toast from 'react-native-toast-message';
import { showToast } from '@/utils/toast';

export default function RootLayout() {
    const isOnline = useNetworkStatus();
    if (!isOnline) {
        showToast.error('Offline', 'you are not connected to internet');
    }
    return (
        <>
            <Stack>
                <Stack.Screen
                    name="index"
                    options={{
                        headerShown: true,
                        headerTitle: 'InDEcyptor',
                        headerStyle: { backgroundColor: 'white' },
                    }}
                />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
            <Toast />
        </>
    );
}
