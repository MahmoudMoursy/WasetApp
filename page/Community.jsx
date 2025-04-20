import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Card, Button, Avatar, Dialog, Portal, TextInput } from "react-native-paper";
import { addDoc, collection, getDocs, doc, updateDoc, Timestamp } from "firebase/firestore";
import db from "../story/firebaseconfig";
import BottomNav from "../component/bottomNav";
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../Redux/CurrentUser';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Community = ({ navigation }) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [newPostText, setNewPostText] = useState("");

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
        const querySnapshot = await getDocs(collection(db, "post"));
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate() || new Date(),
          likeCount: doc.data().likeCount || 0,
          isLiked: false,
        }));

        setPosts(fetchedPosts.reverse());
      } catch (error) {
        console.error("خطأ في جلب المنشورات: ", error);
      }
    };
    fetchPosts();
  }, [userData]);

  const handleLike = async (postId, currentLikes, isLiked) => {
    try {
      const postRef = doc(db, "post", postId);
      const newLikeCount = isLiked ? currentLikes - 1 : currentLikes + 1;

      await updateDoc(postRef, { likeCount: newLikeCount });

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, likeCount: newLikeCount, isLiked: !isLiked } : post
        )
      );
    } catch (error) {
      console.error("خطأ في تحديث الإعجابات:", error);
    }
  };

  const handleAddPost = async () => {
    if (newPostText.trim() === "") return;

    const newPost = {
      user: userData?.username,
      text: newPostText,
      image: userData?.image || "https://img.freepik.com/premium-vector/businessman-icon-profile-placeholder_34176-500.jpg",
      timestamp: Timestamp.now(),
      likeCount: 0,
    };

    try {
      const docRef = await addDoc(collection(db, "post"), newPost);
      setPosts([{ id: docRef.id, ...newPost, timestamp: new Date() }, ...posts]);
      hideDialog();
    } catch (error) {
      console.error("خطأ في إضافة المنشور:", error);
    }
  };

  const renderPost = ({ item: post }) => (
    <Card key={post.id} style={styles.card}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Avatar.Image size={60} source={{ uri: post.image }} />
        <Card.Title
          title={post.user}
          subtitle={post.timestamp ? new Date(post.timestamp).toLocaleString("ar-EG") : "توقيت غير متاح"}
          style={{ marginLeft: 12 }}
        />
      </View>
      <Card.Content>
        <Text style={styles.postText}>{post.text}</Text>
      </Card.Content>
      <Card.Actions>
        <Text>عدد الاعجابات ({post.likeCount})</Text>
        <Button
          icon="thumb-up-outline"
          mode="contained"
          style={{
            backgroundColor: post.isLiked ? "#0E55C0FF" : "white",
          }}
          labelStyle={{
            color: post.isLiked ? "white" : "black",
            fontWeight: "bold"
          }}
          onPress={() => handleLike(post.id, post.likeCount, post.isLiked)}
        >
          أعجبني
        </Button>
        <Button
          icon="comment-outline"
          mode="contained"
          style={{ backgroundColor: "white" }}
          labelStyle={{ color: "black", fontWeight: "bold" }}
          onPress={() => navigation.navigate("Comments", { post })}
        >
          تعليق
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <Text style={styles.headerText}>
              مجتمع <Text style={styles.highlightText}>وسيط</Text>
            </Text>
            <Button mode="contained" icon="plus" onPress={showDialog} style={styles.newPostButton}>
              موضوع جديد
            </Button>
          </>
        }
      />

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>إنشاء منشور</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="ماذا يدور في بالك؟"
              mode="outlined"
              multiline
              numberOfLines={3}
              value={newPostText}
              onChangeText={(text) => setNewPostText(text)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog} labelStyle={{ color: "red" }}>
              إلغاء
            </Button>
            <Button onPress={handleAddPost}>نشر</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <BottomNav navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", },
  contentContainer: { paddingBottom: 80, padding: 20 },
  headerText: { fontSize: 24, fontWeight: "bold", textAlign: "right", marginBottom: 20 },
  highlightText: { backgroundColor: "#091e3d", color: "#fff", paddingHorizontal: 15, paddingVertical: 8, borderRadius: 50, fontWeight: "bold" },
  newPostButton: { alignSelf: "flex-start", marginBottom: 20, backgroundColor: "#091e3d" },
  card: { marginBottom: 30 },
  postText: { fontSize: 16, color: "gray", textAlign: "right", marginBottom: 10 },
});

export default Community;
