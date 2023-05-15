import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    OneToMany,
    JoinTable,
} from 'typeorm';
import { SemestreGrupo } from './SemestreGrupo';
import { Usuario } from './Usuario';
import { UnidadDeAprendizaje } from './UnidadDeAprendizaje';
import { EncuestaProblematicasGrupo } from './EncuestaProblematicasGrupo';
import { DificultadEstudiantes } from './DificultadEstudiantes';

@Entity('encuesta')
export class Encuesta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'cantidad_alumnos' })
    cantidadAlumnos: number;

    @Column({ name: 'cantidad_aprobados' })
    cantidadAprobados: number;

    @Column({ name: 'cantidad_reprobados' })
    cantidadReprobados: number;

    @Column({ type: 'text', nullable: true })
    observaciones: string | null;

    @Column({ name: 'semestre_grupo_id' })
    semestreGrupoId: number;

    @Column({ name: 'usuario_id' })
    usuarioId: number;

    @Column({ name: 'unidad_de_aprendizaje_id' })
    unidadDeAprendizajeId: number;

    @ManyToOne(() => SemestreGrupo, (semestreGrupo) => semestreGrupo.encuestas)
    @JoinColumn({ name: 'semestre_grupo_id' })
    semestreGrupo: SemestreGrupo;

    @ManyToOne(() => Usuario, (usuario) => usuario.encuestas)
    @JoinColumn({ name: 'usuario_id' })
    usuario: Usuario;

    @ManyToOne(() => UnidadDeAprendizaje, (unidadDeAprendizaje) => unidadDeAprendizaje.encuestas)
    @JoinColumn({ name: 'unidad_de_aprendizaje_id' })
    unidadDeAprendizaje: UnidadDeAprendizaje;

    @OneToMany(() => DificultadEstudiantes, (dificultadEstudiantes) => dificultadEstudiantes.encuesta)
    dificultades: DificultadEstudiantes[];

    @OneToMany(() => EncuestaProblematicasGrupo, (encuestaProblematicasGrupo) => encuestaProblematicasGrupo.encuesta)
    encuestaProblematicasGrupos: EncuestaProblematicasGrupo[];
}