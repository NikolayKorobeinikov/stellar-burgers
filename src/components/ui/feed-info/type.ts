import { TFeedState } from '../../../services/slices/feedSlice';

export type FeedInfoUIProps = {
  feed: Pick<TFeedState, 'total' | 'totalToday'>;
  readyOrders: number[];
  pendingOrders: number[];
};

export type HalfColumnProps = {
  orders: number[];
  title: string;
  textColor?: string;
};

export type TColumnProps = {
  title: string;
  content: number;
};
