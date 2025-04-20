import { doc, setDoc, updateDoc, arrayUnion, onSnapshot } from "firebase/firestore";
import { db } from "./story/firebaseconfig";

export const createPost = async (postId, postData) => {
    try {
        const postRef = doc(db, "post", postId);
        await setDoc(postRef, {
            ...postData,
            comments: [], 
        });

        console.log("✅ تم إنشاء المنشور بنجاح!");
    } catch (error) {
        console.error("⚠️ خطأ في إنشاء المنشور:", error);
    }
};


export const addComment = async (postId, commentObj) => {
    try {
        const postRef = doc(db, "post", postId);
        await updateDoc(postRef, {
            comments: arrayUnion(commentObj), 
        });

        console.log("✅ تم إضافة التعليق بنجاح!");
    } catch (error) {
        console.error("⚠️ خطأ في إضافة التعليق:", error);
    }
};


export const getComments = (postId, setComments) => {
    if (!postId) {
        console.error("Invalid postId:", postId);
        return () => {}; 
    }

    const unsubscribe = firestore
        .collection("posts") 
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
            const comments = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setComments(comments);
        });

    return unsubscribe;
};
