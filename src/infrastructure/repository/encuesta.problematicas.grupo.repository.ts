import { EncuestaProblematicasGrupo } from "../entity/EncuestaProblematicasGrupo"


export class EncuestaProblematicasGrupoRepository {

    constructor() {
    }

    async crearEncuestaProblematicasGrupo(myDataSource: any, encuestaProblematicasGrupo: EncuestaProblematicasGrupo): Promise<EncuestaProblematicasGrupo> {
        const encuesta = await myDataSource.getRepository(EncuestaProblematicasGrupo).create(encuestaProblematicasGrupo)
        const results = await myDataSource.getRepository(EncuestaProblematicasGrupo).save(encuesta)
        return results
    }

    async obtenerEncuestasProblematicasGrupo(myDataSource: any): Promise<EncuestaProblematicasGrupo[]> {
        const encuestas = await myDataSource.getRepository(EncuestaProblematicasGrupo).find()
        return encuestas
    }

    async obtenerEncuestaProblematicaGrupoPorId(myDataSource: any, id: number): Promise<EncuestaProblematicasGrupo | undefined> {
        const results = await myDataSource.getRepository(EncuestaProblematicasGrupo).findOne(id)
        return results
    }

    async modificarEncuestaProblematicaGrupo(myDataSource: any, id: number, encuestaProblematicasGrupo: EncuestaProblematicasGrupo): Promise<EncuestaProblematicasGrupo | undefined> {
        const encuestaExistente = await myDataSource.findOne(EncuestaProblematicasGrupo, id)
        if (encuestaExistente) {
            const encuestaModificada = Object.assign(encuestaExistente, encuestaProblematicasGrupo)
            return await myDataSource.getRepository(EncuestaProblematicasGrupo).save(encuestaModificada)
        }
        return undefined
    }

    async eliminarEncuestaProblematicaGrupo(myDataSource: any, id: number): Promise<boolean> {
        const results = await myDataSource.getRepository(EncuestaProblematicasGrupo).delete({
            encuestaId: id
        })
        return results.affected !== 0
    }
}
