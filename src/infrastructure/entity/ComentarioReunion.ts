import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm'
import { Usuario } from './Usuario'
import { Reunion } from './Reunion'

@Entity('comentario_reunion')
export class ComentarioReunion {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'id_coordinador' })
    coordinadorId: number

    @Column({ name: 'id_reunion' })
    reunionId: number

    @Column({ type: 'text' })
    comentario: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fecha_hora: Date

    @ManyToOne(() => Usuario, (usuario) => usuario.comentariosReunion)
    @JoinColumn({ name: 'id_coordinador' })
    coordinador: Usuario

    @ManyToOne(() => Reunion, (reunion) => reunion.comentarios)
    @JoinColumn({ name: 'id_reunion' })
    reunion: Reunion
}
