import { Carrera } from "../entity/Carrera"

export class CarreraRepository {

    constructor() {
    }

    async crearCarrera(myDataSource: any, carrera: Carrera): Promise<Carrera> {
        const carreraCreada = await myDataSource.getRepository(Carrera).create(carrera)
        const resultados = await myDataSource.getRepository(Carrera).save(carreraCreada)
        return resultados
    }

    async obtenerCarreras(myDataSource: any): Promise<Carrera[]> {
        const carreras = await myDataSource.getRepository(Carrera).find()
        return carreras
    }

    async obtenerCarreraPorId(myDataSource: any, id: number): Promise<Carrera | undefined> {
        const resultados = await myDataSource.getRepository(Carrera).findOneBy({
            id: id,
        })
        return resultados
    }

    async modificarCarrera(myDataSource: any, id: number, carrera: Carrera): Promise<Carrera | undefined> {
        const carreraExistente = await myDataSource.findOne(Carrera, id)
        if (carreraExistente) {
            const carreraModificada = Object.assign(carreraExistente, carrera)
            return await myDataSource.getRepository(Carrera).save(carreraModificada)
        }
        return undefined
    }

    async eliminarCarrera(myDataSource: any, id: number): Promise<boolean> {
        const resultados = await myDataSource.getRepository(Carrera).delete(id)
        return resultados.affected !== 0
    }
}