import { initializeApp } from "firebase/app";
import { getAuth,sendEmailVerification, createUserWithEmailAndPassword,updateProfile,updatePassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import toast from 'react-hot-toast';
import { onAuthStateChanged } from "firebase/auth";
import store from "./store";
import { login as loginHandle,logout as LogoutHandle } from "./store/auth";
import { openModal } from "./store/modal";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 
import { onSnapshot,doc } from "firebase/firestore";
import { setTodos } from "./store/todos";




const firebaseConfig = {
    apiKey: "AIzaSyCsfs7kt-wms_9Pq3KlKIIhxLD25bNU4Po",
    authDomain: "prototurk-firebase.firebaseapp.com",
    projectId: "prototurk-firebase",
    storageBucket: "prototurk-firebase.appspot.com",
    messagingSenderId: "124609779542",
    appId: "1:124609779542:web:8cbff14f99d2b50433a8f7"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()

export const db = getFirestore(app) 
// her bi veriyi veri tabanında alıyoruz ve redux a gönderiyoruz   

onSnapshot(collection(db, "todos"), (doc) => {
    console.log(doc.docs)
    console.log(doc.docs.map((todo) => todo.id))
     store.dispatch(setTodos(
        doc.docs.reduce((todos,todo) => [...todos, { ...todo.data(), id:todo.id }],[]) // todo.data() bütün veriler geliyor 
    ))
    
    //store.dispatch(setTodos(doc.docs))
    //console.log("Current data: ", doc.docs);
});

export const addTodo = async (data) => {
  const result = await addDoc(collection(db,'todos'),data)
  console.log(result)
}

export const register = async (email,password) => {

  try {
    const { user } = await createUserWithEmailAndPassword(auth, email,password)
    toast.success("başarıyla kayıt olundu")
    return user
  } catch (error) {
      toast.error(error.message)
      
  }
}

export const login = async (email, password) => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        toast.success("başarıyla giriş yapıldı")
        return user
    } catch (error) {
        toast.error(error.message)
    }
}

export const logOut = async () => {
    try {
        await signOut(auth)
        return true
    } catch (error) {
        toast.error(error.message)
    }
}

export const update = async(data) => {
    
    try {
        await updateProfile(auth.currentUser, data)
        toast.success("Profiliniz başarıyla güncellendi")
        return true

    } catch (error) {
        toast.error(error.message)
    }
}

export const resetPassword = async(newpassword) => {
    
    try {
        await updatePassword(auth.currentUser, newpassword)
        toast.success("Parolanız başarıyla güncellendi")
        return true

    } catch (error) {
        if(error.code === 'auth/requires-recent-login'){
            store.dispatch(openModal({
                name:'re-auth-model'
            }))
        }
        toast.error(error.code)
    }
}

export const EmailVerification = async () => {
    try {
        await sendEmailVerification(auth.currentUser)
        toast.success(`Doğrulama Maili ${auth.currentUser.email} gönderildi lütfen kontrol edin`)
        return true
    } catch (error) {
        toast.error(error.message)
    }
}

// bu methodda user geliyor  yani giriş yapan kullanıcı
onAuthStateChanged(auth, (user) => { // giriş yaptık mesela sonra foto değiştirdik anlık olarak ekranda değiştiricez o zaman kullanabiliriz 
  if (user) {
      console.log(user)
    store.dispatch(loginHandle({
        displayName:user.displayName,
        email:user.email,
        emailVerified:user.emailVerified,
        photoURL: user.photoURL,
        uid:user.uid
    })) // dispatch bu şekilde firebase.js de çağırabiliyoruz 
  } else {
      store.dispatch(LogoutHandle())
  }
});

export default app