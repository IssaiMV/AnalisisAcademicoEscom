import { UsuarioCarrera } from "../entity/UsuarioCarrera"


export class UsuarioCarreraRepository {

    constructor() {
    }

    async crearUsuarioCarrera(myDataSource: any, usuarioCarrera: UsuarioCarrera): Promise<UsuarioCarrera> {
        const userCarrera = await myDataSource.getRepository(UsuarioCarrera).create(usuarioCarrera)
        const results = await myDataSource.getRepository(UsuarioCarrera).save(userCarrera)
        return results
    }

    async obtenerUsuariosCarrera(myDataSource: any): Promise<UsuarioCarrera[]> {
        const usersCarrera = await myDataSource.getRepository(UsuarioCarrera).find()
        return usersCarrera
    }

    async obtenerUsuarioCarreraPorId(myDataSource: any, id: number): Promise<UsuarioCarrera | undefined> {
        const results = await myDataSource.getRepository(UsuarioCarrera).findOneBy({
            id: id,
        })
        return results
    }

    async modificarUsuarioCarrera(myDataSource: any, id: number, usuarioCarrera: UsuarioCarrera): Promise<UsuarioCarrera | undefined> {
        const usuarioCarreraExistente = await myDataSource.findOne(UsuarioCarrera, id)
        if (usuarioCarreraExistente) {
            const usuarioCarreraModificado = Object.assign(usuarioCarreraExistente, usuarioCarrera)
            return await myDataSource.getRepository(UsuarioCarrera).save(usuarioCarreraModificado)
        }
        return undefined
    }

    async eliminarUsuarioCarrera(myDataSource: any, id: number): Promise<boolean> {
        const results = await myDataSource.getRepository(UsuarioCarrera).delete(id)
        return results.affected !== 0
    }
}
