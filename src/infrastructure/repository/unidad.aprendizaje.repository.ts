import { UnidadDeAprendizaje } from "../entity/UnidadDeAprendizaje";

export class UnidadDeAprendizajeRepository {

    constructor() {
    }

    async crearUnidadDeAprendizaje(myDataSource: any, unidadDeAprendizaje: UnidadDeAprendizaje): Promise<UnidadDeAprendizaje> {
        const newUnidadDeAprendizaje = await myDataSource.getRepository(UnidadDeAprendizaje).create(unidadDeAprendizaje)
        const results = await myDataSource.getRepository(UnidadDeAprendizaje).save(newUnidadDeAprendizaje)
        return results;
    }

    async obtenerUnidadesDeAprendizaje(myDataSource: any): Promise<UnidadDeAprendizaje[]> {
        const unidadesDeAprendizaje = await myDataSource.getRepository(UnidadDeAprendizaje).find()
        return unidadesDeAprendizaje;
    }

    async obtenerUnidadDeAprendizajePorId(myDataSource: any, id: number): Promise<UnidadDeAprendizaje | undefined> {
        const unidadDeAprendizaje = await myDataSource.getRepository(UnidadDeAprendizaje).findOne(id)
        return unidadDeAprendizaje;
    }

    async modificarUnidadDeAprendizaje(myDataSource: any, id: number, unidadDeAprendizaje: UnidadDeAprendizaje): Promise<UnidadDeAprendizaje | undefined> {
        const unidadDeAprendizajeExistente = await myDataSource.getRepository(UnidadDeAprendizaje).findOne(id);
        if (unidadDeAprendizajeExistente) {
            const unidadDeAprendizajeModificada = Object.assign(unidadDeAprendizajeExistente, unidadDeAprendizaje);
            return await myDataSource.getRepository(UnidadDeAprendizaje).save(unidadDeAprendizajeModificada);
        }
        return undefined;
    }

    async eliminarUnidadDeAprendizaje(myDataSource: any, id: number): Promise<boolean> {
        const results = await myDataSource.getRepository(UnidadDeAprendizaje).delete(id);
        return results.affected !== 0;
    }
}
