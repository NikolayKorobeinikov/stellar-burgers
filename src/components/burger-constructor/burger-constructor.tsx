import { FC, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const constructorItems = useAppSelector((state) => state.burgerConstructor || {
    bun: null,
    ingredients: []
  });
  const orderRequest = useAppSelector((state) => state.order?.loading || false);
  const orderModalData = useAppSelector((state) => state.order?.order || null);
  const user = useAppSelector((state) => state.user?.user || null);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login');
      return;
    }
    console.log('Creating order...');
  };

  const closeOrderModal = () => {
    // Здесь будет логика закрытия модального окна
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};