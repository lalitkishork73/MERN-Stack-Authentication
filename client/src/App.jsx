import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css';
import Main from './components/Main/main';
import Signup from './components/SignUp/SignUp';
import Login from './components/Login/Login';
function App() {
  const user = localStorage.getItem("token");
  return (
    <>
      <main>
        <Routes>
          {user && <Route path="/" exact element={<Main />} />}
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
