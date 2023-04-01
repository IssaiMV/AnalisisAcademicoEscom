import { Asistencia } from "../entity/Asistencia";

export class AsistenciaRepository {

    constructor() {
    }

    async crearAsistencia(myDataSource: any, asistencia: Asistencia): Promise<Asistencia> {
        const asistenciaNueva = await myDataSource.getRepository(Asistencia).create(asistencia);
        const resultado = await myDataSource.getRepository(Asistencia).save(asistenciaNueva);
        return resultado;
    }

    async obtenerAsistencias(myDataSource: any): Promise<Asistencia[]> {
        const asistencias = await myDataSource.getRepository(Asistencia).find();
        return asistencias;
    }

    async obtenerAsistenciaPorId(myDataSource: any, id: number): Promise<Asistencia | undefined> {
        const asistencia = await myDataSource.getRepository(Asistencia).findOne(id);
        return asistencia;
    }

    async modificarAsistencia(myDataSource: any, id: number, asistencia: Asistencia): Promise<Asistencia | undefined> {
        const asistenciaExistente = await myDataSource.getRepository(Asistencia).findOne(id);
        if (asistenciaExistente) {
            const asistenciaModificada = Object.assign(asistenciaExistente, asistencia);
            const resultado = await myDataSource.getRepository(Asistencia).save(asistenciaModificada);
            return resultado;
        }
        return undefined;
    }

    async eliminarAsistencia(myDataSource: any, id: number): Promise<boolean> {
        const resultado = await myDataSource.getRepository(Asistencia).delete(id);
        return resultado.affected !== 0;
    }
}