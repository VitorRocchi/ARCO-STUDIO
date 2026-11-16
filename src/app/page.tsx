import { Activity, ArrowRight, CircleAlert, Plus } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { getDashboardMetrics } from "@/lib/dashboard";

export default async function DashboardPage() {
  const data = await getDashboardMetrics();
  const metrics = [
    ["Sistemas cadastrados", data.systems, data.systems ? "Portfólio total" : "Nenhum sistema registrado"],
    ["Clientes ativos", data.activeClients, data.activeClients ? "Em relacionamento ativo" : "Sem clientes ativos"],
    ["Contratações ativas", data.activeSubscriptions, data.activeSubscriptions ? "Contratos em andamento" : "Sem contratações"],
    ["Alterações pendentes", data.pendingChanges, data.pendingChanges ? "Aguardando andamento" : "Tudo em dia"],
  ] as const;
  return <>
    <PageHeader eyebrow="Operação" title="Visão Geral" description="Acompanhe os indicadores essenciais da ARCO e concentre a atenção no que precisa avançar." action={<button className="button primary"><Plus/>Cadastrar sistema</button>}/>
    <section className="metrics" aria-label="Indicadores">{metrics.map(([label, value, note]) => <article className="metric" key={label}><div className="metric-label">{label}</div><div className="metric-value">{value}</div><div className="metric-note">{note}</div></article>)}</section>
    <div className="grid-2">
      <section className="panel"><div className="panel-head"><div><div className="panel-title">Evolução comercial</div><div className="panel-caption">Contratações confirmadas nos últimos 6 meses</div></div><button className="button ghost">6 meses <ArrowRight/></button></div><EmptyState title="O gráfico aparecerá com os primeiros dados" description="Cadastre clientes e contratações para acompanhar a evolução real, sem projeções artificiais."/></section>
      <section className="panel"><div className="panel-head"><div><div className="panel-title">Pendências</div><div className="panel-caption">Itens que exigem atenção</div></div><CircleAlert size={16}/></div><EmptyState compact title="Nenhuma pendência aberta" description="Problemas e solicitações prioritárias serão reunidos aqui."/></section>
    </div>
    <section className="panel" style={{marginTop: 20}}><div className="panel-head"><div><div className="panel-title">Atividade recente</div><div className="panel-caption">Movimentações dos módulos internos</div></div><Activity size={16}/></div><EmptyState compact title="Nenhuma atividade registrada" description="As ações relevantes aparecerão aqui após o início da operação."/></section>
  </>;
}
