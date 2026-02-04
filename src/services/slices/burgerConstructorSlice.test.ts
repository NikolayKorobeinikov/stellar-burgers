import {
  burgerConstructorReducer,
  initialState,
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
} from './burgerConstructorSlice';
import { TIngredient } from '@utils-types';

const mockBun: TIngredient = {
  _id: 'bun-1',
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
};

const mockMain: TIngredient = {
  _id: 'main-1',
  name: 'Биокотлета',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://example.com/meat.png',
  image_large: 'https://example.com/meat-large.png',
  image_mobile: 'https://example.com/meat-mobile.png',
};

describe('burgerConstructor reducer', () => {
  it('должен возвращать начальное состояние', () => {
    expect(burgerConstructorReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('должен обрабатывать добавление ингредиента (addIngredient)', () => {
    const state = burgerConstructorReducer(undefined, addIngredient(mockMain));
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toMatchObject({
      ...mockMain,
      id: expect.any(String),
    });
  });

  it('должен обрабатывать добавление булки (addBun)', () => {
    const state = burgerConstructorReducer(undefined, addBun(mockBun));
    expect(state.bun).toEqual(mockBun);
  });

  it('должен обрабатывать удаление ингредиента (removeIngredient)', () => {
    let state = burgerConstructorReducer(undefined, addIngredient(mockMain));
    const idToRemove = state.ingredients[0].id;
    state = burgerConstructorReducer(state, removeIngredient(idToRemove));
    expect(state.ingredients).toHaveLength(0);
  });

  it('должен обрабатывать изменение порядка ингредиентов (moveIngredient)', () => {
    let state = burgerConstructorReducer(undefined, addIngredient(mockMain));
    const firstId = state.ingredients[0].id;
    state = burgerConstructorReducer(
      state,
      addIngredient({
        ...mockMain,
        _id: 'main-2',
        name: 'Второй ингредиент',
      })
    );
    expect(state.ingredients).toHaveLength(2);
    const secondId = state.ingredients[1].id;
    state = burgerConstructorReducer(state, moveIngredient({ fromIndex: 0, toIndex: 1 }));
    expect(state.ingredients[0].id).toBe(secondId);
    expect(state.ingredients[1].id).toBe(firstId);
  });
});
