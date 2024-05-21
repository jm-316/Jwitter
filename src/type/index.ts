import { ReactNode } from 'react';

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
