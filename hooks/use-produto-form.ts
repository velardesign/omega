import {useRouter} from "next/navigation";

import {saveProduto} from "@/actions/produto-action";
import {produtoCriarSchema, ProdutoInput, ProdutoOutput} from "@/schemas/produto-criar-schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useEffect, useRef, useState} from "react";
import {ProdutoDTO, PropsProduto} from "@/src/domain/types/produto-types";
import {toast} from "sonner";
import {produtoFormDefaults} from "@/constants/produto-form-defaults";

export function useProdutoForm({categorias, fornecedores, produtoSelecionado, onSalvar}: PropsProduto) {

    const categoriaRef = useRef<HTMLParagraphElement>(null);
    const router = useRouter();
    const errorRef = useRef<HTMLParagraphElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [produtoAtual, setProdutoAtual] = useState<ProdutoDTO | null>(produtoSelecionado || null);
    const {
        register,
        handleSubmit,
        setValue,
        setError,
        reset,
        watch,
        control,
        formState: {errors},
    } = useForm<ProdutoInput, any, ProdutoOutput>({
        resolver: zodResolver(produtoCriarSchema),
        defaultValues: produtoSelecionado
            ? {...produtoSelecionado, preco_compra: Number(produtoSelecionado.preco_compra)}
            : produtoFormDefaults,
    });

    const codigoCategoria = watch("codigo_categoria");
    const codigoFornecedor = watch("codigo_fornecedor");

    useEffect(() => {
        if (errors.root) {
            errorRef.current?.scrollIntoView({behavior: "smooth", block: "center"})
        }
    }, [errors.root]);


    async function onSubmit(produto: ProdutoOutput) {
        if (isSubmitting) return;
        setIsSubmitting(true);

        const result = await saveProduto(produto);

        if (result.success) {
            toast.success(
                result.action === "create" ? "Produto Cadastrado Com Sucesso!" : "Produto Atualizado Com Sucesso!"
            );
            setProdutoAtual(null);
            reset(produtoFormDefaults);
            await onSalvar();
            setIsSubmitting(false);
            return;
        }
        setError("root", {message: result.error});
        setIsSubmitting(false);
    }

    return {
        register,
        handleSubmit,
        errors,
        errorRef,
        codigoCategoria,
        codigoFornecedor,
        isSubmitting,
        produtoAtual,
        onSubmit,
        onNovaCategoria: () => router.push("/dashboard/categoria/adicionar"),
        onNovoFornecedor: () => router.push("/dashboard/fornecedores/cadastrar-fornecedor"),
        onCategoriaChange: (value: string) => setValue("codigo_categoria", value, {shouldValidate: false}),
        onFornecedorChange: (value: string) => setValue("codigo_fornecedor", value, {shouldValidate: false}),
        categoriaRef,
        control,
        reset,
        setProdutoAtual,
    }
}

