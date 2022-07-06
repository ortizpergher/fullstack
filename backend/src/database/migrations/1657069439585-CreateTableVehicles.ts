import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableVehicles1657069439585 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vehicles',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'license_plate',
            type: 'varchar',
            length: '8',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'brand',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'model',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'version',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          { name: 'year', type: 'int', isNullable: false },
          { name: 'enable', type: 'boolean', default: true, isNullable: false },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('vehicles', true, true, true);
  }
}
