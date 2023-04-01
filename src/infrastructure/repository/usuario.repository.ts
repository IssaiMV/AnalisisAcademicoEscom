import { Usuario } from "../entity/Usuario";

export class UsuarioRepository {

    constructor() {
    }

    async crearUsuario(myDataSource: any, usuario: Usuario): Promise<Usuario> {
        const user = await myDataSource.getRepository(Usuario).create(usuario)
        const results = await myDataSource.getRepository(Usuario).save(user)
        return results;
    }

    async obtenerUsuarios(myDataSource: any): Promise<Usuario[]> {
        const users = await myDataSource.getRepository(Usuario).find()
        return users;
    }

    async obtenerUsuarioPorId(myDataSource: any, id: number): Promise<Usuario | undefined> {
        const results = await myDataSource.getRepository(Usuario).findOneBy({
            id: id,
        })
        return results;
    }

    async obtenerUsuariosPorIdCoordinador(myDataSource: any, id: number): Promise<Usuario | undefined> {
        const results = await myDataSource.getRepository(Usuario).findOneBy({
            coordinadorId: id,
        })
        return results;
    }

    async modificarUsuario(myDataSource: any, id: number, usuario: Usuario): Promise<Usuario | undefined> {
        const usuarioExistente = await myDataSource.getRepository(Usuario).findOneBy({
            id: id,
        })
        if (usuarioExistente) {
            const usuarioModificado = Object.assign(usuarioExistente, usuario);
            return await myDataSource.getRepository(Usuario).save(usuarioModificado);
        }
        return undefined;
    }

    async eliminarUsuario(myDataSource: any, id: number): Promise<boolean> {
        const results = await myDataSource.getRepository(Usuario).delete(id);
        return results.affected !== 0;
    }
}