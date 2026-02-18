export interface SequenciaRepository {
    geraCodigo(nome:string): Promise<string>;
}