import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('sensor_data')
export class SensorEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({type: 'varchar', name: 'device_id'})
  deviceId: string;

  @Column({type: 'double precision', name: 'temperature'})
  temp: number;

  @Column({type: 'double precision', name: 'humidity'})
  humidity: number;

  @Column({type: 'double precision', name: 'co'})
  co: number;

  @Column({type: 'double precision', name: 'smoke'})
  smoke: number;

  @Column({type: 'boolean', name: 'light'})
  light: boolean;

  @Column({type: 'double precision', name: 'timestamp'})
  timestamp: number;
}