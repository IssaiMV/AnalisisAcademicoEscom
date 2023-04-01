import { EncuestaDificultadEstudiantes } from "../entity/EncuestaDificultadEstudiantes";


export class EncuestaDificultadEstudiantesRepository {

    constructor() { }

    async crearEncuestaDificultadEstudiantes(myDataSource: any, encuestaDificultadEstudiantes: EncuestaDificultadEstudiantes): Promise<EncuestaDificultadEstudiantes> {
        const encuesta = await myDataSource.getRepository(EncuestaDificultadEstudiantes).create(encuestaDificultadEstudiantes);
        const results = await myDataSource.getRepository(EncuestaDificultadEstudiantes).save(encuesta);
        return results;
    }

    async obtenerEncuestasDificultadEstudiantes(myDataSource: any): Promise<EncuestaDificultadEstudiantes[]> {
        const encuestas = await myDataSource.getRepository(EncuestaDificultadEstudiantes).find();
        return encuestas;
    }

    async obtenerEncuestaDificultadEstudiantesPorId(myDataSource: any, id: number): Promise<EncuestaDificultadEstudiantes | undefined> {
        const results = await myDataSource.getRepository(EncuestaDificultadEstudiantes).findOneBy({
            id: id,
        });
        return results;
    }

    async modificarEncuestaDificultadEstudiantes(myDataSource: any, id: number, encuestaDificultadEstudiantes: EncuestaDificultadEstudiantes): Promise<EncuestaDificultadEstudiantes | undefined> {
        const encuestaExistente = await myDataSource.getRepository(EncuestaDificultadEstudiantes).findOne({
            where: { id }
        });
        if (encuestaExistente) {
            const encuestaModificada = Object.assign(encuestaExistente, encuestaDificultadEstudiantes);
            return await myDataSource.getRepository(EncuestaDificultadEstudiantes).save(encuestaModificada);
        }
        return undefined;
    }

    async eliminarEncuestaDificultadEstudiantes(myDataSource: any, id: number): Promise<boolean> {
        const results = await myDataSource.getRepository(EncuestaDificultadEstudiantes).delete(id);
        return results.affected !== 0;
    }

}
