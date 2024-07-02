import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm'
import { DB_TABLES } from '../constants'

import { PasswordTransformer } from '../../../../common/src/transformers/password.transformer'
import { calculateAge } from '../../../../common/src/utils/object-helpers'
import { Friend } from './friend.entity'

@Entity(DB_TABLES.Users)
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  firstName: string

  @Column({ nullable: true })
  lastName: string

  @Column({ nullable: true })
  email: string

  @Column({ type: 'timestamp' })
  birthDate: Date

  @Column({
    transformer: new PasswordTransformer(),
    nullable: false
  })
  password: string

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  registeredAt: Date

  @OneToMany(() => Friend, (friend) => friend.user)
  friends: Friend[]

  toJSON() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...self } = this
    return {
      ...self,
      fullName: `${this.firstName} ${this.lastName}`,
      age: calculateAge(this.birthDate)
    }
  }
}
