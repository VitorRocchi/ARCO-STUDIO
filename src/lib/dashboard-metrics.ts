export type DashboardMetrics = { systems: number; activeClients: number; activeSubscriptions: number; pendingChanges: number };

export function emptyDashboardMetrics(): DashboardMetrics {
  return { systems: 0, activeClients: 0, activeSubscriptions: 0, pendingChanges: 0 };
}
