import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyANloTHUccDjXApwDaBEWLFMaqPpY6aORo",
  authDomain: "crwn-clothingdb-235d5.firebaseapp.com",
  projectId: "crwn-clothingdb-235d5",
  storageBucket: "crwn-clothingdb-235d5.appspot.com",
  messagingSenderId: "774882172303",
  appId: "1:774882172303:web:480abf9a6cdbeb28e13ffa"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth,additionalInformation={}) => {
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

export const createAuthUserWithEmailAndPassword = async (email,password) =>{
  if(!email || !password) return ;
  
  return await createUserWithEmailAndPassword(auth,email,password)
}
export const signInAuthUserWithEmailAndPassword = async (email,password) =>{
  if(!email || !password) return ;
  
  return await signInWithEmailAndPassword(auth,email,password)
}

export const signOutUser= async()=>{
 await signOut(auth);
}

export const onAuthStateChangedListener=(callback)=>onAuthStateChanged(auth,callback)