import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from '../src/context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
