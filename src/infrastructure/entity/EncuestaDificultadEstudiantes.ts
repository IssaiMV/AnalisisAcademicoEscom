import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Encuesta } from './Encuesta';
import { DificultadEstudiantes } from './DificultadEstudiantes';

@Entity('encuesta_dificultad_estudiantes')
export class EncuestaDificultadEstudiantes {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'encuesta_id' })
    encuestaId: number;

    @Column({ name: 'dificultad_estudiantes_id' })
    dificultadEstudiantesId: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    otro: string | null;

    @ManyToOne(() => Encuesta, (encuesta) => encuesta.encuestaDificultadEstudiantes)
    @JoinColumn({ name: 'encuesta_id' })
    encuesta: Encuesta;

    @ManyToOne(() => DificultadEstudiantes, (dificultadEstudiantes) => dificultadEstudiantes.encuestaDificultadEstudiantes)
    @JoinColumn({ name: 'dificultad_estudiantes_id' })
    dificultadEstudiantes: DificultadEstudiantes;
}
