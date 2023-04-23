import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {Class} from './class.entity'

@Entity({ name: 'modules'})
export class Module {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Class, classe => classe.module)
  classes: Class[];
}
