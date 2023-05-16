import { ProblematicasGrupo } from "../entity/ProblematicasGrupo"


export class ProblematicasGrupoRepository {

    constructor() {
    }

    async crearProblematicasGrupo(myDataSource: any, problematicasGrupo: ProblematicasGrupo): Promise<ProblematicasGrupo> {
        const problematicasGrupoNueva = await myDataSource.getRepository(ProblematicasGrupo).create(problematicasGrupo)
        const results = await myDataSource.getRepository(ProblematicasGrupo).save(problematicasGrupoNueva)
        return results
    }

    async obtenerProblematicasGrupo(myDataSource: any): Promise<ProblematicasGrupo[]> {
        const problematicasGrupo = await myDataSource.getRepository(ProblematicasGrupo).find()
        return problematicasGrupo
    }

    async obtenerProblematicasGrupoPorId(myDataSource: any, id: number): Promise<ProblematicasGrupo | undefined> {
        const results = await myDataSource.getRepository(ProblematicasGrupo).findOneBy({
            id: id,
        })
        return results
    }

    async modificarProblematicasGrupo(myDataSource: any, id: number, problematicasGrupo: ProblematicasGrupo): Promise<ProblematicasGrupo | undefined> {
        const problematicasGrupoExistente = await myDataSource.findOne(ProblematicasGrupo, id)
        if (problematicasGrupoExistente) {
            const problematicasGrupoModificado = Object.assign(problematicasGrupoExistente, problematicasGrupo)
            return await myDataSource.getRepository(ProblematicasGrupo).save(problematicasGrupoModificado)
        }
        return undefined
    }

    async eliminarProblematicasGrupo(myDataSource: any, id: number): Promise<boolean> {
        const results = await myDataSource.getRepository(ProblematicasGrupo).delete(id)
        return results.affected !== 0
    }
}
