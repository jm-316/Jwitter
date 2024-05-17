import { ToastContainer } from 'react-toastify';
import AppLayout from './components/layout/AppLayout';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer
        theme="dark"
        autoClose={1000}
        hideProgressBar
        newestOnTop
      />
      <AppLayout />
    </>
  );
}

export default App;
