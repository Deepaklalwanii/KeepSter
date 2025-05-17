import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  doc,
  getDoc,
} from 'firebase/firestore'
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-hMB6tsh0R7TTibuH91wUlWDW8khMmf8",
  authDomain: "keepster-bcefe.firebaseapp.com",
  projectId: "keepster-bcefe",
  storageBucket: "keepster-bcefe.firebasestorage.app",
  messagingSenderId: "957372708384",
  appId: "1:957372708384:web:efe3618e842564e72bee45",
  measurementId: "G-SCBFBGVFEQ"
};

// Initialize Firebase
initializeApp(firebaseConfig)

// Firebase services
const db = getFirestore()
const auth = getAuth()
const colRef = collection(db, 'keepSterData')

// Auth listener + fetch user-specific data
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid

    // Fetch user document (optional - from 'users' collection)
    const userDocRef = doc(db, "users", uid)
    const userDocSnap = await getDoc(userDocRef)

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data()
    } else {
      console.log("No user profile found in 'users' collection.")
    }

    // Fetch notes created by this user from keepSterData
    const q = query(colRef, where("uid", "==", uid))
    onSnapshot(q, (snapshot) => {
      let userNotes = []
      snapshot.docs.forEach((doc) => {
        userNotes.push({ ...doc.data(), id: doc.id })
      })
    })
  } else {
    console.log("User is signed out")
  }
})

// Sign up function
export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

// Add note (with UID)
export const addNote = async (noteData) => {
  const user = auth.currentUser
  if (user) {
    await addDoc(colRef, {
      ...noteData,
      uid: user.uid, // Attach user's UID for filtering
      createdAt: new Date()
    })
  } else {
    throw new Error("User not authenticated")
  }
}

export { db, colRef }
export default auth
