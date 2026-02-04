import {useState} from "react";
import {autenticarEAbrirCaixa} from "@/src/application/services/cash-flow.services";

export function useCashFlowOpen(){
    const [loading, setLoading] = useState(false);
    const [sucesso, setSucesso] = useState(false);
    const [erro, setErro] = useState(false);

    const executar = async (email:string, password:string, nome:string ) => {
        try {
            setLoading(true);
            setErro(false);

            await autenticarEAbrirCaixa(email, password, nome);

            setSucesso(true);
        } catch {
            setErro(true);
        } finally {
            setLoading(false);
        }
    };
    return {
        executar,
        loading,
        sucesso,
        erro,
        reset:()=>{
            setSucesso(false);
            setErro(false);
            setLoading(false);
        }
    };
}