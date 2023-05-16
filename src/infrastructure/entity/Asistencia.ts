import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm'
import { Usuario } from './Usuario'
import { Reunion } from './Reunion'

@Entity('asistencia')
export class Asistencia {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'id_usuario' })
    usuarioId: number

    @Column({ name: 'id_reunion' })
    reunionId: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fecha_hora: Date

    @Column({ type: 'tinyint', default: 1 })
    asistio: number

    @ManyToOne(() => Usuario, (usuario) => usuario.asistencias)
    @JoinColumn({ name: 'id_usuario' })
    usuario: Usuario

    @ManyToOne(() => Reunion, (reunion) => reunion.asistencias)
    @JoinColumn({ name: 'id_reunion' })
    reunion: Reunion
}