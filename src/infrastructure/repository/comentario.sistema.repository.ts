import { ComentarioSistema } from "../entity/ComentarioSistema";


export class ComentarioSistemaRepository {

    constructor() {
    }

    async crearComentarioSistema(myDataSource: any, comentarioSistema: ComentarioSistema): Promise<ComentarioSistema> {
        const comentario = await myDataSource.getRepository(ComentarioSistema).create(comentarioSistema)
        const results = await myDataSource.getRepository(ComentarioSistema).save(comentario)
        return results;
    }

    async obtenerComentariosSistema(myDataSource: any): Promise<ComentarioSistema[]> {
        const comentarios = await myDataSource.getRepository(ComentarioSistema).find()
        return comentarios;
    }

    async obtenerComentarioSistemaPorId(myDataSource: any, id: number): Promise<ComentarioSistema | undefined> {
        const results = await myDataSource.getRepository(ComentarioSistema).findOneBy({
            id: id,
        })
        return results;
    }

    async modificarComentarioSistema(myDataSource: any, id: number, comentarioSistema: ComentarioSistema): Promise<ComentarioSistema | undefined> {
        const comentarioExistente = await myDataSource.findOne(ComentarioSistema, id);
        if (comentarioExistente) {
            const comentarioModificado = Object.assign(comentarioExistente, comentarioSistema);
            return await myDataSource.getRepository(ComentarioSistema).save(comentarioModificado);
        }
        return undefined;
    }

    async eliminarComentarioSistema(myDataSource: any, id: number): Promise<boolean> {
        const results = await myDataSource.getRepository(ComentarioSistema).delete(id);
        return results.affected !== 0;
    }
}
