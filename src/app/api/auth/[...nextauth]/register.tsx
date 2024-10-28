// src/pages/auth/register.tsx

import { useState } from "react";
import { trpc } from "/home/dorramires/Development/painel_links/src/server/api/trpc";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const registerMutation = trpc.auth.register.useMutation();
  const [form, setForm] = useState({ email: "", password: "", name: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerMutation.mutateAsync(form);
      router.push("/auth/signin");
    } catch (error) {
      console.error("Erro no registro:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Senha"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Registrar</button>
    </form>
  );
}
