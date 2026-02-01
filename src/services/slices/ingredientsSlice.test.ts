import {
  ingredientsReducer,
  fetchIngredients,
} from './ingredientsSlice';
import { TIngredient } from '@utils-types';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Краторная булка',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://example.com/bun.png',
    image_large: 'https://example.com/bun-large.png',
    image_mobile: 'https://example.com/bun-mobile.png',
  },
];

describe('ingredients reducer', () => {
  const initialState = {
    ingredients: [],
    currentIngredient: null,
    loading: false,
    error: null,
  };

  it('должен возвращать начальное состояние', () => {
    expect(ingredientsReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('при вызове fetchIngredients.pending store.loading должен стать true', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredients.pending('', undefined)
    );
    expect(state.loading).toBe(true);
  });

  it('при вызове fetchIngredients.fulfilled данные записываются в store.data и store.loading становится false', () => {
    let state = ingredientsReducer(
      undefined,
      fetchIngredients.pending('', undefined)
    );
    expect(state.loading).toBe(true);

    state = ingredientsReducer(
      state,
      fetchIngredients.fulfilled(mockIngredients, '', undefined)
    );
    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
    expect(state.error).toBeNull();
  });

  it('при вызове fetchIngredients.rejected ошибка записывается в store.error и store.loading становится false', () => {
    let state = ingredientsReducer(
      undefined,
      fetchIngredients.pending('', undefined)
    );
    expect(state.loading).toBe(true);

    const errorMessage = 'Network error';
    state = ingredientsReducer(
      state,
      fetchIngredients.rejected(new Error(errorMessage), '', undefined)
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
