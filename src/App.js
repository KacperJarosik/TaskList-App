import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import { AfterLogin } from './Components/LoginSignup/AfterLogin';
import { AuthProvider } from './contexts/AuthContext';
function App() {
  return (
  <div>
    <AuthProvider>
      <Routes>
        <Route path='/' element={<LoginSignup/>}/>
        <Route path='/after' element={<AfterLogin/>}/>
      </Routes>
    </AuthProvider>
  </div>
  );
}

export default App;
