import { createClient } from "@/lib/supabase/server";
import { emptyDashboardMetrics, type DashboardMetrics } from "./dashboard-metrics";

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const supabase = await createClient();
  if (!supabase) return emptyDashboardMetrics();
  const [systems, clients, subscriptions, changes] = await Promise.all([
    supabase.from("systems").select("id", { count: "exact", head: true }),
    supabase.from("clients").select("id", { count: "exact", head: true }).eq("status", "active"),
    supabase.from("client_subscriptions").select("id", { count: "exact", head: true }).eq("status", "active"),
    supabase.from("system_change_requests").select("id", { count: "exact", head: true }).in("status", ["draft", "review", "approved", "forwarded", "in_progress"]),
  ]);
  return {
    systems: systems.count ?? 0,
    activeClients: clients.count ?? 0,
    activeSubscriptions: subscriptions.count ?? 0,
    pendingChanges: changes.count ?? 0,
  };
}
