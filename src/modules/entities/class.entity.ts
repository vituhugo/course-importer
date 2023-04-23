import {Module} from './module.entity'
import {ClassPart} from './class-part.entity'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Module)
  module: Module;

  @OneToMany(() => ClassPart, classPart => classPart.class)
  classParts: ClassPart[];
}
