import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useAppSelector } from '../../services/hooks';

export const AppHeader: FC = () => {
  const user = useAppSelector((state) => state.user?.user);
  return <AppHeaderUI userName={user?.name} />;
};