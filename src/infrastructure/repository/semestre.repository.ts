import { Semestre } from "../entity/Semestre";

export class SemestreRepository {

    constructor() {
    }

    async crearSemestre(myDataSource: any, semestre: Semestre): Promise<Semestre> {
        const sem = await myDataSource.getRepository(Semestre).create(semestre)
        const results = await myDataSource.getRepository(Semestre).save(sem)
        return results;
    }

    async obtenerSemestres(myDataSource: any): Promise<Semestre[]> {
        const semestres = await myDataSource.getRepository(Semestre).find()
        return semestres;
    }

    async obtenerSemestrePorId(myDataSource: any, id: number): Promise<Semestre | undefined> {
        const results = await myDataSource.getRepository(Semestre).findOneBy({
            id: id,
        })
        return results;
    }

    async modificarSemestre(myDataSource: any, id: number, semestre: Semestre): Promise<Semestre | undefined> {
        const semestreExistente = await myDataSource.findOne(Semestre, id);
        if (semestreExistente) {
            const semestreModificado = Object.assign(semestreExistente, semestre);
            return await myDataSource.getRepository(Semestre).save(semestreModificado);
        }
        return undefined;
    }

    async eliminarSemestre(myDataSource: any, id: number): Promise<boolean> {
        const results = await myDataSource.getRepository(Semestre).delete(id);
        return results.affected !== 0;
    }
}
