import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm'
import { Usuario } from './Usuario'
import { Documento } from './Documento'

@Entity('comentario_documento')
export class ComentarioDocumento {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'id_coordinador' })
    coordinadorId: number

    @Column({ name: 'id_documento' })
    documentoId: number

    @Column({ type: 'text' })
    comentario: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fecha_hora: Date

    @ManyToOne(() => Usuario, (usuario) => usuario.comentariosDocumento)
    @JoinColumn({ name: 'id_coordinador' })
    coordinador: Usuario

    @ManyToOne(() => Documento, (documento) => documento.comentarios)
    @JoinColumn({ name: 'id_documento' })
    documento: Documento
}
