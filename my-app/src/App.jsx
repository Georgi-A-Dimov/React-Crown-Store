import './App.scss'
import { Routes, Route } from 'react-router-dom';

import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import UserProfile from './routes/profile/profile.component';
import NotFoundPage from './routes/404-page/404-page.component';
import ProfileGuard from './components/route-guards/profile-route-guard.component';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index element={<Home/>} />
        <Route path='auth' element={<Authentication/>}/>
        <Route path='profile' element={
          <ProfileGuard>
            <UserProfile/>
          </ProfileGuard>
        }/>
        <Route path='shop/*' element={<Shop/>}/>
        <Route path='checkout' element={<Checkout/>}/>
        <Route path="*" element={<NotFoundPage/>} />
      </Route>
    </Routes>
  );
}

export default App
