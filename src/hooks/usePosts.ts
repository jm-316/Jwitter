import { useContext, useEffect, useState } from 'react';
import AuthContext from '../components/context/AuthContext';
import { getPost } from '../api/firebase';
import { PostProps } from '../type';

export default function usePosts() {
  const [posts, setPosts] = useState<PostProps[]>([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      getPost(setPosts);
    }
  }, [user]);

  return { posts };
}
