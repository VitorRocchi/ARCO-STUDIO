import { describe, expect, it } from "vitest";
import { readSupabaseConfig } from "./config";

describe("configuração do Supabase", () => {
  it("informa configuração ausente sem expor valores parciais", () => {
    expect(readSupabaseConfig({})).toEqual({ configured: false });
    expect(readSupabaseConfig({ NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co" })).toEqual({ configured: false });
  });

  it("aceita URL válida e publishable key", () => {
    expect(readSupabaseConfig({
      NEXT_PUBLIC_SUPABASE_URL: "https://hwlbzwoigzorguxpaosr.supabase.co",
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_example",
    })).toEqual({
      configured: true,
      url: "https://hwlbzwoigzorguxpaosr.supabase.co",
      publishableKey: "sb_publishable_example",
    });
  });
});
