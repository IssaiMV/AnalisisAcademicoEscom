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
        const asistencia = await myDataSource.getRepository(Asistencia).findOneBy({
            id: id,
        });
        return asistencia;
    }
    async obtenerAsistenciasPorReunionId(myDataSource: any, id: number): Promise<Asistencia[] | undefined> {
        const asistencia = await myDataSource.getRepository(Asistencia).findBy({
            reunionId: id,
        });
        return asistencia;
    }

    async modificarAsistencia(myDataSource: any, id: number, asistencia: Asistencia): Promise<Asistencia | undefined> {
        const entityExistente = await myDataSource.getRepository(Asistencia).findOneBy({
            id: id,
        });
        if (entityExistente) {
            const asistenciaModificada = Object.assign(entityExistente, asistencia);
            const resultado = await myDataSource.getRepository(Asistencia).save(asistenciaModificada);
            return resultado;
        }
        return undefined;
    }

    async eliminarAsistencia(myDataSource: any, id: number): Promise<boolean> {
        const resultado = await myDataSource.getRepository(Asistencia).delete(id);
        return resultado.affected !== 0;
    }

    async eliminarAsistenciaReunionId(myDataSource: any, id: number): Promise<boolean> {
        const resultado = await myDataSource.getRepository(Asistencia).delete({ reunionId: id });
        return resultado.affected !== 0;
    }
}