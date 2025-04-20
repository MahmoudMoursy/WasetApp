import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import db from "../story/firebaseconfig";
import { doc, collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import BottomNav from "../component/bottomNav";
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../Redux/CurrentUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
const PostDetails = ({ navigation }) => {
    const route = useRoute();
    const { post } = route.params || {};
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    useEffect(() => {
        const getUserFromStorage = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('currentUser');
                if (storedUser !== null) {
                    const parsedUser = JSON.parse(storedUser);
                    setUserData(parsedUser);
                    dispatch(setCurrentUser(parsedUser));
                }
            } catch (error) {
                console.error("Error fetching user from AsyncStorage: ", error);
            }
        };
        getUserFromStorage();
    }, [dispatch]);
    useEffect(() => {
        if (!post?.id) {
            console.error("⚠️ Post ID is missing or invalid:", post);
            return;
        }

        try {
            const postRef = doc(db, "posts", post.id);
            const commentsRef = collection(postRef, "comments");
            const q = query(commentsRef, orderBy("timestamp", "desc"));

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const commentsList = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setComments(commentsList);
            });

            return () => unsubscribe();
        } catch (error) {
            console.error("⚠️ Error fetching comments:", error);
        }
    }, [post]);

    const handleAddComment = async () => {
        if (!newComment.trim()) return;

        try {
            const postRef = doc(db, "posts", post.id);
            const commentsRef = collection(postRef, "comments");

            await addDoc(commentsRef, {
                user: userData?.username,
                text: newComment,
                avatar: userData?.image || "https://img.freepik.com/premium-vector/businessman-icon-profile-placeholder_34176-500.jpg",
                timestamp: serverTimestamp(),
            });

            setNewComment("");
        } catch (error) {
            console.error("⚠️ خطأ في إضافة التعليق:", error);
        }
    };

    if (!post) {
        return <Text style={styles.notFound}>The post is not available</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, padding: 20 }}>
                <Text style={styles.title}>{post.text}</Text>
                <Text style={styles.timestamp}>{new Date(post.timestamp).toLocaleString("en-US")}</Text>
                <View style={styles.contentBox}>
                    <Text>{post.details}</Text>
                </View>

                <View style={styles.commentsSection}>
                    <Text style={styles.commentsTitle}>Comments ({comments.length})</Text>

                    <FlatList
                        data={comments}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.comment}>
                                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                                <View style={styles.commentText}>
                                    <Text style={styles.commentUser}>{item.user}</Text>
                                    <Text>{item.text}</Text>
                                </View>
                            </View>
                        )}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Add a comment"
                        value={newComment}
                        onChangeText={setNewComment}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleAddComment}>
                        <Text style={styles.buttonText}>Add Comment</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <BottomNav navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", direction: "rtl" },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    timestamp: { color: "gray", marginBottom: 20 },
    contentBox: { backgroundColor: "#f9f9f9", padding: 10, borderRadius: 5, marginBottom: 20 },
    commentsSection: { marginTop: 20 },
    commentsTitle: { fontSize: 18, fontWeight: "bold" },
    comment: { flexDirection: "row", alignItems: "center", marginVertical: 10 },
    avatar: { width: 40, height: 40, borderRadius: 20 },
    commentText: { marginLeft: 10 },
    commentUser: { fontWeight: "bold" },
    input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 5, padding: 10, marginTop: 10 },
    button: { backgroundColor: "#091e3d", padding: 10, borderRadius: 5, marginTop: 10, alignItems: "center" },
    buttonText: { color: "#fff", fontWeight: "bold" },
    notFound: { textAlign: "center", marginTop: 20, fontSize: 18 },
});

export default PostDetails;
