import {CategoriaRepository} from "@/src/repository/interfaces/categoria-repository";
import {Categoria} from "@/generated/prisma/client";
import { CategoriaDTO } from "@/src/domain/types/categoria-types";
import {prisma} from "@/lib/prisma";


export class CategoriaPrismaRepository implements CategoriaRepository {

    async addCategoria(categoria: CategoriaDTO){
       return prisma.categoria.create({
            data:{
                nome:categoria.nome,
                codigo: categoria.codigo
            }
        })
    }

    async getCategorias(): Promise<Categoria[]> {
        const categorias = await prisma.categoria.findMany({
            orderBy:{
                nome:'asc',
            }
        })
        return categorias || [];
    }

}