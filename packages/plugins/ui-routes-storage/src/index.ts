import { skip } from '@znewbee/acl';
import { MagicAttributeModel } from '@znewbee/database';
import { Plugin } from '@znewbee/server';
import { resolve } from 'path';
import { getAccessible } from './actions/getAccessible';

export class UiRoutesStoragePlugin extends Plugin {
  getName(): string {
    return this.getPackageName(__dirname);
  }

  async install() {
    const repository = this.app.db.getRepository('uiRoutes');
    const routes = [
      {
        type: 'redirect',
        from: '/',
        to: '/admin',
        exact: true,
      },
      {
        type: 'route',
        uiSchema: {
          type: 'void',
          'x-component': 'Menu',
          'x-designer': 'Menu.Designer',
          'x-initializer': 'MenuItemInitializers',
          'x-component-props': {
            mode: 'mix',
            theme: 'dark',
            // defaultSelectedUid: 'u8',
            onSelect: '{{ onSelect }}',
            sideMenuRefScopeKey: 'sideMenuRef',
          },
          properties: {},
        },
        path: '/admin/:name(.+)?',
        component: 'AdminLayout',
        title: 'znewbee Admin',
        routes: [
          // test...
          // {
          //   type: 'route',
          //   path: '/admin/workflows/:id',
          //   component: 'WorkflowPage',
          // },
          // {
          //   type: 'route',
          //   path: '/admin/block-templates/:key',
          //   component: 'BlockTemplateDetails',
          // },
          // {
          //   type: 'route',
          //   path: '/admin/block-templates',
          //   component: 'BlockTemplatePage',
          // },
          {
            type: 'route',
            path: '/admin/:name(.+)?',
            component: 'RouteSchemaComponent',
          },
        ],
      },
      {
        type: 'route',
        component: 'AuthLayout',
        routes: [
          {
            type: 'route',
            path: '/signin',
            component: 'SigninPage',
          },
          {
            type: 'route',
            path: '/signup',
            component: 'SignupPage',
          },
        ],
      },
    ];
    for (const values of routes) {
      await repository.create({
        values,
      });
    }
  }

  async load() {
    this.app.resourcer.registerActionHandler('uiRoutes:getAccessible', getAccessible);
    this.app.db.registerModels({ MagicAttributeModel });

    await this.app.db.import({
      directory: resolve(__dirname, 'collections'),
    });

    this.app.acl.use(
      skip({
        resourceName: 'uiRoutes',
        actionName: 'getAccessible',
      }),
    );
  }
}

export default UiRoutesStoragePlugin;
