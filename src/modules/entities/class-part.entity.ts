import {Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm'
import {Class} from './class.entity'
import {Video} from './video.entity'

@Entity()
export class ClassPart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  index: number;

  @ManyToOne(() => Class)
  class: Class;

  @OneToOne(() => Video, (video) => video.classPart)
  video: Video;
}
