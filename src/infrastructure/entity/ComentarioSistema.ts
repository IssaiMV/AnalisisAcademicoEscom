import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm'
import { Usuario } from './Usuario'

@Entity('comentario_sistema')
export class ComentarioSistema {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'id_usuario' })
    usuarioId: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fecha_hora: Date

    @Column({ type: 'text' })
    comentario: string

    @ManyToOne(() => Usuario, (usuario) => usuario.comentariosSistema)
    @JoinColumn({ name: 'id_usuario' })
    usuario: Usuario
}
