import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'Notes' })
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  url: string;

  @Column()
  title: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, user => user.notes, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' }) // specify the foreign key column name
  user: User;
}
