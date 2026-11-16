"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";
import { navigation } from "@/lib/navigation";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/login") || pathname.startsWith("/auth") || pathname.startsWith("/acesso-negado")) return children;
  const current = navigation.find((item) => item.href === "/" ? pathname === "/" : pathname.startsWith(item.href));

  return <div className="app-shell">
    <aside className="sidebar" aria-label="Navegação principal">
      <div className="brand"><div className="brand-mark">AR</div><div className="brand-copy"><div className="brand-name">ARCO Client</div><div className="brand-caption">Operações internas</div></div></div>
      <nav className="nav">{navigation.map(({ href, label, icon: Icon }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return <Link key={href} href={href} className={`nav-link${active ? " active" : ""}`} aria-current={active ? "page" : undefined} title={label}><Icon aria-hidden="true"/><span>{label}</span></Link>;
      })}</nav>
      <div className="sidebar-foot">Ambiente interno<br/>ARCO · 2026</div>
    </aside>
    <main className="main">
      <header className="topbar">
        <div><span className="mobile-brand">ARCO Client</span><span className="breadcrumb">ARCO / {current?.label ?? "Área interna"}</span></div>
        <div className="top-actions"><span className="key">⌘ K</span><button className="button ghost" aria-label="Notificações"><Bell size={15}/></button><div className="avatar" aria-label="Conta">VP</div></div>
      </header>
      <div className="content">{children}</div>
    </main>
  </div>;
}
