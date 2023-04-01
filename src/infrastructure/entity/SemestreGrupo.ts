import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { Semestre } from './Semestre';
import { Grupo } from './Grupo';
import { Encuesta } from './Encuesta';

@Entity('semestre_grupo')
export class SemestreGrupo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'semestre_id' })
    semestreId: number;

    @Column({ name: 'grupo_id' })
    grupoId: number;

    @ManyToOne(() => Semestre, (semestre) => semestre.semestreGrupos)
    @JoinColumn({ name: 'semestre_id' })
    semestre: Semestre;

    @ManyToOne(() => Grupo, (grupo) => grupo.semestreGrupos)
    @JoinColumn({ name: 'grupo_id' })
    grupo: Grupo;

    @OneToMany(() => Encuesta, (encuesta) => encuesta.semestreGrupo)
    encuestas: Encuesta[];
}