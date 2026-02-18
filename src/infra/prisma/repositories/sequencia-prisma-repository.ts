import {SequenciaRepository} from "@/src/repository/interfaces/sequencia-repository";
import {prisma} from "@/lib/prisma";

export class SequenciaPrismaRepository implements SequenciaRepository {

    async geraCodigo(nome: string): Promise<string> {
        const nomeMaiusculo = nome.toUpperCase();
        const sequencia = await this.atualizaSequencia(nome);
        return `${nomeMaiusculo.slice(0, 4)}-${new Date().getFullYear()}-${sequencia}`;
    }

    private async atualizaSequencia(nome: string): Promise<string> {
        const nomeMaiusculo = nome.toUpperCase();
        const sequencia = await prisma.$transaction(async (tx) => {
            await tx.sequencia.upsert({
                where: {
                    nome:nomeMaiusculo
                },
                update: {},
                create: {
                    nome:nomeMaiusculo,
                    proximo: 0,
                }
            })

            return await tx.sequencia.update({
                where: {nome: nomeMaiusculo},
                data: {
                    proximo: {
                        increment: 1
                    },
                }
            })
        });
        return sequencia.proximo.toString().padStart(4, '0');
    }

}