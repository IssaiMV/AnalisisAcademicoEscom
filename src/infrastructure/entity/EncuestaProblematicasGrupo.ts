import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Encuesta } from './Encuesta';
import { ProblematicasGrupo } from './ProblematicasGrupo';

@Entity('encuesta_problematicas_grupo')
export class EncuestaProblematicasGrupo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'encuesta_id' })
    encuestaId: number;

    @Column({ name: 'problematicas_grupo_id' })
    problematicasGrupoId: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    otro: string | null;

    @ManyToOne(() => Encuesta, (encuesta) => encuesta.encuestaProblematicasGrupos)
    @JoinColumn({ name: 'encuesta_id' })
    encuesta: Encuesta;

    @ManyToOne(() => ProblematicasGrupo, (problematicasGrupo) => problematicasGrupo.encuestaProblematicasGrupo)
    @JoinColumn({ name: 'problematicas_grupo_id' })
    problematicasGrupo: ProblematicasGrupo;
}