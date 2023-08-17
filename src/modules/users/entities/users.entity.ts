import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  'username': string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  birthdate: Date;

  @Column({ nullable: true })
  profile_picture: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  status: boolean;

  @Column({ default: false })
  private: boolean;
}
