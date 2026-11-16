import { Filter, Plus, Search } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { createClient } from "@/lib/supabase/server";
import { systemStatusLabel } from "@/lib/navigation";

export default async function SystemsPage() {
  const supabase = await createClient();
  const response = supabase ? await supabase.from("systems").select("id,name,description,category,origin,status").neq("status", "archived").order("updated_at", { ascending: false }).limit(60) : { data: [] };
  const systems = response.data ?? [];
  return <><PageHeader eyebrow="Portfólio" title="Sistemas" description="Organize os produtos da ARCO e incorpore sistemas desenvolvidos por sócios ou parceiros." action={<button className="button primary"><Plus/>Novo sistema</button>}/><div className="toolbar"><input className="search" aria-label="Pesquisar sistemas" placeholder="Pesquisar por nome ou categoria"/><button className="button"><Filter/>Filtros</button><button className="button"><Search/>Buscar</button></div>{systems.length ? <section className="cards">{systems.map((system) => <article className="system-card" key={system.id}><div className="system-logo">{system.name.slice(0, 2).toUpperCase()}</div><div className="pill">{systemStatusLabel[system.status as keyof typeof systemStatusLabel] ?? system.status}</div><h2>{system.name}</h2><p>{system.description || "Sem descrição cadastrada."}</p><div className="card-meta"><span>{system.category || "Sem categoria"}</span><span>{system.origin === "external" ? "Externo" : "ARCO"}</span></div></article>)}</section> : <section className="panel"><EmptyState title="Seu portfólio começa aqui" description="Cadastre um produto próprio ou incorpore um sistema existente. Repositórios e projetos externos só serão conectados após autorização real."/></section>}</>;
}
