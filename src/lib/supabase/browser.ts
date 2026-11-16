"use client";

import { createBrowserClient } from "@supabase/ssr";
import { readSupabaseConfig } from "./config";

export function createClient() {
  const config = readSupabaseConfig();
  if (!config.configured) return null;
  return createBrowserClient(config.url, config.publishableKey);
}
