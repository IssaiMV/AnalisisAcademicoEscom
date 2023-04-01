import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from 'typeorm';
import { Encuesta } from './Encuesta';

@Entity('unidad_de_aprendizaje')
export class UnidadDeAprendizaje {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    nombre: string;

    @Column({ length: 10 })
    codigo: string;

    @OneToMany(() => Encuesta, (encuesta) => encuesta.unidadDeAprendizaje)
    encuestas: Encuesta[];
}