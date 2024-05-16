import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App.tsx';
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
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: 'posts',
    children: [
      { path: '/posts', element: <PostListPage /> },
      { path: '/posts/:id', element: <PostDetailPage /> },
      { path: '/posts/edit/:id', element: <PostEditPage /> },
      { path: '/posts/new', element: <PostNewPage /> },
    ],
  },
  {
    path: 'users',
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
    ],
  },
  { path: '/profile', element: <ProfilePage /> },
  { path: '/profile/edit', element: <ProfileEditPage /> },
  { path: '/notifications', element: <NotificationsPage /> },
  { path: '/search', element: <SearchPage /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
