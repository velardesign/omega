export function getCaixaDia():ValoresCaixa{
    return {
        total: 1000.0,
        totalEntradas: 500.0,
        totalSaidas: 600.0
    }
}

export function getValoresTodosCaixa():number{
    return 100000.00;
}

export function adicionaEntrada(entrada:Entrada){

}

export function abrirCaixa(){
    console.log("Caixa Aberto");
}

export function fecharCaixa(){
    console.log("Caixa Fechado!");
}
