import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import GameDetail from './pages/GameDetail'
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import './App.css'
import AuthPage from './components/AuthPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoutes';
import PlayGame from './components/PlayGames';

function App() {
  return (
    <>
    <LanguageProvider>    
    <BrowserRouter>
    <AuthProvider>
    <Routes>
      <Route path='/auth' element={<AuthPage/>}/>
      <Route path="/" element={<Home/>}/>
    
      <Route path="/game/:id" element={
          <ProtectedRoute>
            <GameDetail/>
          </ProtectedRoute>}/>
      <Route path="/game/:id/play" element={<PlayGame />} />
      <Route path ="*" element={<h1>404 Not Found</h1>}/>
    </Routes>
    </AuthProvider>
    </BrowserRouter>
    </LanguageProvider>
    </>
  )
}

export default App
