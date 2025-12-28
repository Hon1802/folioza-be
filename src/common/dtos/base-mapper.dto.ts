import 'reflect-metadata';
import { getTransformerKey } from '../decorators/automap.decorator';

export class BaseMapperDto {
  constructor(source: Record<string, any>) {
    const ctor = this.constructor as any;
    const props: string[] = Reflect.getMetadata('props', ctor) || [];

    for (const key of props) {
      const transformMeta = Reflect.getMetadata(
        getTransformerKey(),
        ctor.prototype,
        key,
      );
      const value = source[key];

      if (value === undefined || value === null) {
        this[key] = null;
      } else if (transformMeta) {
        const TargetDto = transformMeta.ctor();
        if (transformMeta.type === 'single') {
          this[key] = new TargetDto(value);
        } else if (transformMeta.type === 'array' && Array.isArray(value)) {
          this[key] = value.map((v: any) => new TargetDto(v));
        } else {
          this[key] = null;
        }
      } else {
        this[key] = value;
      }
    }
  }
}
