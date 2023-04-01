import { Grupo } from "../entity/Grupo";

export class GrupoRepository {

    constructor() {
    }

    async crearGrupo(myDataSource: any, grupo: Grupo): Promise<Grupo> {
        const grupoNuevo = await myDataSource.getRepository(Grupo).create(grupo)
        const results = await myDataSource.getRepository(Grupo).save(grupoNuevo)
        return results;
    }

    async obtenerGrupos(myDataSource: any): Promise<Grupo[]> {
        const grupos = await myDataSource.getRepository(Grupo).find()
        return grupos;
    }

    async obtenerGrupoPorId(myDataSource: any, id: number): Promise<Grupo | undefined> {
        const results = await myDataSource.getRepository(Grupo).findOneBy({
            id: id,
        })
        return results;
    }

    async modificarGrupo(myDataSource: any, id: number, grupo: Grupo): Promise<Grupo | undefined> {
        const grupoExistente = await myDataSource.findOne(Grupo, id);
        if (grupoExistente) {
            const grupoModificado = Object.assign(grupoExistente, grupo);
            return await myDataSource.getRepository(Grupo).save(grupoModificado);
        }
        return undefined;
    }

    async eliminarGrupo(myDataSource: any, id: number): Promise<boolean> {
        const results = await myDataSource.getRepository(Grupo).delete(id);
        return results.affected !== 0;
    }
}
