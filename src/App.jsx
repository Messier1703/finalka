import './App.css';
import Home from './pages/home/Home';
import AppHeader from './components/header/AppHeader';
import Login from './pages/auth/login/Login';
import Register from './pages/auth/register/Register';
import ClientProfile from './pages/ClientProfile/ClientProfile';
import { Route, Routes } from 'react-router-dom';
import PostApplication from './components/PostApplication/PostApplication';
import ManagerPage from './pages/ManagerPage/ManagerPage';
import BrigadePage from './pages/BrigadePage/BrigadePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/client-profile" element={<ClientProfile />} />
        <Route path="/post-application" element={<PostApplication />} />
        <Route path="/brigade-page" element={<BrigadePage />} />
        <Route path="/manager-page" element={<ManagerPage />} />
      </Routes>
    </div>
  );
}

export default App;
