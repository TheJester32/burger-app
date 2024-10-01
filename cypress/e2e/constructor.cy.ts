import "@4tw/cypress-drag-drop";

describe("constructor", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.viewport(1920, 1080);
    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" }).as(
      "getIngredients"
    );
    cy.wait("@getIngredients");

    cy.get('ul[data-cy="ingredients"]')
      .children()
      .should("exist")
      .as("ingredients");

    cy.get("@ingredients").eq(1).as("bun");
    cy.get("@ingredients").eq(3).as("main");
    cy.get("@ingredients").last().as("sauce");
  });

  it("add ingredients in constructor", () => {
    cy.get('ul[data-cy="bun-upper-drag-area"]').as("dropContainerUpperBun");
    cy.get('ul[data-cy="main-middle"]').as("dropMiddleContainer");
    cy.get('ul[data-cy="bun-lower-drag-area"]').as("dropContainerLowerBun");
    cy.get("@bun").drag("@dropContainerUpperBun");
    cy.get("@main").drag("@dropMiddleContainer");
    cy.get("@sauce").drag("@dropMiddleContainer");

    cy.get('ul[data-cy="bun-upper-drag-area"]').as("orderIngredients");
    cy.get('ul[data-cy="main-middle"]').as("orderIngredients");
    cy.get('ul[data-cy="bun-lower-drag-area"]').as("orderIngredients");

    cy.get("@orderIngredients").eq(0).should('not.be.empty');
    cy.get("@orderIngredients").eq(1).should('not.be.empty');
    cy.get("@orderIngredients").eq(2).should('not.be.empty');

    cy.get("button[data-cy='place-order']").click();

    cy.get("input[name=email]").type("test@yandex.ru");
    cy.get("input[name=password]").type("Qwe1234");
    cy.get("button[type='submit']").click();

    cy.intercept("POST", "api/auth/login", { fixture: "user.json" });

    cy.get("button[data-cy='place-order']").click();
    cy.intercept("POST", "api/orders", { fixture: "order.json" }).as("order");

    cy.wait("@order");
    cy.get('h3[data-cy="order-number"]').contains("666");
  });
});
