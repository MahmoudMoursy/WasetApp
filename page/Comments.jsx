import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import db from "../story/firebaseconfig";
import { doc, collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, where, getDocs, updateDoc, increment } from "firebase/firestore";
import BottomNav from "../component/bottomNav";
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../Redux/CurrentUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavBar from '../component/NavBar';
import { Ionicons } from '@expo/vector-icons';
import { Avatar, Card } from 'react-native-paper';

const Comments = ({ route, navigation }) => {
    const { postId, post } = route.params;
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('currentUser');
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    console.log('Parsed user object:', parsedUser);

                    // Get the image URL from the user data
                    const imageUrl = parsedUser.PhotoUrl || parsedUser.image || 'https://img.freepik.com/premium-vector/businessman-icon-profile-placeholder_34176-500.jpg';

                    const userWithImage = {
                        ...parsedUser,
                        PhotoUrl: imageUrl,
                        image: imageUrl
                    };

                    console.log('User with image:', userWithImage);
                    setUser(userWithImage);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                console.log('Starting to fetch comments for post:', postId);

                const commentsRef = collection(db, 'comments');
                const q = query(commentsRef, where('postId', '==', postId));

                const querySnapshot = await getDocs(q);
                console.log(`Found ${querySnapshot.size} comments`);

                const fetchedComments = [];
                querySnapshot.forEach((doc) => {
                    const commentData = doc.data();
                    console.log('Comment data:', commentData);
                    fetchedComments.push({
                        id: doc.id,
                        ...commentData,
                        timestamp: commentData.timestamp?.toDate?.() || new Date()
                    });
                });

                fetchedComments.sort((a, b) => b.timestamp - a.timestamp);

                console.log('Fetched comments:', fetchedComments);
                setComments(fetchedComments);
                setLoading(false);

                const unsubscribe = onSnapshot(q, (snapshot) => {
                    console.log('Real-time update received');
                    const updatedComments = [];
                    snapshot.forEach((doc) => {
                        const commentData = doc.data();
                        updatedComments.push({
                            id: doc.id,
                            ...commentData,
                            timestamp: commentData.timestamp?.toDate?.() || new Date()
                        });
                    });


                    updatedComments.sort((a, b) => b.timestamp - a.timestamp);

                    console.log('Updated comments:', updatedComments);
                    setComments(updatedComments);
                });

                return () => unsubscribe();
            } catch (error) {
                console.error('Error fetching comments:', error);
                setLoading(false);
            }
        };

        if (postId) {
            fetchComments();
        }
    }, [postId]);

    const handleAddComment = async () => {
        if (!user?.UserId || !newComment.trim()) return;

        try {
            console.log('Current user data for comment:', user);
            console.log('User PhotoUrl:', user.PhotoUrl);
            console.log('User image:', user.image);

            const commentData = {
                text: newComment,
                user: user.username,
                PhotoUrl: user.PhotoUrl || user.image,
                image: user.PhotoUrl || user.image,
                timestamp: serverTimestamp(),
                userId: user.UserId,
                postId: postId
            };

            console.log('Comment data being saved:', commentData);

            const commentsRef = collection(db, 'comments');
            const docRef = await addDoc(commentsRef, commentData);
            console.log('Comment added with ID:', docRef.id);
            setNewComment('');

            const postRef = doc(db, 'post', postId);
            await updateDoc(postRef, {
                commentsCount: increment(1)
            });
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const renderComment = ({ item: comment }) => {
        console.log('Rendering comment with data:', comment);
        const defaultImage = 'https://img.freepik.com/premium-vector/businessman-icon-profile-placeholder_34176-500.jpg';

        return (
            <Card key={comment.id} style={styles.commentCard}>
                <View style={styles.commentHeader}>
                    <Avatar.Image
                        size={40}
                        source={{
                            uri: comment.PhotoUrl || comment.image || defaultImage
                        }}
                        onError={(e) => {
                            console.log('Error loading comment image:', e.nativeEvent.error);
                            console.log('Failed image URL:', comment.PhotoUrl || comment.image);
                        }}
                        onLoad={() => {
                            console.log('Successfully loaded comment image:', comment.PhotoUrl || comment.image);
                        }}
                    />
                    <View style={styles.userInfo}>
                        <Text style={styles.username}>{comment.user}</Text>
                        <Text style={styles.commentTime}>
                            {comment.timestamp?.toLocaleDateString('ar-SA') || 'الآن'}
                        </Text>
                    </View>
                </View>
                <Card.Content>
                    <Text style={styles.commentText}>{comment.text}</Text>
                </Card.Content>
            </Card>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <NavBar />
            <View style={styles.content}>
                {loading ? (
                    <ActivityIndicator size="large" color="#0A2784FF" style={styles.loadingIndicator} />
                ) : comments.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Ionicons name="chatbubble-outline" size={60} color="#0A2784FF" />
                        <Text style={styles.emptyStateText}>لا توجد تعليقات بعد</Text>
                    </View>
                ) : (
                    <FlatList
                        data={comments}
                        renderItem={renderComment}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.commentsList}
                        showsVerticalScrollIndicator={false}
                    />
                )}

                <View style={styles.commentInputContainer}>
                    <View style={styles.currentUserImageContainer}>
                        <Avatar.Image
                            size={40}
                            source={{
                                uri: user?.PhotoUrl || user?.image || 'https://img.freepik.com/premium-vector/businessman-icon-profile-placeholder_34176-500.jpg'
                            }}
                            onError={(e) => {
                                console.log('Error loading user image:', e.nativeEvent.error);
                                console.log('Failed image URL:', user?.PhotoUrl || user?.image);
                            }}
                            onLoad={() => {
                                console.log('Successfully loaded user image:', user?.PhotoUrl || user?.image);
                            }}
                        />
                    </View>
                    <TextInput
                        style={styles.commentInput}
                        placeholder="أضف تعليقاً..."
                        value={newComment}
                        onChangeText={setNewComment}
                        multiline
                    />
                    <TouchableOpacity
                        style={styles.commentButton}
                        onPress={handleAddComment}
                    >
                        <Ionicons name="send" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
            <BottomNav navigation={navigation} activePage="Comments" />
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
    },
    commentInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 12,
        marginBottom: 90,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    currentUserImageContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        overflow: 'hidden',
        marginRight: 10,
    },
    commentInput: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginRight: 10,
        fontSize: 14,
    },
    commentButton: {
        backgroundColor: '#0A2784FF',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    commentsList: {
        paddingBottom: 20,
    },
    commentCard: {
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    commentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    userInfo: {
        flex: 1,
        marginLeft: 10,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    commentTime: {
        fontSize: 12,
        color: '#666',
    },
    commentText: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
    },
    loadingIndicator: {
        marginVertical: 20,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyStateText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    commentUserImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
});

export default Comments;
