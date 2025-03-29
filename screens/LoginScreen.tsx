import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

type LoginScreenProps = any;

export default function LoginScreen({ navigation }: LoginScreenProps) {
    const [username, setUsername] = useState<string>('');

    const handleLogin = () => {
        if (username.trim()) {
            navigation.navigate('Chat', { username });
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-blue-50"
        >
            <View className="flex-1 justify-center px-8">
                <View className="items-center mb-8">
                    {/* <Image
                        source={require('../../assets/chat-icon.png')}
                        className="w-24 h-24"
                        resizeMode="contain"
                    /> */}
                    <Text className="text-3xl font-bold text-blue-600 mt-4">
                        ChatApp
                    </Text>
                    <Text className="text-gray-500 text-center mt-2">
                        Connect with friends in real-time
                    </Text>
                </View>

                <View className="bg-white p-6 rounded-xl shadow-md">
                    <Text className="text-gray-700 text-lg mb-2">
                        Enter your username
                    </Text>
                    <TextInput
                        className="bg-gray-100 p-4 rounded-lg text-gray-800 mb-4"
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                    />

                    <TouchableOpacity
                        className="bg-blue-500 p-4 rounded-lg items-center"
                        onPress={handleLogin}
                    >
                        <Text className="text-white font-bold text-lg">
                            Join Chat
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
