import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from 'typeorm';
import { UsuarioCarrera } from './UsuarioCarrera';

@Entity('carrera')
export class Carrera {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    nombre: string;

    @OneToMany(() => UsuarioCarrera, (usuarioCarrera) => usuarioCarrera.carrera)
    usuarioCarreras: UsuarioCarrera[];
}