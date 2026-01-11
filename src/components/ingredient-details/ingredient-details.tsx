import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useAppSelector } from '../../services/hooks';

export const IngredientDetails: FC = () => {
  const ingredientData = useAppSelector(
    (state) => state.ingredients.currentIngredient
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
