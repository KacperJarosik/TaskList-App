import {Route, Routes} from 'react-router-dom';
import './App.css';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import { AfterLogin } from './Components/LoginSignup/AfterLogin';
import { AuthProvider } from './contexts/AuthContext';
import Categories from './Tabs/Categories';
import Groups from './Tabs/Groups';
import Opinions from './Tabs/Opinions';
import Settings from './Tabs/Settings';

function App() {
  return (
  <div>
    <AuthProvider>
      <Routes>
        <Route path='/' element={<LoginSignup/>}/>
        <Route path='/after' element={<AfterLogin/>}/>
        <Route path='/categories' element={<Categories/>}/>
        <Route path='/groups' element={<Groups/>}/>
        <Route path='/opinions' element={<Opinions/>}/>
        <Route path='/settings' element={<Settings/>}/>

      </Routes>
    </AuthProvider>
  </div>
  );
}

export default App;
