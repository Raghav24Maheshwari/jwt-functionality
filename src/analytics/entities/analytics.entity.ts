// src/analytics/entities/traffic-log.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TrafficLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ip: string;

  @Column()
  url: string;

  @Column()
  method: string;

  @Column()
  userAgent: string;

  @Column({ type: 'bigint' })
  timestamp: number;
}
