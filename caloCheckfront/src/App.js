import { Routes, Route, Link} from 'react-router-dom'

import {RegisterPage} from './pages/registerPage'
import {AuthPage} from './pages/authPage'

function App() {
  return (
    <>
    
    <header>
      <a href="/register"> Зареєструватися</a>
      <a href="/auth"> Увійти</a>
    </header>

    <Routes>
      <Route path="/register" element = {<RegisterPage />}/>
      <Route path="/auth" element = {<AuthPage />}/>
    </Routes>
    </>
  );
}

export default App;

