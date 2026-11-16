import { BarChart3, Building2, Cog, PanelsTopLeft, Sparkles } from "lucide-react";

export const navigation = [
  { label: "Visão Geral", href: "/", icon: BarChart3 },
  { label: "Estúdio de Sistemas", href: "/estudio", icon: Sparkles },
  { label: "Sistemas", href: "/sistemas", icon: PanelsTopLeft },
  { label: "Clientes", href: "/clientes", icon: Building2 },
  { label: "Configurações", href: "/configuracoes", icon: Cog },
] as const;

export const systemStatusLabel = {
  development: "Em desenvolvimento",
  published: "Publicado",
  commercialized: "Comercializado",
  archived: "Arquivado",
} as const;
