import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from 'typeorm'
import { SemestreGrupo } from './SemestreGrupo'

@Entity('grupo')
export class Grupo {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 50 })
    nombre: string

    @OneToMany(() => SemestreGrupo, (semestreGrupo) => semestreGrupo.grupo)
    semestreGrupos: SemestreGrupo[]
}