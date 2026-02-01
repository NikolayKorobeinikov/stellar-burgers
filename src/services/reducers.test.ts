import { rootReducer } from './reducers';

describe('rootReducer', () => {
  it('должен возвращать корректное начальное состояние при вызове с undefined и экшеном, не обрабатываемым редьюсерами', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toBeDefined();
    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('order');
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('orderHistory');

    expect(state.ingredients).toEqual({
      ingredients: [],
      currentIngredient: null,
      loading: false,
      error: null,
    });
    expect(state.burgerConstructor).toEqual({
      bun: null,
      ingredients: [],
    });
    expect(state.order).toEqual({
      order: null,
      loading: false,
      error: null,
    });
    expect(state.user).toEqual({
      user: null,
      isAuthChecked: false,
      loading: false,
      error: null,
    });
    expect(state.feed).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      loading: false,
      error: null,
    });
    expect(state.orderHistory).toEqual({
      orders: [],
      loading: false,
      error: null,
    });
  });
});
