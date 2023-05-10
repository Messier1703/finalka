import './App.css';
import Home from './pages/home/Home';
import AppHeader from './components/header/AppHeader';
import Login from './pages/auth/login/Login';
import Register from './pages/auth/reg/Register';

function App() {
  return (
    <div className="App">
      <AppHeader/>
      <Home/>
      <Login/>
      <Register/>
    </div>
  );
}

export default App;
