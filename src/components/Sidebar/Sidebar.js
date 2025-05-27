// filepath: d:\DATN\supportchatbot\frontenduser\src\components\Sidebar\Sidebar.js
import React, { useContext, useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { assets } from '../../assets/assets';
import { Context } from "../../context/context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Sidebar = ({ navigation }) => { // Removed setSelectedChatSession prop
    const { onSent, setRecentPrompt, newChat, setChatMessages, selectedChatSession, setSelectedChatSession, reloadChatSessions } = useContext(Context);
    const [chatSessions, setChatSessions] = useState([]);

    useEffect(() => {
        loadChatSessions();
    }, [reloadChatSessions]);

    const loadChatSessions = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const response = await axios.get('http://192.168.1.96:5000/chatSessions/user', {
                headers: { Authorization: token }
            });
            setChatSessions(response.data);
        } catch (error) {
            console.error("Error loading chat sessions:", error);
            Alert.alert("Error", "Could not load chat sessions");
        }
    };

    const loadChatSession = async (chatSessionId) => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const response = await axios.get(`http://192.168.1.96:5000/chatSessions/${chatSessionId}`, {
                headers: { Authorization: token }
            });
            const chatSession = response.data;
            setSelectedChatSession(chatSession); // Set the selected chat session in Context
            setRecentPrompt(chatSession.title);
            setChatMessages(chatSession.messages); // Set the chat messages in Context
            navigation.closeDrawer();
        } catch (error) {
            console.error("Error loading chat session:", error);
            Alert.alert("Error", "Could not load chat session");
        }
    };

    const deleteChatSession = async (chatSessionId) => {
        Alert.alert(
            "Delete Chat Session",
            "Are you sure you want to delete this chat session?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: async () => {
                        try {
                            const token = await AsyncStorage.getItem('userToken');
                            await axios.delete(`http://192.168.1.96:5000/chatSessions/${chatSessionId}`, {
                                headers: { Authorization: token }
                            });
                            if (chatSessionId === selectedChatSession._id) {
                                makenewChat(); // Call makenewChat to reset the chat
                            }
                            loadChatSessions(); // Refresh chat sessions after deletion
                        } catch (error) {
                            console.error("Error deleting chat session:", error);
                            Alert.alert("Error", "Could not delete chat session");
                        }
                    }
                }
            ]
        );
    };

    const navigateToMain = () => {
        navigation.navigate('Main'); // Navigate to Main screen
        navigation.closeDrawer(); // Close the drawer
    };

    const makenewChat = () => {
        navigation.navigate('Main'); // Navigate to Main screen
        navigation.closeDrawer(); // Close the drawer
        newChat(); // Call newChat from context
    }

    return (
        <View style={styles.sidebar}>
            {/* Sidebar Header */}
            <View style={styles.sidebarTop}>
                <TouchableOpacity onPress={() => makenewChat()} style={styles.newChat}>
                    <Image style={styles.menuIcon} source={assets.plus_icon} />
                    <Text style={styles.newChatText}>New Chat</Text>
                </TouchableOpacity>
                {/* Recent Chat Sessions */}
                <View style={styles.recent}>
                    <Text style={styles.recentTitle}>Recent</Text>
                    <ScrollView>
                        {chatSessions.map((session) => (
                            <TouchableOpacity key={session._id} style={styles.recentEntry}>
                                <TouchableOpacity onPress={() => loadChatSession(session._id)}>
                                    <Image style={styles.menuIcon} source={assets.message_icon} />
                                    <Text style={styles.recentEntryText}>{session.title.slice(0, 25)}...</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => deleteChatSession(session._id)}>
                                    <Text style={{ color: 'red' }}>Delete</Text>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>
            <View style={styles.sidebarBottom}>
                <TouchableOpacity style={styles.sidebarBottomItem}>
                    <Image style={styles.menuIcon} source={assets.question_icon} />
                    <Text>Help</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sidebarBottomItem}>
                    <Image style={styles.menuIcon} source={assets.history_icon} />
                    <Text>Activity</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sidebarBottomItem}>
                    <Image style={styles.menuIcon} source={assets.setting_icon} />
                    <Text>Setting</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToMain} style={styles.sidebarBottomItem}>
                    <Text>Go to Main</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    sidebar: {
        width: 250,
        backgroundColor: '#f0f0f0',
        padding: 10,
        justifyContent: 'space-between', // Changed from space-between
        flex: 1, // Added flex: 1 to the sidebar
    },
    sidebarTop: {
        //flex: 1, // Removed flex: 1 from sidebarTop
        //height: '50%',
    },
    menuIcon: {
        width: 30,
        height: 30,
        marginBottom: 10,
    },
    newChat: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
    },
    newChatText: {
        marginLeft: 10,
    },
    recent: {
        //flex: 1, // Removed flex: 1 from recent
    },
    recentTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    recentEntry: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        marginBottom: 5,
        backgroundColor: '#eee',
        borderRadius: 3,
        justifyContent: 'space-between'
    },
    recentEntryText: {
        marginLeft: 5,
    },
    sidebarBottom: {
        paddingBottom: 20,
        //height: '50%',
    },
    sidebarBottomItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
    }
});

export default Sidebar;