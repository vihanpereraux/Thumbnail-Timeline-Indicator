import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages
import Home from './pages/Home'
import MovieScreen from './pages/MovieScreen'

// stylesheet
import './App.css'

const App: React.FC = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/screen' Component={MovieScreen}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}


export default App
