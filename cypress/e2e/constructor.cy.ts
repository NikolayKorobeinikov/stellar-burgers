/// <reference types="cypress" />

const MOCK_ACCESS_TOKEN = 'Bearer mock-access-token';
const MOCK_REFRESH_TOKEN = 'mock-refresh-token';

const SELECTOR = {
  modalClose: '[data-testid="modal-close"]',
  modalOverlay: '[data-testid="modal-overlay"]',
} as const;

const TEXT = {
  addButton: 'Добавить',
  ingredientModalTitle: 'Детали ингредиента',
  bunName: 'Краторная булка N-200i',
  mainName: 'Биокотлета из марсианской Магнолии',
  sauceName: 'Соус Spicy-X',
  bunTop: 'Краторная булка N-200i (верх)',
  bunBottom: 'Краторная булка N-200i (низ)',
  chooseBuns: 'Выберите булки',
  chooseFilling: 'Выберите начинку',
  orderIdLabel: 'идентификатор заказа',
  orderNumber: '12345',
  submitOrder: 'Оформить заказ',
} as const;

describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('createOrder');

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
    cy.contains(TEXT.addButton).first().click();
    cy.contains(TEXT.bunName).should('exist');
  });

  it('должен добавлять булки и начинки в конструктор', () => {
    cy.contains('li', TEXT.bunName).within(() => cy.contains(TEXT.addButton).click());
    cy.contains('li', TEXT.mainName).within(() => cy.contains(TEXT.addButton).click());
    cy.contains('li', TEXT.sauceName).within(() => cy.contains(TEXT.addButton).click());

    cy.get('section').contains(TEXT.bunTop).should('be.visible');
    cy.get('section').contains(TEXT.mainName).should('be.visible');
    cy.get('section').contains(TEXT.bunBottom).should('be.visible');
  });

  describe('Модальные окна ингредиента', () => {
    it('должен открывать модальное окно при клике на ингредиент', () => {
      cy.contains(TEXT.bunName).click();
      cy.get(SELECTOR.modalClose).should('be.visible');
      cy.contains(TEXT.ingredientModalTitle).should('be.visible');
      cy.contains(TEXT.bunName).should('be.visible');
    });

    it('должен отображать в модальном окне данные именно того ингредиента, по которому произошёл клик', () => {
      cy.contains('li', TEXT.mainName).click();
      cy.get(SELECTOR.modalClose).should('be.visible');
      cy.contains(TEXT.ingredientModalTitle).should('be.visible');
      cy.contains(TEXT.mainName).should('be.visible');
      cy.contains('4242').should('be.visible');
      cy.contains('Белки').should('be.visible');
    });

    it('должен закрывать модальное окно по клику на крестик', () => {
      cy.contains(TEXT.bunName).click();
      cy.get(SELECTOR.modalClose).should('be.visible').click();
      cy.get(SELECTOR.modalClose).should('not.exist');
      cy.contains(TEXT.ingredientModalTitle).should('not.exist');
    });

    it('должен закрывать модальное окно по клику на оверлей', () => {
      cy.contains(TEXT.bunName).click();
      cy.get(SELECTOR.modalOverlay).click({ force: true });
      cy.get(SELECTOR.modalClose).should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    beforeEach(() => {
      cy.contains('li', TEXT.bunName).within(() => cy.contains(TEXT.addButton).click());
      cy.contains('li', TEXT.mainName).within(() => cy.contains(TEXT.addButton).click());
    });

    it('должен оформить заказ, показать номер и очистить конструктор после закрытия', () => {
      cy.contains(TEXT.submitOrder).click();
      cy.wait('@createOrder');

      cy.get(SELECTOR.modalClose).should('be.visible');
      cy.contains(TEXT.orderNumber).should('be.visible');
      cy.contains(TEXT.orderIdLabel).should('be.visible');

      cy.get(SELECTOR.modalClose).click();
      cy.get(SELECTOR.modalClose).should('not.exist');

      cy.contains(TEXT.chooseBuns).should('be.visible');
      cy.contains(TEXT.chooseFilling).should('be.visible');
    });
  });
});
