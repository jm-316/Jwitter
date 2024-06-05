import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Home from './pages/home/index.tsx';
import PostDetailPage from './pages/posts/detail.tsx';
import PostEditPage from './pages/posts/edit.tsx';
import NotificationsPage from './pages/notifications/index.tsx';
import ProfilePage from './pages/profile/index.tsx';
import ProfileEditPage from './pages/profile/edit.tsx';
import SearchPage from './pages/search/index.tsx';
import LoginPage from './pages/users/login.tsx';
import SignupPage from './pages/users/signup.tsx';
import NotFoundPage from './pages/notFound/index.tsx';
import MainPage from './pages/main/index.tsx';
import AppLayout from './components/layout/AppLayout.tsx';
import { AuthContextProvider } from './components/context/AuthContext.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import { SearchContextProvider } from './components/context/SearchContext.tsx';
import './index.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: 'posts',
        children: [
          { path: ':id', element: <PostDetailPage /> },
          { path: 'edit/:id', element: <PostEditPage /> },
        ],
      },
      {
        path: 'users',
        children: [
          { path: '', element: <MainPage /> },
          { path: 'login', element: <LoginPage /> },
          { path: 'signup', element: <SignupPage /> },
        ],
      },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'profile/edit', element: <ProfileEditPage /> },
      { path: 'notifications', element: <NotificationsPage /> },
      { path: 'search', element: <SearchPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthContextProvider>
    <SearchContextProvider>
      <RouterProvider router={router} />
    </SearchContextProvider>
  </AuthContextProvider>,
);
