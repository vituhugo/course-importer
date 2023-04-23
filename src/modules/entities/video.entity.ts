import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn} from 'typeorm'
import {ClassPart} from './class-part.entity'

@Entity()
export class Video {
  @PrimaryColumn()
  id: number;

  @OneToOne(() => ClassPart, (classPart) => classPart.video)
  @JoinColumn({ name: 'id' })
  classPart: ClassPart;

  @Column()
  duration: number;

  @Column()
  mimeType: string;

  @Column()
  size: number;

  @Column()
  path: string;

  @Column({ nullable: true})
  thumbnailPath?: string;

  @Column({ type: 'text', nullable: true })
  summary?: string;
}
