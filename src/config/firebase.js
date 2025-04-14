import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {getFirestore, doc, setDoc} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDWzcSHI29MP94yXJUpsFKJbDyoqwN2apc",
  authDomain: "chat-app-3de4f.firebaseapp.com",
  projectId: "chat-app-3de4f",
  storageBucket: "chat-app-3de4f.firebasestorage.app",
  messagingSenderId: "536127341370",
  appId: "1:536127341370:web:61a4315df76277bc708603"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username,email,password) => {
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await setDoc(doc(db,"users",user.uid),{
            id:user.uid,
            username:username.toLowerCase(),
            email,
            name:'',
            avatar:'',
            bio:"Hey, There i am using chat app",
            lastSeen:Date.now()
        })
        await setDoc(doc(db,"chats",user.uid),{
            chatData:[]
        })

    }catch(error){
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email,password)=> {
    try{
        await signInWithEmailAndPassword(auth,email,password);
    }catch(error){
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }

}

const logout = async () => {
    try{
        await signOut(auth)
    }catch(error){
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

export {signup,login,logout,auth,db}