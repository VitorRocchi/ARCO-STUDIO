import { describe, expect, it } from "vitest";
import { navigation, systemStatusLabel } from "./navigation";

describe("navegação principal", () => {
  it("expõe exatamente as cinco áreas do produto", () => {
    expect(navigation.map((item) => item.label)).toEqual([
      "Visão Geral",
      "Estúdio de Sistemas",
      "Sistemas",
      "Clientes",
      "Configurações",
    ]);
  });

  it("traduz todos os estados persistidos de sistema", () => {
    expect(systemStatusLabel).toEqual({
      development: "Em desenvolvimento",
      published: "Publicado",
      commercialized: "Comercializado",
      archived: "Arquivado",
    });
  });
});
