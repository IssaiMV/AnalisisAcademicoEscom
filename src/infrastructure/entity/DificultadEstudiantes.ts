import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from 'typeorm';
import { EncuestaDificultadEstudiantes } from './EncuestaDificultadEstudiantes';

@Entity('dificultad_estudiantes')
export class DificultadEstudiantes {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    nombre: string;

    @OneToMany(() => EncuestaDificultadEstudiantes, (encuestaDificultadEstudiantes) => encuestaDificultadEstudiantes.dificultadEstudiantes)
    encuestaDificultadEstudiantes: EncuestaDificultadEstudiantes[];
}