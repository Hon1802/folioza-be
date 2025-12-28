import {
  DataSource,
  EntityTarget,
  FindOneOptions,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { BadRequestExc } from '../exceptions/custom-http.exception';

export class BaseRepository<T extends ObjectLiteral> extends Repository<T> {
  constructor(entity: EntityTarget<T>, dataSource: DataSource) {
    super(entity, dataSource.createEntityManager());
  }

  async findOneOrThrowExc(conditions: FindOneOptions<T>) {
    const result = await this.findOne(conditions);
    if (!result) throw new BadRequestExc(`${this.metadata.name} is not found `);

    return result;
  }

  async findOneByOrThrowExc(conditions: Parameters<this['findOneBy']>[0]) {
    const result = await this.findOneBy(conditions);
    if (!result) throw new BadRequestExc(`${this.metadata.name} is not found `);

    return result;
  }
}
