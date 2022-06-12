import { Schema } from '@formily/json-schema';
import { Plugin } from '@znewbee/server';
import lodash from 'lodash';
import { BaseError } from 'sequelize';
import { ErrorHandler } from './error-handler';
import enUS from './locale/en_US';
import zhCN from './locale/zh_CN';

export class PluginErrorHandler extends Plugin {
  getName(): string {
    return this.getPackageName(__dirname);
  }

  errorHandler: ErrorHandler = new ErrorHandler();
  i18nNs: string = 'error-handler';

  beforeLoad() {
    this.registerSequelizeValidationErrorHandler();
  }

  registerSequelizeValidationErrorHandler() {
    const findFieldTitle = (instance, path, tFunc) => {
      if (!instance) {
        return path;
      }

      const model = instance.constructor;
      const collection = this.db.modelCollection.get(model);
      const field = collection.getField(path);
      const fieldOptions = Schema.compile(field.options, { t: tFunc });
      const title = lodash.get(fieldOptions, 'uiSchema.title', path);
      return title;
    };

    this.errorHandler.register(
      (err) => err?.errors?.length && err instanceof BaseError,
      (err, ctx) => {
        ctx.body = {
          errors: err.errors.map((err) => {
            return {
              message: ctx.i18n.t(err.type, {
                ns: this.i18nNs,
                field: findFieldTitle(err.instance, err.path, ctx.i18n.t),
              }),
            };
          }),
        };
        ctx.status = 400;
      },
    );
  }
  async load() {
    this.app.i18n.addResources('zh-CN', this.i18nNs, zhCN);
    this.app.i18n.addResources('en-US', this.i18nNs, enUS);

    this.app.middleware.unshift(this.errorHandler.middleware());
  }
}
