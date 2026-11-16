import { describe, expect, it } from "vitest";
import { emptyDashboardMetrics } from "./dashboard-metrics";

describe("indicadores vazios", () => {
  it("não inventa variações ou histórico quando não há banco configurado", () => {
    expect(emptyDashboardMetrics()).toEqual({ systems: 0, activeClients: 0, activeSubscriptions: 0, pendingChanges: 0 });
  });
});
