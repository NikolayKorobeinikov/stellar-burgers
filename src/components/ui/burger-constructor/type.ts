import { TOrder } from '@utils-types';
import { TBurgerConstructorState } from '../../../services/slices/burgerConstructorSlice';

export type BurgerConstructorUIProps = {
  constructorItems: TBurgerConstructorState;
  orderRequest: boolean;
  price: number;
  orderModalData: TOrder | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
