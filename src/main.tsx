import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById("root")!).render(
    <GoogleOAuthProvider clientId="277339490997-m05m6i8ai7re1dnpsg5n4nj88043rmbb.apps.googleusercontent.com">
        <App />
    </GoogleOAuthProvider>
);
