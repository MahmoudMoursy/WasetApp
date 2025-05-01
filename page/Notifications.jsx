import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { collection, query, where, orderBy, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import db from '../story/firebaseconfig';
import { useSelector } from 'react-redux';
import NavBar from '../component/NavBar';
import BottomNav from '../component/bottomNav';

const Notifications = ({ navigation }) => {
    const [notifications, setNotifications] = useState([]);
    const currentUser = useSelector((state) => state.currentUser);
    const [activePage, setActivePage] = useState('Notifications');

    useEffect(() => {
        if (!currentUser?.UserId) return;

        const notificationsQuery = query(
            collection(db, "notifications"),
            where("userId", "==", currentUser.UserId),
            orderBy("timestamp", "desc")
        );

        const unsubscribe = onSnapshot(notificationsQuery, (snapshot) => {
            const notificationsList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setNotifications(notificationsList);
        });

        return () => unsubscribe();
    }, [currentUser]);

    const markAsRead = async (notificationId) => {
        try {
            const notificationRef = doc(db, "notifications", notificationId);
            await updateDoc(notificationRef, { read: true });
        } catch (error) {
            console.error("Error marking notification as read:", error);
        }
    };

    const handleNavigation = (page) => {
        setActivePage(page);
        navigation.navigate(page);
    };

    const renderNotification = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.notificationItem,
                !item.read && styles.unreadNotification
            ]}
            onPress={() => markAsRead(item.id)}
        >
            <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationMessage}>{item.message}</Text>
                <Text style={styles.notificationTime}>
                    {new Date(item.timestamp?.toDate()).toLocaleString()}
                </Text>
            </View>
            {!item.read && (
                <View style={styles.unreadIndicator} />
            )}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <NavBar />
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>الإشعارات</Text>
                    <TouchableOpacity
                        style={styles.clearButton}
                        onPress={() => {
                            notifications.forEach(notification => {
                                if (!notification.read) {
                                    markAsRead(notification.id);
                                }
                            });
                        }}
                    >
                        <Text style={styles.clearButtonText}>تحديد الكل كمقروء</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={notifications}
                    renderItem={renderNotification}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.notificationsList}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Ionicons name="notifications-off" size={50} color="#666" />
                            <Text style={styles.emptyText}>لا توجد إشعارات</Text>
                        </View>
                    }
                />
            </View>
            <BottomNav navigation={navigation} activePage={activePage} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        padding: 15,
        marginBottom: 60,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0A2784FF',
    },
    clearButton: {
        padding: 8,
        borderRadius: 5,
        backgroundColor: '#0A2784FF',
    },
    clearButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    notificationsList: {
        paddingBottom: 20,
    },
    notificationItem: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    unreadNotification: {
        borderLeftWidth: 4,
        borderLeftColor: '#0A2784FF',
    },
    notificationContent: {
        flex: 1,
    },
    notificationTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    notificationMessage: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    notificationTime: {
        fontSize: 12,
        color: '#999',
    },
    unreadIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#0A2784FF',
        marginLeft: 10,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        marginTop: 10,
    },
});

export default Notifications; 