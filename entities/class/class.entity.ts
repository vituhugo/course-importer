import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Module } from '@infra/database/entities/module/module.entity';
import { Section } from '@infra/database/entities/section/section.entity';
import { Expose, Transform } from 'class-transformer';
import { Progress } from '@infra/database/entities/profile/progress.entity';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  imgSrc: string;

  @Column()
  moduleId: number;

  @ManyToOne(() => Module)
  module: Module;

  @OneToMany(() => Section, (section) => section.class)
  sections: Section[];

  @Expose({ name: 'progress' })
  @Transform(({ value, obj }) => {
    if (value && value.length > 0) return value[0];
    const progress = new Progress();
    progress.entityId = obj.id;
    progress.entityType = 'class';
    return progress;
  })
  progresses: Progress[] | null;
}
