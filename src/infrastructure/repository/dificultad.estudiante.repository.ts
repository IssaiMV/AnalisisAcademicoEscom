import { DificultadEstudiantes } from "../entity/DificultadEstudiantes"


export class DificultadEstudianteRepository {

    constructor() {
    }

    async crearDificultadEstudiante(myDataSource: any, dificultadEstudiante: DificultadEstudiantes): Promise<DificultadEstudiantes> {
        const newDificultadEstudiante = await myDataSource.getRepository(DificultadEstudiantes).create(dificultadEstudiante)
        const result = await myDataSource.getRepository(DificultadEstudiantes).save(newDificultadEstudiante)
        return result
    }

    async obtenerDificultadesEstudiantes(myDataSource: any): Promise<DificultadEstudiantes[]> {
        const dificultadesEstudiantes = await myDataSource.getRepository(DificultadEstudiantes).find()
        return dificultadesEstudiantes
    }

    async obtenerDificultadEstudiantePorId(myDataSource: any, id: number): Promise<DificultadEstudiantes | undefined> {
        const result = await myDataSource.getRepository(DificultadEstudiantes).findOne(id)
        return result
    }

    async modificarDificultadEstudiante(myDataSource: any, id: number, dificultadEstudiante: DificultadEstudiantes): Promise<DificultadEstudiantes | undefined> {
        const dificultadEstudianteExistente = await myDataSource.getRepository(DificultadEstudiantes).findOne(id)
        if (dificultadEstudianteExistente) {
            const dificultadEstudianteModificado = Object.assign(dificultadEstudianteExistente, dificultadEstudiante)
            return await myDataSource.getRepository(DificultadEstudiantes).save(dificultadEstudianteModificado)
        }
        return undefined
    }

    async eliminarDificultadEstudiante(myDataSource: any, id: number): Promise<boolean> {
        const result = await myDataSource.getRepository(DificultadEstudiantes).delete({
            encuestaId: id
        })
        return result.affected !== 0
    }
}
