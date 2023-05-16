import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from 'typeorm'
import { EncuestaProblematicasGrupo } from './EncuestaProblematicasGrupo'

@Entity('problematicas_grupo')
export class ProblematicasGrupo {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 50 })
    nombre: string

    @OneToMany(() => EncuestaProblematicasGrupo, (encuestaProblematicasGrupo) => encuestaProblematicasGrupo.problematicasGrupo)
    encuestaProblematicasGrupo: EncuestaProblematicasGrupo[]
}