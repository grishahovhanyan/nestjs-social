import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { DB_TABLES } from '../constants'

import { User } from './user.entity'

export enum REQUEST_STATUSES {
  pending = 'pending',
  accepted = 'accepted'
}

@Entity(DB_TABLES.Friends)
export class Friend {
  @PrimaryGeneratedColumn()
  id: number

  // userId - ID of the user who sent the request
  @Column({ nullable: false })
  userId: number

  // friendId - ID of the user to whom the request was sent (can accept or decline using APIs [POST][DELETE] /friend-requests/)
  @Column({ nullable: false })
  friendId: number

  @Column({ nullable: false, enum: REQUEST_STATUSES, default: REQUEST_STATUSES.pending })
  status: REQUEST_STATUSES

  @Column({ nullable: true, type: 'timestamp' })
  acceptedAt: Date

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date

  @ManyToOne(() => User, (user) => user.friends)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User

  @ManyToOne(() => User)
  @JoinColumn({ name: 'friendId', referencedColumnName: 'id' })
  friend: User
}
