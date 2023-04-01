import { ComentarioDocumento } from "../entity/ComentarioDocumento";

export class ComentarioDocumentoRepository {

    constructor() {
    }

    async crearComentarioDocumento(myDataSource: any, comentarioDocumento: ComentarioDocumento): Promise<ComentarioDocumento> {
        const comentarioCreado = await myDataSource.getRepository(ComentarioDocumento).create(comentarioDocumento)
        const resultados = await myDataSource.getRepository(ComentarioDocumento).save(comentarioCreado)
        return resultados;
    }

    async obtenerComentariosDocumento(myDataSource: any): Promise<ComentarioDocumento[]> {
        const comentarios = await myDataSource.getRepository(ComentarioDocumento).find()
        return comentarios;
    }

    async obtenerComentarioDocumentoPorId(myDataSource: any, id: number): Promise<ComentarioDocumento | undefined> {
        const resultados = await myDataSource.getRepository(ComentarioDocumento).findOneBy({
            id: id,
        })
        return resultados;
    }

    async modificarComentarioDocumento(myDataSource: any, id: number, comentarioDocumento: ComentarioDocumento): Promise<ComentarioDocumento | undefined> {
        const comentarioExistente = await myDataSource.findOne(ComentarioDocumento, id);
        if (comentarioExistente) {
            const comentarioModificado = Object.assign(comentarioExistente, comentarioDocumento);
            return await myDataSource.getRepository(ComentarioDocumento).save(comentarioModificado);
        }
        return undefined;
    }

    async eliminarComentarioDocumento(myDataSource: any, id: number): Promise<boolean> {
        const resultados = await myDataSource.getRepository(ComentarioDocumento).delete(id);
        return resultados.affected !== 0;
    }
}