import { createClient } from "@supabase/supabase-js";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secret = process.env.SUPABASE_SECRET_KEY;
if (!url || !secret) throw new Error("Defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SECRET_KEY somente nesta sessão.");

const email = "Vitorproque02@gmail.com";
const rl = createInterface({ input, output });
const password = await rl.question("Senha inicial do administrador: ", { hideEchoBack: true });
rl.close();
if (password.length < 8) throw new Error("A senha deve ter ao menos 8 caracteres.");

const supabase = createClient(url, secret, { auth: { autoRefreshToken: false, persistSession: false } });
const { data: listed, error: listError } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
if (listError) throw listError;
let user = listed.users.find((candidate) => candidate.email?.toLowerCase() === email.toLowerCase());

if (!user) {
  const { data, error } = await supabase.auth.admin.createUser({ email, password, email_confirm: true });
  if (error) throw error;
  user = data.user;
}

const { error: memberError } = await supabase.from("internal_members").upsert({
  user_id: user.id,
  name: "Vitor",
  email,
  role: "admin",
  status: "active",
}, { onConflict: "user_id" });
if (memberError) throw memberError;
output.write("Administrador vinculado com sucesso. A senha não foi armazenada.\n");
