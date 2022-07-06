import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'vehicle' })
export class VehicleEntity {
  @PrimaryGeneratedColumn('uuid')
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
  year?: number;

  @Column()
  enable?: boolean;

  @Column({ name: 'created_at' })
  createdAt!: Date;

  @Column({ name: 'updated_at' })
  updatedAt!: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
      this.createdAt = new Date(Date.now());
      this.updatedAt = new Date(Date.now());
    }
  }

  @BeforeUpdate()
  public beforeUpdate(): void {
    this.updatedAt = new Date(Date.now());
  }
}
