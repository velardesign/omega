interface ValoresCaixa{
    total:number,
    totalEntradas:number,
    totalSaidas:number,
}

type TipoEntrada = {
    valor: "Dinheiro" | "Pix" | "Cartão" | "Transferência"
}

interface Entrada {
    id: string,
    tipo: TipoEntrada,
    responsavel: string,
    valor: number;
}