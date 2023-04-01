import { Encuesta } from '../entity/Encuesta';

export class EncuestaRepository {

    constructor() {
    }

    async crearEncuesta(myDataSource: any, encuesta: Encuesta): Promise<Encuesta> {
        const results = await myDataSource.getRepository(Encuesta).save(encuesta)
        return results;
    }

    async obtenerEncuestas(myDataSource: any): Promise<Encuesta[]> {
        const encuestas = await myDataSource.getRepository(Encuesta).find()
        return encuestas;
    }

    async obtenerEncuestaPorId(myDataSource: any, id: number): Promise<Encuesta | undefined> {
        const results = await myDataSource.getRepository(Encuesta).findOne(id);
        return results;
    }

    async modificarEncuesta(myDataSource: any, id: number, encuesta: Encuesta): Promise<Encuesta | undefined> {
        const encuestaExistente = await myDataSource.findOne(Encuesta, id);
        if (encuestaExistente) {
            const encuestaModificada = Object.assign(encuestaExistente, encuesta);
            return await myDataSource.getRepository(Encuesta).save(encuestaModificada);
        }
        return undefined;
    }

    async eliminarEncuesta(myDataSource: any, id: number): Promise<boolean> {
        const results = await myDataSource.getRepository(Encuesta).delete(id);
        return results.affected !== 0;
    }
}
