import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Video {
  @PrimaryColumn()
  id: number;

  @Column()
  duration: number;

  @Column()
  mimeType: string;

  @Column()
  size: number;

  @Column()
  path: string;

  @Column({ nullable: true })
  thumbnailPath?: string;

  @Column({ type: 'text', nullable: true })
  summary?: string;
}
