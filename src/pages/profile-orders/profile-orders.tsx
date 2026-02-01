import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { fetchOrderHistory } from '../../services/slices/orderHistorySlice';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();
  const orders: TOrder[] = useAppSelector((state) => state.orderHistory.orders);

  useEffect(() => {
    dispatch(fetchOrderHistory());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
