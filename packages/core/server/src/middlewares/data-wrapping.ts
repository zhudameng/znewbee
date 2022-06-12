import { Context, Next } from '@znewbee/actions';

export function dataWrapping() {
  return async function dataWrapping(ctx: Context, next: Next) {
    await next();

    if (ctx.withoutDataWrapping) {
      return;
    }

    if (!ctx?.action?.params) {
      return;
    }

    if (ctx.body instanceof Buffer) {
      return;
    }

    if (!ctx.body) {
      if (ctx.action.actionName == 'get') {
        ctx.status = 404;
      }
    }

    const { rows, ...meta } = ctx.body || {};

    if (rows) {
      ctx.body = {
        data: rows,
        meta,
      };
    } else {
      ctx.body = {
        data: ctx.body,
      };
    }
  };
}

export default dataWrapping;
