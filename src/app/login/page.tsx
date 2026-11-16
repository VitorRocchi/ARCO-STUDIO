import { LockKeyhole } from "lucide-react";
import { login } from "./actions";
import { readSupabaseConfig } from "@/lib/supabase/config";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ erro?: string }> }) {
  const params = await searchParams;
  const configured = readSupabaseConfig().configured;
  const message = params.erro === "credenciais" ? "E-mail ou senha inválidos." : params.erro === "configuracao" ? "Configure o Supabase antes de entrar." : null;
  return <main className="login-page"><section className="login-card"><div className="brand" style={{padding:0,marginBottom:34}}><div className="brand-mark">AR</div><div className="brand-copy"><div className="brand-name">ARCO Client</div><div className="brand-caption">Acesso interno protegido</div></div></div><div className="empty-icon" style={{margin:"0 0 18px"}}><LockKeyhole/></div><h1 style={{fontSize:26}}>Bem-vindo de volta</h1><p className="subtitle">Entre com a identidade interna autorizada para acessar a operação da ARCO.</p>{!configured && <div className="notice">O ambiente ainda não possui uma chave pública do Supabase. Copie <code>.env.example</code> para <code>.env.local</code> e informe a publishable key.</div>}{message && <div className="notice error">{message}</div>}<form action={login} className="login-form"><label>E-mail<input name="email" type="email" autoComplete="email" required placeholder="voce@arco.com"/></label><label>Senha<input name="password" type="password" autoComplete="current-password" required placeholder="Sua senha"/></label><button className="button primary" disabled={!configured}>Entrar com segurança</button></form><p className="login-foot">Cadastro público desativado · ARCO 2026</p></section></main>;
}
