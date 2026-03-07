"use client"
import AdicionaProduto, {PropsProduto} from "@/components/produto/adiciona-produto";
import {listarTodasCategorias} from "@/actions/categoria-action";
import {listarTodosFornecedores} from "@/actions/fornecedor-action";
import {listarTodosProdutos} from "@/actions/produto-action";
import EditaProduto from "@/components/produto/editar-produto";
import {ProdutoDTO} from "@/src/domain/types/produto-types";
import {useEffect, useState} from "react";

export default function Page() {
    const [categorias, setCategorias] = useState<PropsProduto["categorias"]>([]);
    const [fornecedores, setFornecedores] = useState<PropsProduto["fornecedores"]>([]);
    const [produtos, setProdutos] = useState<ProdutoDTO[]>([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState<ProdutoDTO | null>(null);

    useEffect(() => {
        async function carregar() {
            const categorias = await listarTodasCategorias();
            const fornecedores = await listarTodosFornecedores();
            const produtos = await listarTodosProdutos();

            setCategorias(categorias);
            setFornecedores(fornecedores);
            setProdutos(produtos);
        }

        carregar();
    }, []);

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <AdicionaProduto categorias={categorias} fornecedores={fornecedores} produtoSelecionado={produtoSelecionado}/>
            <EditaProduto produtos={produtos} onEditar={setProdutoSelecionado}/>
        </div>
    );
}