import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from '../../services/hooks';
import { checkUserAuth } from '../../services/slices/userSlice';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { AppHeader } from '../app-header';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '../../pages';
import '../../index.css';
import styles from './app.module.css';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/orders' element={<ProfileOrders />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </div>
  );
};

export default App;
