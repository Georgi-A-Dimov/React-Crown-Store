import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";

import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    collection,
    writeBatch,
    query,
    getDocs,
    updateDoc,
    arrayUnion,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCDU9h6by3KRGjcLyRq6pK_mrkyj8K2fm8",
    authDomain: "crown-store-d5aa4.firebaseapp.com",
    projectId: "crown-store-d5aa4",
    storageBucket: "crown-store-d5aa4.appspot.com",
    messagingSenderId: "902093201507",
    appId: "1:902093201507:web:aada975fc3d2d28f9a9856"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    'prompt': 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionName, objectToAdd, field) => {
    const collectionRef = collection(db, collectionName);
    const batch = writeBatch(db);

    objectToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object[field].toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
};

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});

    return categoryMap;
};

// temp start
export const getProductReviews = async (productId) => {
    const docRef = doc(db, 'product-reviews', productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        try {
            return docSnap.data();
        } catch (error) {
            console.error('Error fetching document:', error);
        };
    };
}

export const setProductReview = async (productId, reviewText, userId, username, rating) => {
    const productDocRef = doc(db, "product-reviews", productId);
    const reviewSnapshot = await getDoc(productDocRef);
    const newReview = {
        rating: rating,
        username: username,
        userId: userId,
        review: reviewText,
        createdAt: new Date(),
    };

    if (!reviewSnapshot.exists()) {
        try {
            await setDoc(productDocRef, {reviews: [newReview]});
        } catch (error) {
            console.log('error creating product review', error.message);
        }
    }

    await updateDoc(productDocRef, {
        reviews: arrayUnion(newReview)
    });

    console.log("Review added successfully!");
}

export const editReview = async (productId, userId, newText) => {
    try {
        const productDocRef = doc(db, "product-reviews", productId);
        const productDoc = await getDoc(productDocRef);

        if (productDoc.exists()) {
            let reviews = productDoc.data().reviews || [];

            reviews = reviews.map(review => 
                review.userId === userId ? 
                { ...review, review: newText } 
                : 
                review
            );

            await updateDoc(productDocRef, { reviews });

            console.log("Review updated successfully!");
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error editing review: ", error);
    }
}

export const deleteReview = async (productId, userId) => {
    try {
        const productDocRef = doc(db, "product-reviews", productId);
        const productDoc = await getDoc(productDocRef);

        if (productDoc.exists()) {
            let reviews = productDoc.data().reviews || [];
            reviews = reviews.filter(review => review.userId !== userId);

            await updateDoc(productDocRef, { reviews });

            console.log("Review deleted successfully!");
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error deleting review: ", error);
    }
};

// temp end

export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
};

export const createUserAuthWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserAuthWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth, callback);
};