import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useAppSelector } from '../../services/hooks';

export const Feed: FC = () => {
  const orders: TOrder[] = useAppSelector((state) => state.feed.orders);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
