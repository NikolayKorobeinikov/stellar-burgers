import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useAppDispatch } from '../../services/hooks';
import { registerUser } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError('');
    try {
      await dispatch(
        registerUser({ email, name: userName, password })
      ).unwrap();
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Ошибка регистрации');
    }
  };

  return (
    <RegisterUI
      errorText={error}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
