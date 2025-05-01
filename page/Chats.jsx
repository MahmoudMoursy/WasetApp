import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    FlatList,
} from 'react-native';
import { collection, getDocs, doc, getDoc, updateDoc, arrayUnion, onSnapshot, query, where } from 'firebase/firestore';
import db from "../story/firebaseconfig";
import NavBar from '../component/NavBar';
import BottomNav from '../component/bottomNav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { createNotification } from '../firebaseService';

const Chats = ({ navigation }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [usernames, setUsernames] = useState({});
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isOriginalSender, setIsOriginalSender] = useState(true);
    const [input, setInput] = useState("");

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const userDataString = await AsyncStorage.getItem('currentUser');
                if (userDataString) {
                    const parsedUserData = JSON.parse(userDataString);
                    setCurrentUser(parsedUserData);
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        };

        loadUserData();
    }, []);

    const fetchChats = async () => {
        if (!currentUser?.UserId) return;

        const messagesRef = collection(db, "messages");
        const snapshot = await getDocs(messagesRef);
        const userConversations = snapshot.docs.filter((doc) =>
            doc.id.includes(currentUser.UserId)
        );

        setConversations(userConversations);

        const fetchedUsernames = {};
        for (const docSnap of userConversations) {
            const otherId = docSnap.id.replace(currentUser.UserId + "-", "").replace("-" + currentUser.UserId, "");
            if (!fetchedUsernames[otherId]) {
                const userDoc = await getDoc(doc(db, "user", otherId));
                if (userDoc.exists()) {
                    fetchedUsernames[otherId] = userDoc.data().username;
                } else {
                    fetchedUsernames[otherId] = otherId;
                }
            }
        }
        setUsernames(fetchedUsernames);
    };

    const sendMessage = async () => {
        if (!input.trim() || !selectedChatId || !currentUser?.UserId) return;

        const messageDocRef = doc(db, "messages", selectedChatId);
        try {
            const fieldToUpdate = isOriginalSender ? "sender" : "receiver";

            await updateDoc(messageDocRef, {
                [fieldToUpdate]: arrayUnion({
                    text: input,
                    timestamp: new Date().toISOString(),
                    senderId: currentUser.UserId
                })
            });

            setInput("");
        } catch (error) {
            console.error("فشل في إرسال الرسالة:", error);
        }
    };

    useEffect(() => {
        let unsubscribe;

        if (selectedChatId && currentUser?.UserId) {
            const messageDocRef = doc(db, "messages", selectedChatId);

            unsubscribe = onSnapshot(messageDocRef, (docSnap) => {
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    const allMessages = [
                        ...(data.sender || []),
                        ...(data.receiver || [])
                    ];

                    allMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

                    const [firstId] = selectedChatId.split("-");
                    const userIsSender = firstId === currentUser.UserId;
                    setIsOriginalSender(userIsSender);
                    setMessages(allMessages);
                }
            });
        }

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [selectedChatId, currentUser]);

    useEffect(() => {
        if (currentUser?.UserId) {
            fetchChats();
        }
    }, [currentUser]);

    useEffect(() => {
        if (!currentUser?.UserId) return;

        const messagesQuery = query(
            collection(db, "messages"),
            where("participants", "array-contains", currentUser.UserId)
        );

        const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "modified") {
                    const data = change.doc.data();
                    if (data.lastMessage &&
                        !data.lastMessage.read &&
                        data.lastMessage.senderId !== currentUser.UserId) {

                        // Create notification for new message
                        createNotification(
                            currentUser.UserId,
                            "رسالة جديدة",
                            `لديك رسالة جديدة من ${data.users[data.lastMessage.senderId]?.username || 'مستخدم'}`,
                            'message'
                        );
                    }
                }
            });
        });

        return () => unsubscribe();
    }, [currentUser?.UserId]);

    const renderConversation = ({ item }) => {
        const otherId = item.id.replace(currentUser?.UserId + "-", "").replace("-" + currentUser?.UserId, "");
        const otherUsername = usernames[otherId];

        return (
            <TouchableOpacity
                key={item.id}
                onPress={() => setSelectedChatId(item.id)}
                style={styles.conversationItem}
            >
                <Text style={styles.conversationText}>محادثة مع: {otherUsername}</Text>
            </TouchableOpacity>
        );
    };

    const renderMessage = ({ item }) => {
        const isMyMessage = item.senderId === currentUser?.UserId;
        const backgroundColor = isOriginalSender
            ? (isMyMessage ? '#c2f0c2' : '#eee')
            : (isMyMessage ? '#eee' : '#c2f0c2');

        const time = item.timestamp
            ? new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : '';

        return (
            <View
                style={[
                    styles.messageContainer,
                    {
                        backgroundColor,
                        alignSelf: isMyMessage ? 'flex-end' : 'flex-start',
                    }
                ]}
            >
                <Text style={styles.messageText}>{item.text}</Text>
                <Text style={styles.messageTime}>{time}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <NavBar navigation={navigation} />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.mainContainer}>
                    {/* قائمة المحادثات */}
                    <View style={styles.conversationsList}>
                        <Text style={styles.sectionTitle}>محادثاتك</Text>
                        <FlatList
                            data={conversations}
                            renderItem={renderConversation}
                            keyExtractor={(item) => item.id}
                        />
                    </View>

                    {/* الرسائل */}
                    <View style={styles.messagesContainer}>
                        {selectedChatId ? (
                            <>
                                <Text style={styles.sectionTitle}>الرسائل</Text>
                                <FlatList
                                    data={messages}
                                    renderItem={renderMessage}
                                    keyExtractor={(item, index) => index.toString()}
                                    style={styles.messagesList}
                                    inverted
                                />

                                {/* صندوق إرسال الرسالة */}
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        value={input}
                                        onChangeText={setInput}
                                        placeholder="اكتب رسالتك..."
                                        style={styles.input}
                                        multiline
                                    />
                                    <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                                        <FontAwesome name="send" size={20} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                            </>
                        ) : (
                            <Text style={styles.placeholderText}>اختر محادثة لعرض الرسائل</Text>
                        )}
                    </View>
                </View>
            </SafeAreaView>
            <BottomNav navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    safeArea: {
        flex: 1,
        marginBottom: 70,
    },
    mainContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    conversationsList: {
        width: '30%',
        borderRightWidth: 1,
        borderRightColor: '#ddd',
        padding: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'right',
    },
    conversationItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    conversationText: {
        fontSize: 16,
        textAlign: 'right',
    },
    messagesContainer: {
        flex: 1,
        padding: 10,
    },
    messagesList: {
        flex: 1,
    },
    messageContainer: {
        maxWidth: '70%',
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
    },
    messageText: {
        fontSize: 16,
    },
    messageTime: {
        fontSize: 12,
        color: '#888',
        marginTop: 5,
        textAlign: 'right',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        padding: 10,
        marginRight: 10,
        maxHeight: 100,
        textAlign: 'right',
    },
    sendButton: {
        backgroundColor: '#0A2784FF',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#666',
    },
});

export default Chats; 