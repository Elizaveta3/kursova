import { Routes, Route} from 'react-router-dom'

import {MainPage} from './pages/mainPage'
import {RegisterPage} from './pages/registerPage'
import {AuthPage} from './pages/authPage'
import {AuthPageEnter} from './pages/authPageEnter'
import {Profile} from './pages/profile'
import {FillPage} from './pages/fillProf'
import {DiaryPage} from './pages/diaryPage'
import {ForgotPass} from './pages/resetPassword/forgotPassPage'
import {ProfileEdit} from './pages/profileEdit'
import {EmailVerification} from './pages/resetPassword/emailVerification'
import {ChangePassword} from './pages/resetPassword/changePassword'
import '../src/pages/static/styles/reset.css'



function App() {
  return (
    <>
    <Routes>
      <Route path="/" element = {<MainPage />}/>
      <Route path="/register" element = {<RegisterPage />}/>
      <Route path="/auth" element = {<AuthPage />}/>
      <Route path="/authEnter" element = {<AuthPageEnter />}/>
      <Route path="/profile" element = {<Profile />}/>
      <Route path="/fillProfile" element = {<FillPage/>}/>
      <Route path= "/diary" element = {<DiaryPage/>}/>
      <Route path= "/profileEditing" element = {<ProfileEdit/>}/>
      <Route path= "/forgotPassword" element = {<ForgotPass/>}/>
      <Route path= "/emailVer" element = {<EmailVerification/>}/>
      <Route path= "/changePassword" element = {<ChangePassword/>}/>
    </Routes>
    </>
  );
}

export default App;

