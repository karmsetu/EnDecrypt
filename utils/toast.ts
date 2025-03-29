import Toast from 'react-native-toast-message';

export const showToast = {
    success: (message: string, subMessage?: string) => {
        Toast.show({
            type: 'success',
            text1: message,
            text2: subMessage,
        });
    },
    error: (message: string, subMessage?: string) => {
        Toast.show({
            type: 'error',
            text1: message,
            text2: subMessage,
        });
    },
    info: (message: string, subMessage?: string) => {
        Toast.show({
            type: 'info',
            text1: message,
            text2: subMessage,
        });
    },
};
