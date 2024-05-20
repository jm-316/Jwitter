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
}

export interface PostListProps {
  post: PostProps;
}
