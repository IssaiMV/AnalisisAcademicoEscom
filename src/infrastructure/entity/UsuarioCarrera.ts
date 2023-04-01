import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Usuario } from './Usuario';
import { Carrera } from './Carrera';

@Entity('usuario_carrera')
export class UsuarioCarrera {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'id_usuario' })
    usuarioId: number;

    @Column({ name: 'id_carrera' })
    carreraId: number;

    @ManyToOne(() => Usuario, (usuario) => usuario.usuarioCarrera)
    @JoinColumn({ name: 'id_usuario' })
    usuario: Usuario;

    @ManyToOne(() => Carrera, (carrera) => carrera.usuarioCarreras)
    @JoinColumn({ name: 'id_carrera' })
    carrera: Carrera;
}
