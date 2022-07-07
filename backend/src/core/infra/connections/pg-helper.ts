import { DataSource, EntityTarget, QueryRunner, Repository } from 'typeorm';
import configDataSource from '../database/ormconfig';

export const pgHelper = {
  client: null as unknown as DataSource,
  queryRunner: null as unknown as QueryRunner,
  async connect(): Promise<void> {
    this.client = new DataSource(configDataSource);
    await this.client.initialize();
  },
  async disconnect(): Promise<void> {
    await this.client.destroy();
    this.client = null as any;
  },
  async openTransaction(): Promise<void> {
    if (!this.client || !this.client.isInitialized) await this.connect();
    this.queryRunner = this.client.createQueryRunner();
    await this.queryRunner.startTransaction();
  },
  async closeTransaction(): Promise<void> {
    if (!this.queryRunner) throw new Error('Transaction not opened');
    await this.queryRunner.release();
    this.queryRunner = null as any;
  },
  async commit(): Promise<void> {
    if (!this.queryRunner) throw new Error('Transaction not opened');
    await this.queryRunner.commitTransaction();
  },
  async rollback(): Promise<void> {
    if (!this.queryRunner) throw new Error('Transaction not opened');
    await this.queryRunner.rollbackTransaction();
  },
  async getRepository<T>(entity: EntityTarget<T>): Promise<Repository<T>> {
    if (!this.client || !this.client.isInitialized) {
      await this.connect();
    }

    if (this.queryRunner) return this.queryRunner.manager.getRepository<T>(entity);

    return this.client.getRepository<T>(entity);
  },
};
