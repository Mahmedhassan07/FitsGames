import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react'

const AuthContext = createContext(null);
const API_BASE=`https://api.fitsgames.com/v2`;
const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    useEffect(()=>
    {
        const token = localStorage.getItem('token')
        async function checkAuth()
        {
            if(!token)
            {
                setLoading(false);
                return;
            }
                try
                {
                const res = await fetch(`${API_BASE}/auth/me`,
                    {
                        headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
                    });
                if(!res.ok)
                {
                    throw new Error("Invalid Session");
                }
                const data = await res.json();
                setUser(data);
                }
                catch(err)
                {
                    console.log(err);
                    localStorage.removeItem('token');
                }
                finally
                {
                    setLoading(false);
                }
                
            }
            checkAuth();
    },[])

    function login(user,token)
    {
        localStorage.setItem('token',token);
        setUser(user);
    }

    function logout()
    {
        console.log("logout ran")
        localStorage.removeItem('token');
        setUser(null)
    }
    
  return (
    <AuthContext.Provider value={{user,loading,login,logout}}>
        {children}
    </AuthContext.Provider>
  )
}

export  {AuthContext,AuthProvider}