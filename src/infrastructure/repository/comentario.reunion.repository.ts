import { ComentarioReunion } from "../entity/ComentarioReunion";


export class ComentarioReunionRepository {

    constructor() {
    }

    async crearComentarioReunion(myDataSource: any, comentarioReunion: ComentarioReunion): Promise<ComentarioReunion> {
        const comentario = await myDataSource.getRepository(ComentarioReunion).create(comentarioReunion)
        const results = await myDataSource.getRepository(ComentarioReunion).save(comentario)
        return results;
    }

    async obtenerComentariosReunion(myDataSource: any): Promise<ComentarioReunion[]> {
        const comentarios = await myDataSource.getRepository(ComentarioReunion).find()
        return comentarios;
    }

    async obtenerComentarioReunionPorId(myDataSource: any, id: number): Promise<ComentarioReunion | undefined> {
        const results = await myDataSource.getRepository(ComentarioReunion).findOneBy({
            id: id,
        })
        return results;
    }

    async modificarComentarioReunion(myDataSource: any, id: number, comentarioReunion: ComentarioReunion): Promise<ComentarioReunion | undefined> {
        const comentarioExistente = await myDataSource.findOne(ComentarioReunion, id);
        if (comentarioExistente) {
            const comentarioModificado = Object.assign(comentarioExistente, comentarioReunion);
            return await myDataSource.getRepository(ComentarioReunion).save(comentarioModificado);
        }
        return undefined;
    }

    async eliminarComentarioReunion(myDataSource: any, id: number): Promise<boolean> {
        const results = await myDataSource.getRepository(ComentarioReunion).delete(id);
        return results.affected !== 0;
    }
}
