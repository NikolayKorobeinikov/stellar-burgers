import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import {
  setCurrentIngredient,
  clearCurrentIngredient
} from '../../services/slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector((state) => state.ingredients.ingredients);
  const currentIngredient = useAppSelector(
    (state) => state.ingredients.currentIngredient
  );

  useEffect(() => {
    if (id) {
      const ingredient = ingredients.find((ing) => ing._id === id);
      if (ingredient) {
        dispatch(setCurrentIngredient(ingredient));
      }
    }
    return () => {
      dispatch(clearCurrentIngredient());
    };
  }, [id, ingredients, dispatch]);

  const ingredientData =
    currentIngredient ||
    (id ? ingredients.find((ing) => ing._id === id) : null);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
