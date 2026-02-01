import { FC, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { getOrderByNumber } from '../../services/slices/orderSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useAppDispatch();
  const orderFromState = useAppSelector((state) => state.order.order);
  const feedOrders = useAppSelector((state) => state.feed.orders);
  const orderHistoryOrders = useAppSelector(
    (state) => state.orderHistory.orders
  );
  const ingredients = useAppSelector((state) => state.ingredients.ingredients);
  const loading = useAppSelector((state) => state.order.loading);

  useEffect(() => {
    if (number && !orderFromState) {
      const orderNumber = parseInt(number, 10);
      const orderFromFeed = feedOrders.find(
        (order: TOrder) => order.number === orderNumber
      );
      const orderFromHistory = orderHistoryOrders.find(
        (order: TOrder) => order.number === orderNumber
      );

      if (!orderFromFeed && !orderFromHistory) {
        dispatch(getOrderByNumber(orderNumber));
      }
    }
  }, [number, orderFromState, feedOrders, orderHistoryOrders, dispatch]);

  const orderData =
    orderFromState ||
    (number
      ? feedOrders.find(
          (order: TOrder) => order.number === parseInt(number, 10)
        )
      : null) ||
    (number
      ? orderHistoryOrders.find(
          (order: TOrder) => order.number === parseInt(number, 10)
        )
      : null);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (loading || !orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
