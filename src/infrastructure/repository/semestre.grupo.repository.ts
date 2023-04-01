import { SemestreGrupo } from "../entity/SemestreGrupo";

export class SemestreGrupoRepository {

    constructor() {
    }

    async crearSemestreGrupo(myDataSource: any, semestreGrupo: SemestreGrupo): Promise<SemestreGrupo> {
        const entity = await myDataSource.getRepository(SemestreGrupo).create(semestreGrupo)
        const results = await myDataSource.getRepository(SemestreGrupo).save(entity)
        return results;
    }

    async obtenerSemestresGrupos(myDataSource: any): Promise<SemestreGrupo[]> {
        const entities = await myDataSource.getRepository(SemestreGrupo).find()
        return entities;
    }

    async obtenerSemestreGrupoPorId(myDataSource: any, id: number): Promise<SemestreGrupo | undefined> {
        const results = await myDataSource.getRepository(SemestreGrupo).findOneBy({
            id: id,
        })
        return results;
    }

    async modificarSemestreGrupo(myDataSource: any, id: number, semestreGrupo: SemestreGrupo): Promise<SemestreGrupo | undefined> {
        const entityExistente = await myDataSource.findOne(SemestreGrupo, id);
        if (entityExistente) {
            const entityModificado = Object.assign(entityExistente, semestreGrupo);
            return await myDataSource.getRepository(SemestreGrupo).save(entityModificado);
        }
        return undefined;
    }

    async eliminarSemestreGrupo(myDataSource: any, id: number): Promise<boolean> {
        const results = await myDataSource.getRepository(SemestreGrupo).delete(id);
        return results.affected !== 0;
    }
}
