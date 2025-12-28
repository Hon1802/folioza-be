import 'reflect-metadata';

const TRANSFORMER_KEY = Symbol('TRANSFORMER_KEY');

export const getTransformerKey = () => TRANSFORMER_KEY;

export function AutoMapDecorator(): PropertyDecorator {
  return (target: any, propertyKey: string | symbol) => {
    const props: string[] =
      Reflect.getMetadata('props', target.constructor) || [];
    if (!props.includes(propertyKey as string)) {
      props.push(propertyKey as string);
      Reflect.defineMetadata('props', props, target.constructor);
    }
  };
}

export function NestedDecorator(typeFn: () => any): PropertyDecorator {
  return (target: any, propertyKey: string | symbol) => {
    Reflect.defineMetadata(
      TRANSFORMER_KEY,
      { type: 'single', ctor: typeFn },
      target,
      propertyKey,
    );
    AutoMapDecorator()(target, propertyKey);
  };
}

export function NestedArrayDecorator(typeFn: () => any): PropertyDecorator {
  return (target: any, propertyKey: string | symbol) => {
    Reflect.defineMetadata(
      TRANSFORMER_KEY,
      { type: 'array', ctor: typeFn },
      target,
      propertyKey,
    );
    AutoMapDecorator()(target, propertyKey);
  };
}
