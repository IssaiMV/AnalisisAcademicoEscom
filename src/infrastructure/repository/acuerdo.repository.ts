import { Acuerdo } from "../entity/Acuerdo";

export class AcuerdoRepository {

    constructor() {
    }

    async crearAcuerdo(myDataSource: any, acuerdo: Acuerdo): Promise<Acuerdo> {
        const acuerdoNuevo = await myDataSource.getRepository(Acuerdo).create(acuerdo);
        const resultado = await myDataSource.getRepository(Acuerdo).save(acuerdoNuevo);
        return resultado;
    }

    async obtenerAcuerdos(myDataSource: any): Promise<Acuerdo[]> {
        const acuerdos = await myDataSource.getRepository(Acuerdo).find();
        return acuerdos;
    }

    async obtenerAcuerdoPorId(myDataSource: any, id: number): Promise<Acuerdo | undefined> {
        const acuerdo = await myDataSource.getRepository(Acuerdo).findOne(id);
        return acuerdo;
    }

    async modificarAcuerdo(myDataSource: any, id: number, acuerdo: Acuerdo): Promise<Acuerdo | undefined> {
        const acuerdoExistente = await myDataSource.getRepository(Acuerdo).findOne(id);
        if (acuerdoExistente) {
            const acuerdoModificado = Object.assign(acuerdoExistente, acuerdo);
            const resultado = await myDataSource.getRepository(Acuerdo).save(acuerdoModificado);
            return resultado;
        }
        return undefined;
    }

    async eliminarAcuerdo(myDataSource: any, id: number): Promise<boolean> {
        const resultado = await myDataSource.getRepository(Acuerdo).delete(id);
        return resultado.affected !== 0;
    }
}
