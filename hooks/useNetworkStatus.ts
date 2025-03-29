import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

export default function useNetworkStatus() {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        // Subscribe to connection changes
        const unsubscribe = NetInfo.addEventListener((state) => {
            setIsOnline(state.isInternetReachable ?? false);
        });

        // Initial check
        NetInfo.fetch().then((state) => {
            setIsOnline(state.isInternetReachable ?? false);
        });

        return () => unsubscribe();
    }, []);

    return isOnline;
}
