import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from 'typeorm';
import { Encuesta } from './Encuesta';

@Entity('dificultad_estudiantes')
export class DificultadEstudiantes {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    nombre: string;

    @Column({ type: 'int', nullable: false, name: 'id_encuesta' })
    idEncuesta: number;

    @Column({ type: 'varchar', length: 50, nullable: true })
    razon: string;

    @Column({ type: 'text', nullable: true })
    observacion: string;

    @ManyToOne(() => Encuesta, (encuesta) => encuesta.dificultades)
    encuesta: Encuesta;
}