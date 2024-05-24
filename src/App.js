import {Route, Routes} from 'react-router-dom';
import './App.css';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import { AfterLogin } from './Components/LoginSignup/AfterLogin';
import { AuthProvider } from './contexts/AuthContext';
import Categories from './Tabs/Categories';
import Groups from './Tabs/Groups';
import Opinions from './Tabs/Opinions';
import Settings from './Tabs/Settings';
import CategorisViev from './Tabs/CategorisViev';
import TaskInCat from './Tabs/TaskVievInCategories';

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
        <Route path="/categories" element={<CategorisViev />} />
        <Route path="/categories/tasks/:categoryId" element={<TaskInCat />} />

      </Routes>
    </AuthProvider>
  </div>
  );
}

export default App;
