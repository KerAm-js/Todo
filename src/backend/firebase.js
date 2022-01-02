import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCFdkAy5wNxXLvPApK5wOXIlsQjzWNqQQg",
  authDomain: "productive-plus.firebaseapp.com",
  projectId: "productive-plus",
  storageBucket: "productive-plus.appspot.com",
  messagingSenderId: "506300678290",
  appId: "1:506300678290:web:3c0f4e449c7f4c9246664b",
  measurementId: "G-X5MXGYZXN2"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export const signup = (login, password, onSuccessHandler, onErrorHandler) => {
  createUserWithEmailAndPassword(auth, login, password)
    .then(userCredential => {
      const user = userCredential.user;
      if (onSuccessHandler) {
        onSuccessHandler(user.stsTokenManager.accessToken);
      }
    })
    .catch((err) => {
      if (onErrorHandler) {
        onErrorHandler(err);
      }
    });
}

export const signin = (login, password, onSuccessHandler, onErrorHandler) => {
  signInWithEmailAndPassword(auth, login, password)
    .then(userCredential => {
      const user = userCredential.user;
      if (onSuccessHandler) {
        onSuccessHandler(user.stsTokenManager.accessToken);
      }
    })
    .catch((err) => {
      if (onErrorHandler) {
        onErrorHandler(err);
      }
    });
}

export const signout = navigate => {
  signOut(auth)
    .then(() => navigate ? navigate() : null)
    .catch(err => console.log(err.code))
}
