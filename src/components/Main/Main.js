import React, { useContext, useState, useRef, useEffect } from "react";
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, ScrollView, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { assets } from '../../assets/assets';
import { Context } from "../../context/context";
import moment from 'moment';

const Main = ({ navigation }) => {
    const { onSent, showResult, loading, resultData, setInput, input, chatMessages, selectedChatSession, setSelectedChatSession } = useContext(Context);
    const scrollViewRef = useRef();
    const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);

    useEffect(() => {
        // Scroll to the bottom when chatMessages change
        if (scrollViewRef.current && chatMessages.length > 0) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, [chatMessages]);

    const onLayout = (event) => {
        setScreenHeight(event.nativeEvent.layout.height);
    };

    const scrollEnabled = () => {
        return screenHeight > Dimensions.get('window').height;
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, paddingBottom: 50 }} // Added paddingBottom
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.main} onLayout={onLayout}>
                <View style={styles.nav}>
                    <Text style={styles.navText}>Support Chatbot</Text>
                    <Image source={assets.user_icon} style={styles.userIcon} />
                </View>
                <ScrollView
                    ref={scrollViewRef}
                    contentContainerStyle={styles.mainContainer}
                    style={{ flex: 1 }}
                    onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                >

                    {selectedChatSession ? (
                        <View style={styles.result}>
                            <View style={styles.resultTitle}>
                                {/* <Image source={assets.user_icon} style={styles.userIcon} /> */}
                                <Text style={styles.resultText}>{selectedChatSession.title}</Text>
                            </View>
                            <View style={styles.resultData}>
                                {chatMessages.map((message) => (
                                    <View key={message._id} style={styles.messageContainer}>
                                        {message.sender_type === 'user' ? (
                                            <>
                                                <Image source={assets.user_icon} style={styles.userIcon} />
                                                <Text style={styles.messageContent}>{message.content}</Text>
                                                <Text style={styles.messageTimestamp}>
                                                    {moment(message.timestamp).format('MMMM Do YYYY, h:mm:ss a')}
                                                </Text>
                                            </>
                                        ) : (
                                            <>
                                                <Image source={assets.google_gemini_icon} style={styles.chatbotIcon} />
                                                <Text style={styles.messageContent}>{message.content}</Text>
                                                <Text style={styles.messageTimestamp}>
                                                    {moment(message.timestamp).format('MMMM Do YYYY, h:mm:ss a')}
                                                </Text>
                                            </>
                                        )}
                                    </View>
                                ))}
                            </View>
                        </View>
                    ) : (
                        <>
                            <View style={styles.greet}>
                                <Text style={styles.greetHello}>Hello !</Text>
                                <Text style={styles.greetText}>How can I help you today?</Text>
                            </View>
                            <View style={styles.cards}>
                                <TouchableOpacity onPress={() => onSent("Where is University of Technology and Education Hung Yen?")} style={styles.card}>
                                    <Text style={styles.cardText}>Where is University of Technology and Education Hung Yen?</Text>
                                    <Image source={assets.compass_icon} style={styles.cardIcon} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => onSent("Tell me about University of Technology and Education Hung Yen")} style={styles.card}>
                                    <Text style={styles.cardText}>Tell me about University of Technology and Education Hung Yen </Text>
                                    <Image source={assets.bulb_icon} style={styles.cardIcon} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => onSent("Tell me about administrative procedures or paperworks")} style={styles.card}>
                                    <Text style={styles.cardText}>Tell me about administrative procedures or paperworks</Text>
                                    <Image source={assets.message_icon} style={styles.cardIcon} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => onSent("Tell me about applying for school admission")} style={styles.card}>
                                    <Text style={styles.cardText}>Tell me about applying for school admission</Text>
                                    <Image source={assets.code_icon} style={styles.cardIcon} />
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </ScrollView>
                <View style={styles.mainBottom}>
                    <View style={styles.searchBox}>
                        <TextInput
                            style={styles.searchInput}
                            onChangeText={(text) => setInput(text)}
                            value={input}
                            placeholder="Type your question here..."
                        />
                        <View style={styles.searchIcons}>
                            <Image source={assets.gallery_icon} style={styles.searchIcon} />
                            <Image source={assets.mic_icon} style={styles.searchIcon} />
                            {input ? <TouchableOpacity onPress={() => onSent()}><Image source={assets.send_icon} style={styles.sendIcon} /></TouchableOpacity> : null}
                        </View>
                    </View>
                    <Text style={styles.bottomInfo}>
                        Chatbot is in building phase so it's may display inaccurate informations. Please verify before taking any action.
                    </Text>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f0f0f0',
    },
    navText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    userIcon: {
        width: 30,
        height: 30,
    },
    chatbotIcon: {
        width: 30,
        height: 30,
    },
    mainContainer: {
        padding: 16,
        paddingBottom: 100, // Add padding to the bottom of the ScrollView
    },
    greet: {
        marginBottom: 16,
    },
    greetHello: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    greetText: {
        fontSize: 16,
    },
    cards: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    card: {
        width: '45%',
        padding: 16,
        marginBottom: 16,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        alignItems: 'center',
    },
    cardText: {
        fontSize: 14,
        textAlign: 'center',
    },
    cardIcon: {
        width: 24,
        height: 24,
        marginTop: 8,
    },
    result: {
        marginBottom: 16,
    },
    resultTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    resultText: {
        fontSize: 16,
    },
    resultData: {
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    geminiIcon: {
        width: 30,
        height: 30,
    },
    loader: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    loaderBar: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ccc',
        marginHorizontal: 4,
    },
    mainBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: '#f0f0f0',
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
    },
    searchIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchIcon: {
        width: 24,
        height: 24,
        marginHorizontal: 8,
    },
    sendIcon: {
        width: 24,
        height: 24,
    },
    bottomInfo: {
        fontSize: 12,
        textAlign: 'center',
        marginTop: 8,
    },
    messageContainer: {
        marginBottom: 8,
        padding: 8,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
    },
    messageContent: {
        fontSize: 16,
    },
    messageTimestamp: {
        fontSize: 12,
        color: 'gray',
        textAlign: 'right',
    },
});

export default Main;