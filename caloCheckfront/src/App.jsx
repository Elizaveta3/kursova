import { Routes, Route, Link} from 'react-router-dom'

import {MainPage} from './pages/mainPage'
import {RegisterPage} from './pages/registerPage'
import {AuthPage} from './pages/authPage'
import '../src/pages/static/styles/reset.css'

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element = {<MainPage />}/>
      <Route path="/register" element = {<RegisterPage />}/>
      <Route path="/auth" element = {<AuthPage />}/>
    </Routes>
    </>
  );
}

export default App;

