import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import React from 'react';
import Home from './pages/home/index.tsx';
import PostListPage from './pages/posts/index.tsx';
import PostDetailPage from './pages/posts/detail.tsx';
import PostEditPage from './pages/posts/edit.tsx';
import PostNewPage from './pages/posts/new.tsx';
import NotificationsPage from './pages/notifications/index.tsx';
import ProfilePage from './pages/profile/index.tsx';
import ProfileEditPage from './pages/profile/edit.tsx';
import SearchPage from './pages/search/index.tsx';
import LoginPage from './pages/users/login.tsx';
import SignupPage from './pages/users/signup.tsx';
import NotFoundPage from './pages/notFound/index.tsx';
import AppLayout from './components/layout/AppLayout.tsx';
import './index.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />, // 최상위 라우트에서 AppLayout 적용
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'posts',
        children: [
          { path: '', element: <PostListPage /> }, // /posts
          { path: ':id', element: <PostDetailPage /> }, // /posts/:id
          { path: 'edit/:id', element: <PostEditPage /> }, // /posts/edit/:id
          { path: 'new', element: <PostNewPage /> }, // /posts/new
        ],
      },
      {
        path: 'users',
        children: [
          { path: 'login', element: <LoginPage /> }, // /users/login
          { path: 'signup', element: <SignupPage /> }, // /users/signup
        ],
      },
      { path: 'profile', element: <ProfilePage /> }, // /profile
      { path: 'profile/edit', element: <ProfileEditPage /> }, // /profile/edit
      { path: 'notifications', element: <NotificationsPage /> }, // /notifications
      { path: 'search', element: <SearchPage /> }, // /search
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
