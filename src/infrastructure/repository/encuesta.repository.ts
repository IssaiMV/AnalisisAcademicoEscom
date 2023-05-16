import { DificultadEstudiantes } from '../entity/DificultadEstudiantes'
import { Encuesta } from '../entity/Encuesta'

export class EncuestaRepository {

    constructor() {
    }

    async crearEncuesta(myDataSource: any, encuesta: Encuesta): Promise<Encuesta> {
        const results = await myDataSource.getRepository(Encuesta).save(encuesta)
        return results
    }

    async obtenerEncuestas(myDataSource: any): Promise<Encuesta[]> {
        const encuestas = await myDataSource.getRepository(Encuesta).find({
            relations: ['unidadDeAprendizaje', 'usuario', 'usuario.coordinador', 'semestreGrupo.grupo', 'semestreGrupo.semestre'],

        })
        return encuestas
    }

    async obtenerEncuestaPorId(myDataSource: any, id: number): Promise<Encuesta | undefined> {
        const results = await myDataSource.getRepository(Encuesta).find({
            relations: ['unidadDeAprendizaje', 'usuario', 'usuario.coordinador', 'semestreGrupo.grupo', 'semestreGrupo.semestre'],
            where: {
                id: id
            }
        })
        return results[0]
    }

    async modificarEncuesta(myDataSource: any, id: number, encuesta: Encuesta): Promise<Encuesta | undefined> {
        const encuestaExistente = await myDataSource.findOne(Encuesta, id)
        if (encuestaExistente) {
            const encuestaModificada = Object.assign(encuestaExistente, encuesta)
            return await myDataSource.getRepository(Encuesta).save(encuestaModificada)
        }
        return undefined
    }

    async eliminarEncuesta(myDataSource: any, id: number): Promise<boolean> {
        const results = await myDataSource.getRepository(Encuesta).delete(id)
        return results.affected !== 0
    }


    async numeroReprobados(myDataSource: any) {
        // Realizar la consulta utilizando el Query Builder
        const queryBuilder = myDataSource.getRepository(Encuesta).createQueryBuilder('encuesta')
            .select('unidadDeAprendizaje.nombre', 'unidad')
            .addSelect('SUM(encuesta.cantidadReprobados)', 'reprobados')
            .innerJoin('encuesta.unidadDeAprendizaje', 'unidadDeAprendizaje')
            .groupBy('unidadDeAprendizaje.nombre')

        // Obtener los datos de alumnos reprobados por unidad de aprendizaje
        const resultados = await queryBuilder.getRawMany()

        // Mapear los resultados en el formato esperado por Chart.js
        const data = resultados.map((resultado) => ({
            unidad: resultado.unidad,
            reprobados: resultado.reprobados,
        }))

        return data
    }
    async numeroReprobadosPorProfesor(myDataSource: any) {
        // Obtener los maestros y la cantidad de alumnos reprobados por maestro
        const resultado = await myDataSource.getRepository(Encuesta)
            .createQueryBuilder('encuesta')
            .leftJoinAndSelect('encuesta.usuario', 'usuario')
            .groupBy('usuario.id')
            .select('usuario.nombre', 'maestro')
            .addSelect('SUM(encuesta.cantidadReprobados)', 'reprobados')
            .getRawMany()

        // Mapear los resultados en el formato esperado por Chart.js
        const data = resultado.map((resultado) => ({
            maestros: resultado.maestro,
            reprobados: resultado.reprobados,
        }))

        return data
    }

    async obtenerProblematicasPorEncuesta(myDataSource: any) {
        // Obtener las encuestas con sus respectivos ProblematicasGrupo
        const encuestas = await myDataSource.getRepository(Encuesta).find({ relations: ['encuestaProblematicasGrupos', 'encuestaProblematicasGrupos.problematicasGrupo'] })

        // Crear un mapa para contar la cantidad de ProblematicasGrupo por encuesta
        const mapaProblematicas: Map<string, number> = new Map()

        encuestas.forEach((encuesta) => {
            encuesta.encuestaProblematicasGrupos.forEach((problematicaGrupo) => {
                const problematica = problematicaGrupo.problematicasGrupo.nombre

                // Verificar si la ProblematicasGrupo ya existe en el mapa
                if (mapaProblematicas.has(problematica)) {
                    // La ProblematicasGrupo ya existe, aumentar su cantidad
                    mapaProblematicas.set(problematica, mapaProblematicas.get(problematica)! + 1)
                } else {
                    // La ProblematicasGrupo es nueva, agregarla al mapa con cantidad 1
                    mapaProblematicas.set(problematica, 1)
                }
            })
        })

        // Convertir el mapa en un array de objetos
        const resultado: { problematicas: string, cantidad: number }[] = []
        for (const [problematica, cantidad] of mapaProblematicas) {
            resultado.push({ problematicas: problematica, cantidad })
        }
        // Retornar los datos de la gráfica
        return resultado
    }


    async obtenerUltimasDificultades(myDataSource: any): Promise<{ razon: string, observacion: string }[]> {
        const encuestaRepository = myDataSource.getRepository(Encuesta);
        const dificultadEstudiantesRepository = myDataSource.getRepository(DificultadEstudiantes);

        // Obtener las últimas 20 encuestas
        const encuestas = await encuestaRepository.find({ order: { id: 'DESC' }, take: 20 });

        // Obtener las últimas razones y observaciones de DificultadEstudiantes por encuesta
        const ultimasDificultades: { razon: string, observacion: string }[] = [];

        for (const encuesta of encuestas) {
            const dificultades = await dificultadEstudiantesRepository.find({ where: { encuestaId: encuesta.id }, order: { id: 'DESC' }, take: 1 });

            if (dificultades.length > 0) {
                const { razon, observacion } = dificultades[0];
                ultimasDificultades.push({ razon, observacion });
            }
        }

        return ultimasDificultades;
    };
}

