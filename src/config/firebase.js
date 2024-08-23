import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore, doc, setDoc, Timestamp, collection, query, where, getDocs } from "firebase/firestore";
import { toast } from 'react-toastify';

const firebaseConfig = {
    apiKey: "AIzaSyDzQwW0VPGAQqS9Iw8c_0a6nJzfKcT2dV8",
    authDomain: "chatting-app-e6dc5.firebaseapp.com",
    projectId: "chatting-app-e6dc5",
    storageBucket: "chatting-app-e6dc5.appspot.com",
    messagingSenderId: "809057857941",
    appId: "1:809057857941:web:5280b8e02d56921a65c69c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
    console.log("Signup function called with:", { username, email, password });
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        console.log("User created:", user);

        await setDoc(doc(db, 'users', user.uid), {
            id: user.uid,
            username: username.toLowerCase(),
            email,
            name: "",
            avatar: "",
            bio: "Hey, There I am Using Chat App",
            lastSeen: Timestamp.now(),
            createdAt: Timestamp.now()
        });
        console.log("User document created successfully");

        await setDoc(doc(db, "chats", user.uid), {
            chatsData: [],
            createdAt: Timestamp.now()
        });
        console.log("Chats document created successfully");
        toast.success("User signed up successfully!");
    } catch (error) {
        console.error("Error signing up:", error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
};

const login=async (email,password)=>{
     try{
      await signInWithEmailAndPassword(auth,email,password)
     }catch(error){
       console.error(error);
       toast.error(error.code.split('/')[1].split('-').join(" "));
     }
}

const logout= async ()=>{
    try{
        await signOut(auth)
    }catch(error){
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
     
}

const resetPass = async (email) => {
    if (!email) {
        toast.error("Enter Your Email");
        return null;
    }
    try {
        const userRef = collection(db, 'users');
        const q = query(userRef, where("email", "==", email));
        const querySnap = await getDocs(q);
        
        if (!querySnap.empty) {
            await sendPasswordResetEmail(auth, email);
            toast.success("Reset Email Sent");
        } else {
            toast.error("Email Doesn't Exist");
        }
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
};

export { signup ,login,logout , auth,db,resetPass};
