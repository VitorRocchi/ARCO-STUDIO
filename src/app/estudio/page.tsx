import { Sparkles } from "lucide-react";
import { PageHeader } from "@/components/page-header";

export default function StudioPage() {
  return <><PageHeader eyebrow="Laboratório" title="Estúdio de Sistemas" description="Espaço reservado para a futura criação assistida de produtos digitais da ARCO."/><section className="studio"><div><div className="studio-mark"><Sparkles/></div><h2>O próximo capítulo da ARCO</h2><p>O Estúdio será construído como um ambiente dedicado para conceber, especificar e acompanhar novos softwares com inteligência artificial. Nenhuma automação fictícia foi ativada nesta etapa.</p><div className="eyebrow" style={{marginTop: 24}}>Em preparação</div></div></section></>;
}
