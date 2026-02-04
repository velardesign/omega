import {authClient} from "@/lib/auth-client";
import React from "react";

export interface UsuarioLogado {
    nome: string;
    email: string;
}

export function useUsuarioLogado():UsuarioLogado | null {
    const [usuarioLogado, setUsuarioLogado] = React.useState<UsuarioLogado | null>(null);
    React.useEffect(() => {
        const carregarUsuario = async () => {
            try {
                const session = await authClient.getSession();
                setUsuarioLogado({
                    nome: session?.data?.user?.name || "",
                    email: session?.data?.user?.email || "",
                });
            } catch (error) {
                console.error("Erro ao Carregar dados do usuário:", error)
                setUsuarioLogado(null);
            }
        };
        void carregarUsuario();
    }, []);
    return usuarioLogado;
};