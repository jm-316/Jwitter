import { FirebaseApp, getApp, initializeApp } from 'firebase/app';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { formatDateKrTime } from '../util/date';
import { Dispatch, SetStateAction } from 'react';
import { PostProps } from '../type';

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
const db = getFirestore(app);
const storage = getStorage(app);

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

export async function uploadImage(userUid: string, imageFile: string) {
  const key = `${userUid}/${uuidv4()}`;
  const storageRef = ref(storage, key);
  const data = await uploadString(storageRef, imageFile, 'data_url');
  const imageUrl = await getDownloadURL(data?.ref);

  return imageUrl;
}

export async function createPost(
  content: string,
  user: User,
  tags: string[],
  imageUrl: string,
) {
  await addDoc(collection(db, 'posts'), {
    content: content,
    createdAt: formatDateKrTime(),
    uid: user?.uid,
    email: user?.email,
    hashTags: tags,
    imageUrl: imageUrl,
  });
}

export async function getPost(callback: (posts: PostProps[]) => void) {
  const postRef = collection(db, 'posts');
  const postQuery = query(postRef, orderBy('createdAt', 'desc'));

  onSnapshot(postQuery, (snapShot) => {
    const dataObj = snapShot.docs.map((doc) => ({
      ...doc.data(),
      id: doc?.id,
    }));
    callback(dataObj as PostProps[]);
  });
}

export async function DeletePost(post: PostProps) {
  const imageRef = ref(storage, post?.imageUrl);
  if (post?.imageUrl) {
    deleteObject(imageRef).catch((error) => console.error(error));
  }

  await deleteDoc(doc(db, 'posts', post.id));
}
