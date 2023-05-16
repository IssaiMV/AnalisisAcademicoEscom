import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm'
import { Usuario } from './Usuario'
import { Asistencia } from './Asistencia'
import { Acuerdo } from './Acuerdo'
import { ComentarioReunion } from './ComentarioReunion'

export enum Estatus {
    Realizada = 'Realizada',
    Cancelada = 'Cancelada',
    Pendiente = 'Pendiente',
}

@Entity('reunion')
export class Reunion {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 255 })
    titulo: string

    @Column({ type: 'text' })
    descripcion: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fecha_hora: Date

    @Column({ length: 255 })
    enlace: string

    @Column({ nullable: true, name: 'coordinador_id' })
    coordinadorId: number

    @ManyToOne(() => Usuario, (usuario) => usuario.reuniones)
    @JoinColumn({ name: 'coordinador_id' })
    coordinador: Usuario

    @Column({ type: 'enum', enum: Estatus })
    estatus: Estatus

    @OneToMany(() => Asistencia, (asistencia) => asistencia.reunion)
    asistencias: Asistencia[]

    @OneToMany(() => Acuerdo, (acuerdo) => acuerdo.reunion)
    acuerdos: Acuerdo[]

    @OneToMany(() => ComentarioReunion, comentario => comentario.reunion)
    comentarios: ComentarioReunion[]
}