import {Route, Routes} from 'react-router-dom';
import './App.css';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import {AfterLogin} from './Components/LoginSignup/AfterLogin';

function App() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<LoginSignup/>}/>
                <Route path='/after' element={<AfterLogin/>}/>
            </Routes>
        </div>
    );
}

export default App;
