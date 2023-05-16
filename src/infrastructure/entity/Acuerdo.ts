import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm'
import { Reunion } from './Reunion'
import { Usuario } from './Usuario'

@Entity('acuerdo')
export class Acuerdo {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'int' })
    reunionId: number

    @ManyToOne(() => Reunion, reunion => reunion.acuerdos)
    reunion: Reunion

    @Column({ type: 'int' })
    coordinadorId: number

    @ManyToOne(() => Usuario, usuario => usuario.acuerdos)
    coordinador: Usuario

    @Column()
    titulo: string

    @Column()
    descripcion: string

    @Column()
    fechaHora: Date
}