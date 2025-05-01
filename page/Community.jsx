import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, SafeAreaView, ActivityIndicator, Alert } from "react-native";
import { Card, Button, Avatar, Dialog, Portal, TextInput } from "react-native-paper";
import { addDoc, collection, getDocs, doc, updateDoc, Timestamp, query, orderBy, onSnapshot, serverTimestamp, arrayUnion, arrayRemove, getDoc, increment, where } from "firebase/firestore";
import db from "../story/firebaseconfig";
import BottomNav from "../component/bottomNav";
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../Redux/CurrentUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavBar from '../component/NavBar';
import { Ionicons } from '@expo/vector-icons';

const Community = ({ navigation }) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [newPostText, setNewPostText] = useState("");
  const [loading, setLoading] = useState(true);

  const showDialog = () => setVisible(true);
  const hideDialog = () => {
    setVisible(false);
    setNewPostText("");
  };

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
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const postsRef = collection(db, 'post');
        const q = query(postsRef, orderBy('timestamp', 'desc'));

        const querySnapshot = await getDocs(q);
        const postsList = [];

        const postsPromises = querySnapshot.docs.map(async (doc) => {
          const postData = doc.data();
          const likes = postData.likes || [];
          const likeCount = postData.likeCount || 0;

          const commentsRef = collection(db, 'comments');
          const commentsQuery = query(commentsRef, where('postId', '==', doc.id));
          const commentsSnapshot = await getDocs(commentsQuery);

          const comments = [];
          commentsSnapshot.forEach((commentDoc) => {
            const commentData = commentDoc.data();
            comments.push({
              id: `${doc.id}-${commentDoc.id}`, 
              ...commentData,
              timestamp: commentData.timestamp?.toDate?.() || new Date()
            });
          });

          return {
            id: doc.id,
            key: `${doc.id}-${Date.now()}`, // مفتاح فريد للمنشور
            ...postData,
            likes: likes,
            likeCount: likeCount,
            isLiked: likes.includes(userData?.UserId),
            comments: comments,
            commentsCount: comments.length
          };
        });

        const resolvedPosts = await Promise.all(postsPromises);
        setPosts(resolvedPosts);
        setLoading(false);

        const unsubscribePosts = onSnapshot(q, async (snapshot) => {
          const updatedPosts = await Promise.all(
            snapshot.docs.map(async (doc) => {
              const postData = doc.data();
              const likes = postData.likes || [];
              const likeCount = postData.likeCount || 0;

              const commentsRef = collection(db, 'comments');
              const commentsQuery = query(commentsRef, where('postId', '==', doc.id));
              const commentsSnapshot = await getDocs(commentsQuery);

              const comments = [];
              commentsSnapshot.forEach((commentDoc) => {
                const commentData = commentDoc.data();
                comments.push({
                  id: `${doc.id}-${commentDoc.id}`, // مفتاح فريد للتعليق
                  ...commentData,
                  timestamp: commentData.timestamp?.toDate?.() || new Date()
                });
              });

              return {
                id: doc.id,
                key: `${doc.id}-${Date.now()}`, // مفتاح فريد للمنشور
                ...postData,
                likes: likes,
                likeCount: likeCount,
                isLiked: likes.includes(userData?.UserId),
                comments: comments,
                commentsCount: comments.length
              };
            })
          );
          setPosts(updatedPosts);
        });

        return () => unsubscribePosts();
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    if (userData?.UserId) {
      fetchPosts();
    }
  }, [userData?.UserId]);

  const handleLike = async (postId, currentLikes = [], currentLikeCount = 0) => {
    if (!userData?.UserId) return;

    try {
      console.log('Handling like for post:', postId);
      console.log('Current likes:', currentLikes);
      console.log('Current like count:', currentLikeCount);
      console.log('User ID:', userData.UserId);

      const postRef = doc(db, 'post', postId);
      const isLiked = currentLikes.includes(userData.UserId);

      await updateDoc(postRef, {
        likes: isLiked
          ? arrayRemove(userData.UserId)
          : arrayUnion(userData.UserId),
        likeCount: isLiked ? currentLikeCount - 1 : currentLikeCount + 1
      });

      console.log('Like updated successfully');
    } catch (error) {
      console.error('Error updating like:', error);
    }
  };

  const handleAddPost = async () => {
    if (!newPostText.trim()) {
      Alert.alert('خطأ', 'الرجاء إدخال نص المنشور');
      return;
    }

    if (!userData?.UserId) {
      Alert.alert('خطأ', 'يجب تسجيل الدخول لإضافة منشور');
      return;
    }

    try {
      const newPost = {
        user: userData.username,
        userId: userData.UserId,
        text: newPostText.trim(),
        image: userData.PhotoUrl || userData.image || "https://img.freepik.com/premium-vector/businessman-icon-profile-placeholder_34176-500.jpg",
        timestamp: serverTimestamp(),
        likes: [],
        likeCount: 0,
        commentsCount: 0
      };

      const docRef = await addDoc(collection(db, "post"), newPost);

      setPosts(prevPosts => [{
        id: docRef.id,
        key: `${docRef.id}-${Date.now()}`,
        ...newPost,
        timestamp: new Date()
      }, ...prevPosts]);

      setNewPostText("");
      if (visible) {
        hideDialog();
      }
    } catch (error) {
      console.error("خطأ في إضافة المنشور:", error);
      Alert.alert('خطأ', 'حدث خطأ أثناء إضافة المنشور. الرجاء المحاولة مرة أخرى');
    }
  };

  const handleComment = async (postId, commentText) => {
    if (!userData?.UserId || !commentText.trim()) return;

    try {
      console.log('Adding comment to post:', postId);
      const commentData = {
        text: commentText.trim(),
        user: userData.username || 'مستخدم',
        image: userData.PhotoUrl || userData.image || "https://img.freepik.com/premium-vector/businessman-icon-profile-placeholder_34176-500.jpg",
        timestamp: serverTimestamp(),
        userId: userData.UserId,
        postId: postId
      };

      console.log('Comment data to be added:', commentData);

      const commentsRef = collection(db, 'comments');
      const docRef = await addDoc(commentsRef, commentData);
      console.log('Comment added with ID:', docRef.id);

      const postRef = doc(db, 'post', postId);
      await updateDoc(postRef, {
        commentsCount: increment(1)
      });
      console.log('Post comments count updated');

      setPosts(prevPosts => prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            commentsCount: (post.commentsCount || 0) + 1,
            comments: [
              ...(post.comments || []),
              {
                id: docRef.id,
                ...commentData,
                timestamp: new Date()
              }
            ]
          };
        }
        return post;
      }));

    } catch (error) {
      console.error('Error adding comment:', error);
      Alert.alert('خطأ', 'حدث خطأ أثناء إضافة التعليق. الرجاء المحاولة مرة أخرى');
    }
  };

  const renderPost = ({ item: post }) => {
    const formatDate = (timestamp) => {
      if (!timestamp) return 'الآن';
      try {
        if (timestamp.toDate) {
          return timestamp.toDate().toLocaleDateString('ar-SA');
        } else if (timestamp instanceof Date) {
          return timestamp.toLocaleDateString('ar-SA');
        }
        return 'الآن';
      } catch (error) {
        console.error('Error formatting date:', error);
        return 'الآن';
      }
    };

    const defaultImage = 'https://img.freepik.com/premium-vector/businessman-icon-profile-placeholder_34176-500.jpg';

    return (
      <Card key={post.key || post.id} style={styles.card}>
        <View style={styles.postHeader}>
          <Avatar.Image
            size={60}
            source={{
              uri: post.PhotoUrl || post.image || post.userImage || defaultImage
            }}
            onError={(e) => {
              console.log('Error loading image for post:', post.id, e.nativeEvent.error);
            }}
          />
          <View style={styles.userInfo}>
            <Text style={styles.username}>{post.user}</Text>
            <Text style={styles.postTime}>
              {formatDate(post.timestamp)}
            </Text>
          </View>
        </View>
        <Card.Content>
          <Text style={styles.postContent}>{post.text}</Text>
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleLike(post.id, post.likes, post.likeCount)}
          >
            <Ionicons
              name={post.isLiked ? "heart" : "heart-outline"}
              size={24}
              color={post.isLiked ? "#FF0000" : "#0A2784FF"}
            />
            <Text style={[styles.actionButtonText, post.isLiked && styles.likedText]}>
              {post.likeCount || 0}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Comments', {
              postId: post.id,
              post: post,
              comments: post.comments || []
            })}
          >
            <Ionicons name="chatbubble-outline" size={24} color="#0A2784FF" />
            <Text style={styles.actionButtonText}>{post.commentsCount || 0}</Text>
          </TouchableOpacity>
        </Card.Actions>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavBar />
      <View style={styles.content}>
        <View style={styles.postInputContainer}>
          <Image
            source={{ uri: userData?.image || 'https://img.freepik.com/premium-vector/businessman-icon-profile-placeholder_34176-500.jpg' }}
            style={styles.currentUserImage}
          />
          <TextInput
            style={styles.postInput}
            placeholder="شارك أفكارك مع المجتمع..."
            value={newPostText}
            onChangeText={(text) => setNewPostText(text)}
            multiline
          />
          <TouchableOpacity
            style={styles.postButton}
            onPress={handleAddPost}
          >
            <Ionicons name="send" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0A2784FF" style={styles.loadingIndicator} />
        ) : posts.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="newspaper-outline" size={60} color="#0A2784FF" />
            <Text style={styles.emptyStateText}>لا توجد منشورات بعد</Text>
          </View>
        ) : (
          <FlatList
            data={posts}
            renderItem={renderPost}
            keyExtractor={item => item.key || item.id}
            contentContainerStyle={styles.postsList}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      <BottomNav navigation={navigation} activePage="Community" />
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
  postInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  currentUserImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postInput: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 14,
  },
  postButton: {
    backgroundColor: '#0A2784FF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postsList: {
    paddingBottom: 20,
  },
  card: {
    marginBottom: 80,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  postHeader: {
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
  postTime: {
    fontSize: 12,
    color: '#666',
  },
  postContent: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  actionButtonText: {
    marginLeft: 5,
    color: '#0A2784FF',
  },
  likedText: {
    color: '#FF0000',
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
});

export default Community;
