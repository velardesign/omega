import {authClient} from "@/lib/auth-client";
import {abrirCaixaAction, fecharCaixaAction} from "@/actions/caixa-action";

export async function autenticarEAbrirCaixa(
    email: string,
    password: string,
    nome: string
) {
    await logar(email, password);
    await abrirCaixaAction({valor: email, responsavel: nome});
}

export async function autenticarEFecharCaixa(
    email: string,
    password: string,
    nome: string
) {

    await logar(email, password);
    await fecharCaixaAction({valor:email,responsavel:nome});
}

async function logar(email: string, password: string) {
    const resposta = await authClient.signIn.email({email, password});
    if (resposta.error){
        throw new Error(resposta.error.message);
    }
    return resposta;
}