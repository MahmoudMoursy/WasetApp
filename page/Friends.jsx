import { createNotification } from '../firebaseService';
import { useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const Friends = ({ navigation }) => {
    useEffect(() => {
        if (!currentUser?.UserId) return;

        const friendRequestsQuery = query(
            collection(db, "friendRequests"),
            where("receiverId", "==", currentUser.UserId)
        );

        const unsubscribe = onSnapshot(friendRequestsQuery, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    const data = change.doc.data();

                    // Create notification for new friend request
                    createNotification(
                        currentUser.UserId,
                        "طلب صداقة جديد",
                        `لديك طلب صداقة جديد من ${data.senderName || 'مستخدم'}`,
                        'friend_request'
                    );
                }
            });
        });

        return () => unsubscribe();
    }, [currentUser?.UserId]);

    // ... existing code ...
};

export default Friends; 