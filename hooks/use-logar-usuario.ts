import {useState} from "react";
import {authClient} from "@/lib/auth-client";

export function useLogarUsuario() {
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState<string | null>(null);

    const logar = async (email: string, password: string) => {
        setLoading(true);
        try {
            const resultado = await authClient.signIn.email({email, password});
            setLoading(false);
            return resultado;
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErro(error.message);
            } else {
                setErro("Erro ao fazer login");
            }
            setLoading(false);
            return null;
        }
    }
    return {logar, loading, erro};
}
