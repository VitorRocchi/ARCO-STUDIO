import { Plus, Search } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { createClient } from "@/lib/supabase/server";

export default async function ClientsPage() {
  const supabase = await createClient();
  const response = supabase ? await supabase.from("clients").select("id,name,company_name,email,status,created_at").neq("status", "archived").order("created_at", { ascending: false }).limit(80) : { data: [] };
  const clients = response.data ?? [];
  return <><PageHeader eyebrow="Comercial" title="Clientes" description="Administre clientes, sistemas contratados e valores acordados em uma visão simples e confiável." action={<button className="button primary"><Plus/>Novo cliente</button>}/><div className="toolbar"><input className="search" aria-label="Pesquisar clientes" placeholder="Pesquisar por cliente, empresa ou contato"/><button className="button"><Search/>Buscar</button></div>{clients.length ? <section className="panel table-wrap"><table><thead><tr><th>Cliente</th><th>Empresa</th><th>Contato</th><th>Status</th></tr></thead><tbody>{clients.map((client) => <tr key={client.id}><td><strong>{client.name}</strong></td><td>{client.company_name || "—"}</td><td>{client.email || "—"}</td><td><span className="pill">{client.status === "active" ? "Ativo" : "Inativo"}</span></td></tr>)}</tbody></table></section> : <section className="panel"><EmptyState title="Nenhum cliente cadastrado" description="Adicione o primeiro cliente para vincular sistemas, planos e condições comerciais preservando o histórico contratado."/></section>}</>;
}
