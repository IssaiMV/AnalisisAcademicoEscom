import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    OneToOne,
    JoinColumn,
} from 'typeorm'
import { Asistencia } from './Asistencia'
import { Documento } from './Documento'
import { ComentarioSistema } from './ComentarioSistema'
import { UsuarioCarrera } from './UsuarioCarrera'
import { Acuerdo } from './Acuerdo'
import { ComentarioDocumento } from './ComentarioDocumento'
import { ComentarioReunion } from './ComentarioReunion'
import { Reunion } from './Reunion'
import { Encuesta } from './Encuesta'

export enum Rol {
    PROFESOR = 'Profesor',
    COORDINADOR = 'Coordinador',
    EVALUADOR = 'Evaluador',
}

@Entity('usuario')
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 50 })
    nombre: string

    @Column({ name: 'apellido_paterno', type: 'varchar', length: 50 })
    apellidoPaterno: string

    @Column({ name: 'apellido_materno', type: 'varchar', length: 50 })
    apellidoMaterno: string

    @Column({ type: 'varchar', length: 50 })
    email: string

    @Column({ type: 'varchar', length: 50 })
    password: string

    @Column({ type: 'tinyint', width: 1, default: 1 })
    activo: boolean

    @Column({
        type: 'enum',
        enum: Rol,
    })
    rol: Rol

    @Column({ name: 'coordinador_id', type: 'int', nullable: true })
    coordinadorId: number

    @OneToOne(() => Usuario)
    @JoinColumn({ name: 'coordinador_id' })
    coordinador: Usuario

    @OneToMany(() => Asistencia, (asistencia) => asistencia.usuario)
    asistencias: Asistencia[]

    @OneToMany(() => Documento, (documento) => documento.usuario)
    documentos: Documento[]

    @OneToMany(() => ComentarioSistema, (comentarioSistema) => comentarioSistema.usuario)
    comentariosSistema: ComentarioSistema[]

    @OneToMany(() => UsuarioCarrera, (usuarioCarrera) => usuarioCarrera.usuario)
    usuarioCarrera: UsuarioCarrera[]

    @OneToMany(() => Acuerdo, (acuerdo) => acuerdo.coordinador)
    acuerdos: Acuerdo[]

    @OneToMany(() => ComentarioDocumento, (comentarioDocumento) => comentarioDocumento.coordinador)
    comentariosDocumento: ComentarioDocumento[]

    @OneToMany(() => ComentarioReunion, (comentarioReunion) => comentarioReunion.coordinador)
    comentariosReunion: ComentarioReunion[]

    @OneToMany(() => Reunion, (reunion) => reunion.coordinador)
    reuniones: Reunion[]

    @OneToMany(() => Encuesta, (encuesta) => encuesta.usuario)
    encuestas: Encuesta[]
}