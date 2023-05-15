import { Reunion } from "../entity/Reunion";

export class ReunionRepository {

    constructor() {
    }

    async crearReunion(myDataSource: any, reunion: Reunion): Promise<Reunion> {
        const entity = await myDataSource.getRepository(Reunion).create(reunion)
        const results = await myDataSource.getRepository(Reunion).save(entity)
        return results;
    }

    async obtenerReuniones(myDataSource: any): Promise<Reunion[]> {
        const entities = await myDataSource.getRepository(Reunion).find({
            relations: ['coordinador'],
        })
        return entities;
    }

    async obtenerReunionPorId(myDataSource: any, id: number): Promise<Reunion | undefined> {
        const results = await myDataSource.getRepository(Reunion).findOneBy({
            id: id,
        })
        return results;
    }

    async modificarReunion(myDataSource: any, id: number, reunion: Reunion): Promise<Reunion | undefined> {
        const entityExistente = await myDataSource.getRepository(Reunion).findOneBy({
            id: id,
        });
        if (entityExistente) {
            const entityModificado = Object.assign(entityExistente, reunion);
            return await myDataSource.getRepository(Reunion).save(entityModificado);
        }
        return undefined;
    }

    async eliminarReunion(myDataSource: any, id: number): Promise<boolean> {
        const results = await myDataSource.getRepository(Reunion).delete(id);
        return results.affected !== 0;
    }
}
