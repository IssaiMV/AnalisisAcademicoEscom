import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from 'typeorm'
import { SemestreGrupo } from './SemestreGrupo'

@Entity('semestre')
export class Semestre {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 50 })
    nombre: string

    @OneToMany(() => SemestreGrupo, (semestreGrupo) => semestreGrupo.semestre)
    semestreGrupos: SemestreGrupo[]
}