import { useContext, useEffect, useState } from 'react';
import AuthContext from '../components/context/AuthContext';
import { getPosts } from '../api/firebase';
import { PostProps } from '../type';

export default function usePosts() {
  const [posts, setPosts] = useState<PostProps[]>([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      getPosts(setPosts);
    }
  }, [user]);

  return { posts };
}
