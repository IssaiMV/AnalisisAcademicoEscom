import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';
import { ComentarioDocumento } from './ComentarioDocumento';
import { Usuario } from './Usuario';

export enum TipoDocumento {
    Evidencia = 'Evidencia',
    Planeacion = 'Planeacion',
}

@Entity('documento')
export class Documento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'id_usuario' })
    usuarioId: number;

    @Column({ length: 255 })
    nombre: string;

    @Column({ length: 255 })
    ruta: string;

    @Column({ type: 'enum', enum: TipoDocumento, default: TipoDocumento.Evidencia })
    tipo: TipoDocumento;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fecha_hora: Date;

    @ManyToOne(() => Usuario, (usuario) => usuario.documentos)
    @JoinColumn({ name: 'id_usuario' })
    usuario: Usuario;

    @OneToMany(
        () => ComentarioDocumento,
        (comentarioDocumento) => comentarioDocumento.documento,
    )
    comentarios: ComentarioDocumento[];
}
