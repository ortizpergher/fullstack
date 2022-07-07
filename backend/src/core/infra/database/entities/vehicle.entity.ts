import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'vehicles' })
export class VehicleEntity {
  @PrimaryColumn()
  id?: string;

  @Column({ name: 'license_plate', unique: true })
  licensePlate!: string;

  @Column()
  brand!: string;

  @Column()
  model!: string;

  @Column()
  version?: string;

  @Column()
  year!: number;

  @Column({ default: true })
  enable!: boolean;

  @Column({ name: 'created_at' })
  createdAt!: Date;

  @Column({ name: 'updated_at' })
  updatedAt!: Date;

  @BeforeInsert()
  public beforeInsert(): void {
    this.id = uuid();
    this.createdAt = new Date(Date.now());
    this.updatedAt = new Date(Date.now());
  }

  @BeforeUpdate()
  public beforeUpdate(): void {
    this.updatedAt = new Date(Date.now());
  }
}
