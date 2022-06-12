import { MultipleRelationRepository, Repository } from '@znewbee/database';
import { Context } from '.';

export function getRepositoryFromParams(ctx: Context) {
  const { resourceName, resourceOf } = ctx.action;

  if (resourceOf) {
    return ctx.db.getRepository<MultipleRelationRepository>(resourceName, resourceOf);
  }

  return ctx.db.getRepository<Repository>(resourceName);
}

export function RelationRepositoryActionBuilder(method: 'remove' | 'set') {
  return async function (ctx: Context, next) {
    const repository = getRepositoryFromParams(ctx);

    await repository[method](ctx.action.params.values);
    await next();
  };
}
