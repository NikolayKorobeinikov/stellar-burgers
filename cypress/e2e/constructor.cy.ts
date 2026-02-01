/// <reference types="cypress" />

const API_URL = 'https://norma.education-services.ru/api';
const MOCK_ACCESS_TOKEN = 'Bearer mock-access-token';
const MOCK_REFRESH_TOKEN = 'mock-refresh-token';

describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', `${API_URL}/ingredients`, { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', `${API_URL}/auth/user`, { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', `${API_URL}/orders`, { fixture: 'order.json' }).as('createOrder');

    cy.setCookie('accessToken', MOCK_ACCESS_TOKEN);
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('refreshToken', MOCK_REFRESH_TOKEN);
      },
    });
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    cy.window().then((win) => {
      win.localStorage.removeItem('refreshToken');
    });
  });

  it('должен загружать ингредиенты с моковыми данными', () => {
    cy.get('section').contains('Булки').should('be.visible');
    cy.get('section').contains('Начинки').should('be.visible');
    cy.get('section').contains('Соусы').should('be.visible');
  });

  it('должен добавлять один ингредиент в конструктор', () => {
    cy.contains('Добавить').first().click();
    cy.contains('Краторная булка N-200i').should('exist');
  });

  it('должен добавлять булки и начинки в конструктор', () => {
    cy.contains('li', 'Краторная булка N-200i').within(() => cy.contains('Добавить').click());
    cy.contains('li', 'Биокотлета из марсианской Магнолии').within(() => cy.contains('Добавить').click());
    cy.contains('li', 'Соус Spicy-X').within(() => cy.contains('Добавить').click());

    cy.get('section').contains('Краторная булка N-200i (верх)').should('be.visible');
    cy.get('section').contains('Биокотлета из марсианской Магнолии').should('be.visible');
    cy.get('section').contains('Краторная булка N-200i (низ)').should('be.visible');
  });

  describe('Модальные окна ингредиента', () => {
    it('должен открывать модальное окно при клике на ингредиент', () => {
      cy.contains('Краторная булка N-200i').click();
      cy.get('[data-testid="modal-close"]').should('be.visible');
      cy.contains('Детали ингредиента').should('be.visible');
      cy.contains('Краторная булка N-200i').should('be.visible');
    });

    it('должен отображать в модальном окне данные именно того ингредиента, по которому произошёл клик', () => {
      cy.contains('li', 'Биокотлета из марсианской Магнолии').click();
      cy.get('[data-testid="modal-close"]').should('be.visible');
      cy.contains('Детали ингредиента').should('be.visible');
      cy.contains('Биокотлета из марсианской Магнолии').should('be.visible');
      cy.contains('4242').should('be.visible');
      cy.contains('Белки').should('be.visible');
    });

    it('должен закрывать модальное окно по клику на крестик', () => {
      cy.contains('Краторная булка N-200i').click();
      cy.get('[data-testid="modal-close"]').should('be.visible').click();
      cy.get('[data-testid="modal-close"]').should('not.exist');
      cy.contains('Детали ингредиента').should('not.exist');
    });

    it('должен закрывать модальное окно по клику на оверлей', () => {
      cy.contains('Краторная булка N-200i').click();
      cy.get('[data-testid="modal-overlay"]').should('be.visible').click({ force: true });
      cy.get('[data-testid="modal-close"]').should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    beforeEach(() => {
      cy.contains('li', 'Краторная булка N-200i').within(() => cy.contains('Добавить').click());
      cy.contains('li', 'Биокотлета из марсианской Магнолии').within(() => cy.contains('Добавить').click());
    });

    it('должен оформить заказ, показать номер и очистить конструктор после закрытия', () => {
      cy.contains('Оформить заказ').click();
      cy.wait('@createOrder');

      cy.get('[data-testid="modal-close"]').should('be.visible');
      cy.contains('12345').should('be.visible');
      cy.contains('идентификатор заказа').should('be.visible');

      cy.get('[data-testid="modal-close"]').click();
      cy.get('[data-testid="modal-close"]').should('not.exist');

      cy.contains('Выберите булки').should('be.visible');
      cy.contains('Выберите начинку').should('be.visible');
    });
  });
});
