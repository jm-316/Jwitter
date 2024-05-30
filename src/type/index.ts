import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface AuthProps {
  children: ReactNode;
}

export interface PostProps {
  id: string;
  email: string;
  content: string;
  createdAt: string;
  uid: string;
  profileUrl?: string;
  hashTags?: string[];
  imageUrl?: string;
  likes?: string[];
  likeCount?: number;
  comments?: CommentProps[];
}

export interface PostListProps {
  post: PostProps;
}

export interface CommentFromProps {
  post: PostProps | null;
}

export interface CommentProps {
  comment: string;
  uid: string;
  email: string;
  createdAt: string;
}

export interface CommentListProps {
  comment: CommentProps;
  post: PostProps;
}

export interface SearchProps {
  isHome: boolean;
}

export interface SearchContextProps {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
}

export interface FollowingProps {
  post: PostProps;
}

export interface UserProps {
  id: string;
}

export type TabType = 'all' | 'following';

export type ProfileTabType = 'my' | 'like';

export interface NotificationProps {
  id: string;
  uid: string;
  url: string;
  isRead: boolean;
  content: string;
  createdAt: string;
}
