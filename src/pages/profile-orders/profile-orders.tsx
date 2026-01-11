import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useAppSelector } from '../../services/hooks';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useAppSelector((state) => state.orderHistory.orders);

  return <ProfileOrdersUI orders={orders} />;
};
