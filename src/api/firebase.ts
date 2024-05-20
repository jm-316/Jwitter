import { FirebaseApp, getApp, initializeApp } from 'firebase/app';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

export let app: FirebaseApp;

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_API_ID,
};

try {
  app = getApp('app');
} catch (error) {
  app = initializeApp(firebaseConfig, 'app');
}

const firebase = initializeApp(firebaseConfig);

export default firebase;

const auth = getAuth(app);

export async function createUser(email: string, password: string) {
  await createUserWithEmailAndPassword(auth, email, password);
}

export async function socialLogin(providerName: string) {
  let provider;
  if (providerName === 'google') {
    provider = new GoogleAuthProvider();
  }

  if (providerName === 'github') {
    provider = new GithubAuthProvider();
  }

  await signInWithPopup(
    auth,
    provider as GoogleAuthProvider | GithubAuthProvider,
  );
}

export async function Login(email: string, password: string) {
  await signInWithEmailAndPassword(auth, email, password);
}

export async function logOut() {
  await signOut(auth);
}
