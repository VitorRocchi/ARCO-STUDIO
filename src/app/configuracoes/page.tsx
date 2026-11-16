import { ChevronRight, Plug, ShieldCheck, UserRound } from "lucide-react";
import { PageHeader } from "@/components/page-header";

const settings = [
  ["Minha conta", "Perfil, e-mail, papel e segurança da conta.", UserRound],
  ["Membros e acessos", "Convites, papéis internos e revogação de acesso.", ShieldCheck],
  ["Integrações", "Conexões autorizadas com GitHub, Vercel e provedor de IA.", Plug],
] as const;

export default function SettingsPage() {
  return <><PageHeader eyebrow="Administração" title="Configurações" description="Gerencie identidade, acesso interno e conexões técnicas do ARCO Client."/><section className="settings-list">{settings.map(([title, description, Icon]) => <button className="setting-row" key={title}><span style={{display:"flex",alignItems:"center",gap:14,textAlign:"left"}}><span className="empty-icon" style={{margin:0}}><Icon/></span><span><strong>{title}</strong><p>{description}</p></span></span><ChevronRight size={16}/></button>)}</section></>;
}
