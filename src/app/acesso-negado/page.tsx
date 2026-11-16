import { ShieldX } from "lucide-react";
import { logout } from "@/app/login/actions";

export default function AccessDeniedPage() {
  return <main className="login-page"><section className="login-card"><div className="empty-icon" style={{margin:"0 0 18px"}}><ShieldX/></div><div className="eyebrow">Acesso restrito</div><h1 style={{fontSize:26}}>Conta não autorizada</h1><p className="subtitle">Sua identidade foi autenticada, mas não existe um vínculo interno ativo no ARCO Client. Solicite acesso a um administrador.</p><form action={logout} style={{marginTop:24}}><button className="button">Sair desta conta</button></form></section></main>;
}
