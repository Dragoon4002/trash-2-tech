// Login.jsx
"use client"
import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { LogOut } from 'lucide-react';
import axios from 'axios';
const [user, setUser] = useState(null);

function GoogleLogin() {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
        );

        setUser(userInfo.data); // Contains user information
        // Here you can manage the user data, set state, etc.
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <button onClick={() => login()}>
      Sign in with Google
    </button>
  );
}

function GoogleLogout () {
    setUser(null);
    return (
        <button>
           <LogOut/> Sign Out 
        </button>
    )
}

export default {GoogleLogin, GoogleLogout};