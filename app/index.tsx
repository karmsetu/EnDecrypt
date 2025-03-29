import { appConfig } from '@/constants/config';
import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { io, Socket } from 'socket.io-client';

type Message = {
    sender: string;
    text: string;
    timestamp: Date;
};

const socket: Socket = io(appConfig.baseURL);

const Chat = () => {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [users, setUsers] = useState<string[]>([]);
    const [joined, setJoined] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);
    const [panelCollapsed, setPanelCollapsed] = useState(false);

    useEffect(() => {
        socket.on('message', (msg: Message) => {
            setMessages((prev) => [...prev, msg]);
        });

        socket.on('user-list', (userList: string[]) => {
            setUsers(userList);
        });

        return () => {
            socket.off('message');
            socket.off('user-list');
        };
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    };

    const handleJoin = () => {
        if (username.trim()) {
            socket.emit('join', username.trim());
            setJoined(true);
        }
    };

    const handleSendMessage = () => {
        if (message.trim()) {
            socket.emit('send-message', message.trim());
            setMessage('');
        }
    };

    if (!joined) {
        return (
            <View className="flex-1 justify-center items-center bg-gray-100 p-5">
                <View className="w-full bg-white rounded-lg p-5 shadow shadow-black shadow-opacity-10 elevation-3">
                    <Text className="text-2xl font-bold mb-5 text-gray-800">
                        Join the Chat
                    </Text>
                    <TextInput
                        className="w-full border border-gray-300 rounded p-3 mb-4 text-gray-800"
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Enter your username"
                        placeholderTextColor="#999"
                    />
                    <TouchableOpacity
                        className="bg-blue-500 rounded p-3 items-center"
                        onPress={handleJoin}
                    >
                        <Text className="text-white font-bold">Join</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View className="flex-1 flex-row bg-gray-100">
            {/* Users Panel */}
            <View
                className={`bg-white p-2 border-r border-gray-300 ${
                    panelCollapsed ? 'w-10' : 'w-24'
                } relative`}
            >
                <TouchableOpacity
                    className="absolute -right-4 top-5 bg-blue-500 w-8 h-8 rounded-full justify-center items-center z-10"
                    onPress={() => setPanelCollapsed(!panelCollapsed)}
                >
                    <Text className="text-white font-bold">
                        {panelCollapsed ? '▶' : '◀'}
                    </Text>
                </TouchableOpacity>

                {!panelCollapsed && (
                    <>
                        <Text className="text-sm font-bold mb-2 mt-2 text-gray-800">
                            Online Users ({users.length})
                        </Text>
                        <ScrollView>
                            {users.map((user, index) => (
                                <View
                                    key={index}
                                    className="p-2 mb-1 bg-gray-100 rounded"
                                >
                                    <Text>{user}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </>
                )}
            </View>

            {/* Chat Container */}
            <View className="flex-1 flex-col">
                <ScrollView
                    ref={scrollViewRef}
                    className="flex-1 p-3"
                    contentContainerStyle={{ paddingBottom: 15 }}
                >
                    {messages.map((msg, index) => (
                        <View
                            key={index}
                            className={`mb-3 ${
                                msg.sender === 'System'
                                    ? 'items-center'
                                    : msg.sender === username
                                    ? 'items-end'
                                    : ''
                            }`}
                        >
                            {msg.sender !== 'System' &&
                                msg.sender !== username && (
                                    <Text className="font-bold text-gray-700 mb-1">
                                        {msg.sender}
                                    </Text>
                                )}
                            <View
                                className={`p-3 rounded-xl max-w-[80%] ${
                                    msg.sender === 'System'
                                        ? 'bg-gray-200'
                                        : msg.sender === username
                                        ? 'bg-blue-500'
                                        : 'bg-white'
                                }`}
                            >
                                <Text
                                    className={`${
                                        msg.sender === username
                                            ? 'text-white'
                                            : 'text-gray-800'
                                    }`}
                                >
                                    {msg.text}
                                </Text>
                            </View>
                            <Text className="text-xs text-gray-500 mt-1">
                                {new Date(msg.timestamp).toLocaleTimeString()}
                            </Text>
                        </View>
                    ))}
                </ScrollView>

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    className="flex-row p-2 bg-white border-t border-gray-300"
                >
                    <TextInput
                        className="flex-1 border border-gray-300 rounded-full px-4 py-2 mr-2"
                        value={message}
                        onChangeText={setMessage}
                        placeholder="Type a message..."
                        placeholderTextColor="#999"
                    />
                    <TouchableOpacity
                        className="bg-blue-500 rounded-full px-5 py-2 justify-center items-center"
                        onPress={handleSendMessage}
                    >
                        <Text className="text-white font-bold">Send</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </View>
    );
};

export default Chat;
