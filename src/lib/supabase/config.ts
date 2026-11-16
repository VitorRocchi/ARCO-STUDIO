type PublicEnv = Record<string, string | undefined>;

export type SupabaseConfig =
  | { configured: false }
  | { configured: true; url: string; publishableKey: string };

export function readSupabaseConfig(env: PublicEnv = process.env): SupabaseConfig {
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !publishableKey) return { configured: false };
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return { configured: false };
  } catch {
    return { configured: false };
  }
  return { configured: true, url, publishableKey };
}
