import { useContext, useEffect, useState } from 'react';
import { PostProps } from '../type';
import { getFollowInfo, getFollowingPost } from '../api/firebase';
import AuthContext from '../components/context/AuthContext';

export default function useFollowingPosts() {
  const [followingPosts, setFollowingPosts] = useState<PostProps[]>([]);
  const [followingIds, setFollowingIds] = useState<string[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      getFollowInfo(user?.uid, 'following', setFollowingIds);
    }
  }, [user]);

  useEffect(() => {
    getFollowingPost(followingIds, setFollowingPosts);
  }, [followingIds]);

  return { followingPosts };
}
