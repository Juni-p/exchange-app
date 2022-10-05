/// <reference types="Cypress" />

const { exists } = require("fs");

const URL = "index.html";

context("Enchange", () => {
  before(() => {
    cy.visit(URL);
  });

  describe("La app no muestra los cambios de divisas si no pulsamos el botón calcular ", () => {
    it("se asegura que haya un formulario", () => {
      cy.get("#divisas").within(() => {
        cy.get("#fecha").should("exist");
        cy.get("select").should("exist");
        cy.get("#calcular").should("exist").contains("calcular");
        cy.get("option").should("have.length", 170);
      });
    });
  });

  describe("Selecciono una divisa y veo los tipo de cambios", () => {
    it("Se asegura funcionen los validadores de errores", () => {
      cy.get("#calcular").click();
      cy.get("#fecha").should("have.class", "error");
      cy.get("#base").should("have.class", "error");
      cy.get("li").should("have.length", 2);
      cy.get("li").eq(0).contains("Este campo no puede estar vacío.");
      cy.get("li")
        .eq(1)
        .contains("Este campo debe tener una divisa seleccionada.");
    });
    it("se asegura que los tipos de cambio funcionen correctamente", () => {
      cy.get("#fecha").type("2020-10-20");
      cy.get("#base").select("ARS");
      cy.get("#calcular").click();
      cy.get("li").should("not.exist");
      cy.get("#lista").within(() => {
        cy.get("li").should("have.length", 171);
      });
    });
  });
});
