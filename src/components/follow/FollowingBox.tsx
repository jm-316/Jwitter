import { toast } from 'react-toastify';
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { following, getFollowers, removeFollowing } from '../../api/firebase';
import { getErrorMessage } from '../../util/error';
import { FollowingProps } from '../../type';
import styles from './FollowingBox.module.scss';

export default function FollowingBox({ post }: FollowingProps) {
  const [postFollowers, setPostFollowers] = useState<string[]>([]);
  const { user } = useContext(AuthContext);

  const onClickFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      if (user?.uid) {
        await following(user, post);
      }
      toast.success('팔로우 헀습니다.');
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    }
  };

  const onClickDeleteFollower = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();

    try {
      if (user?.uid) {
        await removeFollowing(user, post);
      }
      toast.success('팔로우를 취소했습니다.');
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    if (post.uid) {
      getFollowers(post.uid, setPostFollowers);
    }
  }, [post.uid]);

  return (
    <>
      {user?.uid !== post?.uid &&
        (user?.uid && postFollowers.includes(user?.uid) ? (
          <button
            className={styles.following__btn}
            onClick={onClickDeleteFollower}
          >
            팔로워
          </button>
        ) : (
          <button className={styles.follow__btn} onClick={onClickFollow}>
            팔로우
          </button>
        ))}
    </>
  );
}
