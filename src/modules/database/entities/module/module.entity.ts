import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Expose, Transform } from 'class-transformer';
import { Class } from '@infra/database/entities/class/class.entity';
import { Progress } from '@infra/database/entities/profile/progress.entity';

@Entity({ name: 'modules' })
export class Module {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  imgSrc: string;

  @OneToMany(() => Class, (classe) => classe.module)
  classes: Class[];

  @Expose({ name: 'progress' })
  @Transform((value) => (value ? value[0] : null))
  @Transform(({ value, obj }) => {
    if (value && value.length > 0) return value[0];
    const progress = new Progress();
    progress.entityId = obj.id;
    progress.entityType = 'module';
    return progress;
  })
  progresses?: Progress[];
}
