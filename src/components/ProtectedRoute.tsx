import { Navigate } from 'react-router';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import { AuthProps } from '../type';

export default function ProtectedRoute({ children }: AuthProps) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/users" replace />;
  }

  return children;
}
