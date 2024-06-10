import './App.scss'
import { Routes, Route } from 'react-router-dom';

import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import SignIn from './routes/sign-in/sighn-in.component';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index element={<Home/>} />
        <Route path='sign-in' element={<SignIn/>}/>
      </Route>
    </Routes>
  );
}

export default App
