import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { Socket } from 'socket.io-client';
import io from 'socket.io-client';
import { Message } from '../types';

type ChatScreenProps = any;

export default function ChatScreen({ route }: ChatScreenProps) {
    const { username } = route.params;
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [connectedUsers, setConnectedUsers] = useState<number>(0);
    const socketRef = useRef<Socket | null>(null);
    const flatListRef = useRef<FlatList | null>(null);

    useEffect(() => {
        // Replace with your server URL
        socketRef.current = io('http://YOUR_SERVER_IP:3000');

        socketRef.current.emit('join', { username });

        socketRef.current.on('message', (newMessage: Message) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        socketRef.current.on('userCount', (count: number) => {
            setConnectedUsers(count);
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, [username]);

    const sendMessage = () => {
        if (message.trim() && socketRef.current) {
            const newMessage: Message = {
                id: Date.now().toString(),
                text: message,
                sender: username,
                timestamp: new Date().toISOString(),
            };

            socketRef.current.emit('message', newMessage);
            setMessage('');
        }
    };

    const renderMessageItem = ({ item }: { item: Message }) => {
        const isMyMessage = item.sender === username;

        return (
            <View
                className={`my-1 max-w-3/4 ${
                    isMyMessage ? 'self-end' : 'self-start'
                }`}
            >
                {!isMyMessage && (
                    <Text className="text-gray-500 text-xs ml-2">
                        {item.sender}
                    </Text>
                )}
                <View
                    className={`rounded-2xl p-3 ${
                        isMyMessage
                            ? 'bg-blue-500 rounded-tr-none'
                            : 'bg-gray-200 rounded-tl-none'
                    }`}
                >
                    <Text
                        className={isMyMessage ? 'text-white' : 'text-gray-800'}
                    >
                        {item.text}
                    </Text>
                </View>
                <Text
                    className={`text-xs text-gray-400 mt-1 ${
                        isMyMessage ? 'text-right mr-2' : 'ml-2'
                    }`}
                >
                    {new Date(item.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </Text>
            </View>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
                <Text className="text-lg font-bold text-blue-600">ChatApp</Text>
                <Text className="text-gray-500">{connectedUsers} online</Text>
            </View>

            <FlatList
                ref={flatListRef}
                className="flex-1 px-4"
                data={messages}
                renderItem={renderMessageItem}
                keyExtractor={(item) => item.id}
                onContentSizeChange={() => {
                    if (flatListRef.current) {
                        flatListRef.current.scrollToEnd({ animated: true });
                    }
                }}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View className="flex-row items-center p-2 border-t border-gray-200">
                    <TextInput
                        className="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-2"
                        placeholder="Type a message..."
                        value={message}
                        onChangeText={setMessage}
                        multiline
                    />
                    <TouchableOpacity
                        className="bg-blue-500 w-10 h-10 rounded-full items-center justify-center"
                        onPress={sendMessage}
                    >
                        <Text className="text-white text-lg">→</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
