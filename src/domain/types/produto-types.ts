export interface ProdutoDTO {
    codigo_categoria: string,
    codigo_fornecedor: string,
    codigo: string,
    codigo_fabricante:string,
    nome:string,
    preco_compra: number,
    cor:string,
    unidade_medida:string,
    material:string,
    descricao:string,

}

interface PropsCategoria {
    nome: string;
    codigo: string;
}

interface PropsFornecedor {
    razao_social: string;
    codigo: string | null;
}

export interface PropsProduto {
    categorias: PropsCategoria[],
    fornecedores: PropsFornecedor[],
    produtoSelecionado?: ProdutoDTO | null
    onSalvar:() => Promise<void>,
}