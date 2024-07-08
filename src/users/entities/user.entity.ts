import { Column, Entity, PrimaryGeneratedColumn, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm";
import { Note } from '../../notes/entities/note.entity';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isAdmin: boolean;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => Note, note => note.user)
  notes: Note[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
