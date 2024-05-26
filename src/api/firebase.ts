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
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
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
import { CommentProps, PostProps, UserProps } from '../type';

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

export async function updatePost(
  post: PostProps,
  content: string,
  tags: string[],
  imageUrl: string,
) {
  const postRef = doc(db, 'posts', post?.id);

  await updateDoc(postRef, {
    content: content,
    hashTags: tags,
    imageUrl: imageUrl,
  });
}
export async function deleteImage(post: PostProps) {
  const imageRef = ref(storage, post?.imageUrl);

  await deleteObject(imageRef).catch((error) => console.log(error));
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

export async function getPosts(callback: (posts: PostProps[]) => void) {
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

export async function getFollowingPost(
  followingIds: string[],
  callback: (posts: PostProps[]) => void,
) {
  if (followingIds.length === 0) {
    callback([]);
    return;
  }

  const postRef = collection(db, 'posts');
  const followingQuery = query(
    postRef,
    where('uid', 'in', followingIds),
    orderBy('createdAt', 'desc'),
  );

  onSnapshot(followingQuery, (snapShot) => {
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

export async function removeLike(post: PostProps, user: User) {
  const postRef = doc(db, 'posts', post.id);

  await updateDoc(postRef, {
    likes: arrayRemove(user?.uid),
    likeCount: post?.likeCount ? post?.likeCount - 1 : 0,
  });
}

export async function addLike(post: PostProps, user: User) {
  const postRef = doc(db, 'posts', post.id);

  await updateDoc(postRef, {
    likes: arrayUnion(user?.uid),
    likeCount: post?.likeCount ? post?.likeCount + 1 : 1,
  });
}

export async function getPost(
  paramsId: string,
  callback: (post: PostProps) => void,
) {
  const docRef = doc(db, 'posts', paramsId);

  onSnapshot(docRef, (doc) => {
    callback({ ...(doc?.data() as PostProps), id: doc?.id });
  });
}

export async function createComment(
  post: PostProps,
  comment: string,
  user: User,
) {
  const postRef = doc(db, 'posts', post?.id);
  const commentObj = {
    comment: comment,
    uid: user?.uid,
    email: user?.email,
    createdAt: formatDateKrTime(),
  };

  await updateDoc(postRef, {
    comments: arrayUnion(commentObj),
  });
}

export async function deleteComment(post: PostProps, comment: CommentProps) {
  const postRef = doc(db, 'posts', post?.id);

  await updateDoc(postRef, {
    comments: arrayRemove(comment),
  });
}

export async function searchHashTags(
  tagQuery: string,
  callback: (posts: PostProps[]) => void,
) {
  const postRef = collection(db, 'posts');
  const postQuery = query(
    postRef,
    where('hashTags', 'array-contains-any', [tagQuery]),
    orderBy('createdAt', 'desc'),
  );

  onSnapshot(postQuery, (snapShot) => {
    const dataObj = snapShot?.docs?.map((doc) => ({
      ...doc?.data(),
      id: doc?.id,
    }));
    callback(dataObj as PostProps[]);
  });
}

export async function following(user: User, post: PostProps) {
  const followingRef = doc(db, 'following', user?.uid);
  const followerRef = doc(db, 'follower', post?.uid);

  await setDoc(
    followingRef,
    {
      users: arrayUnion({ id: post?.uid }),
    },
    { merge: true },
  );

  await setDoc(
    followerRef,
    { users: arrayUnion({ id: user?.uid }) },
    { merge: true },
  );
}

export async function removeFollowing(user: User, post: PostProps) {
  const followingRef = doc(db, 'following', user?.uid);
  const followerRef = doc(db, 'follower', post?.uid);

  await updateDoc(followingRef, {
    users: arrayRemove({ id: post?.uid }),
  });
  await updateDoc(followerRef, {
    users: arrayRemove({ id: user.uid }),
  });
}

export async function getFollowInfo(
  uid: string,
  collectionName: 'follower' | 'following',
  callback: (userIds: string[]) => void,
) {
  const ref = doc(db, collectionName, uid);
  onSnapshot(ref, (doc) => {
    const data = doc?.data();
    if (data && data.users) {
      const userIds = data.users.map((user: UserProps) => user.id); // 모든 id를 배열로 추출
      callback(userIds);
    } else {
      callback([]);
    }
  });
}

export async function getMyPosts(
  uid: string,
  callback: (posts: PostProps[]) => void,
) {
  const postRef = collection(db, 'posts');
  const myPostQuery = query(
    postRef,
    where('uid', '==', uid),
    orderBy('createdAt', 'desc'),
  );
  onSnapshot(myPostQuery, (snapShot) => {
    const dataObj = snapShot.docs.map((doc) => ({
      ...doc.data(),
      id: doc?.id,
    }));
    callback(dataObj as PostProps[]);
  });
}

export async function getLikePosts(
  uid: string,
  callback: (posts: PostProps[]) => void,
) {
  const postRef = collection(db, 'posts');
  const likePostQuery = query(
    postRef,
    where('likes', 'array-contains', uid),
    orderBy('createdAt', 'desc'),
  );
  onSnapshot(likePostQuery, (snapShot) => {
    const dataObj = snapShot.docs.map((doc) => ({
      ...doc.data(),
      id: doc?.id,
    }));
    callback(dataObj as PostProps[]);
  });
}
