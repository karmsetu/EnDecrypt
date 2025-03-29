import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function useAsyncStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(initialValue);
    const [isLoading, setIsLoading] = useState(true);

    // Load data from storage on initial render
    useEffect(() => {
        const loadData = async () => {
            try {
                const item = await AsyncStorage.getItem(key);
                const value = item ? JSON.parse(item) : initialValue;
                setStoredValue(value);
            } catch (error) {
                console.error('Error reading from AsyncStorage:', error);
                setStoredValue(initialValue);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [key, initialValue]);

    // Update AsyncStorage whenever the state changes
    const setValue = async (value: T | ((val: T) => T)) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error('Error saving to AsyncStorage:', error);
        }
    };

    // Remove item from storage
    const removeValue = async () => {
        try {
            await AsyncStorage.removeItem(key);
            setStoredValue(initialValue);
        } catch (error) {
            console.error('Error removing from AsyncStorage:', error);
        }
    };

    return { storedValue, setValue, removeValue, isLoading } as const;
}

export default useAsyncStorage;
