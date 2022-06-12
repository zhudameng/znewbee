import { css } from '@emotion/css';
import { Layout, Spin } from 'antd';
import React, { createContext, useContext, useMemo, useRef } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import {
  ACLAllowConfigure,
  ACLRolesCheckProvider,
  CurrentUser,
  CurrentUserProvider,
  findByUid,
  findMenuItem,
  RemoteCollectionManagerProvider,
  RemotePluginManagerToolbar,
  RemoteSchemaTemplateManagerProvider,
  SchemaComponent,
  useACLRoleContext,
  useDocumentTitle,
  useRequest,
  useRoute,
  useSystemSettings
} from '../../../';
import { useCollectionManager } from '../../../collection-manager';
import { PoweredBy } from '../../../powered-by';

const filterByACL = (schema, options) => {
  const { allowAll, allowConfigure, allowMenuItemIds = [] } = options;
  if (allowAll || allowConfigure) {
    return schema;

  }
  const filterSchema = (s) => {
    if (!s) {
      return;
    }
    for (const key in s.properties) {
      if (Object.prototype.hasOwnProperty.call(s.properties, key)) {
        const element = s.properties[key];
        if (element['x-uid'] && !allowMenuItemIds.includes(element['x-uid'])) {
          delete s.properties[key];
        }
      }
    }
  };
  filterSchema(schema);
  return schema;
};

const SchemaIdContext = createContext(null);
const useMenuProps = () => {
  const defaultSelectedUid = useContext(SchemaIdContext);
  return {
    selectedUid: defaultSelectedUid,
    defaultSelectedUid,
  };
};
const MenuEditor = (props) => {
  const { setTitle } = useDocumentTitle();
  const history = useHistory();
  const match = useRouteMatch<any>();
  const defaultSelectedUid = match.params.name;
  const { sideMenuRef } = props;
  const ctx = useACLRoleContext();
  const route = useRoute();
  const onSelect = ({ item }) => {
    const schema = item.props.schema;
    setTitle(schema.title);
    history.push(`/admin/${schema['x-uid']}`);
  };
  const { data, loading } = useRequest(
    {
      url: `/uiSchemas:getJsonSchema/${route.uiSchemaUid}`,
    },
    {
      refreshDeps: [route.uiSchemaUid],
      onSuccess(data) {
        const schema = filterByACL(data?.data, ctx);
        if (defaultSelectedUid) {
          const s = findByUid(schema, defaultSelectedUid);
          if (s) {
            setTitle(s.title);
          }
        } else {
          const s = findMenuItem(schema);
          if (s) {
            history.push(`/admin/${s['x-uid']}`);
            setTitle(s.title);
          }
        }
      },
    },
  );
  const schema = useMemo(() => {
    const s = filterByACL(data?.data, ctx);
    if (s?.['x-component-props']) {
      s['x-component-props']['useProps'] = useMenuProps;
    }
    return s;
  }, [data?.data]);
  if (loading) {
    return <Spin />;
  }
  return (
    <SchemaIdContext.Provider value={defaultSelectedUid}>
      <SchemaComponent memoized scope={{ useMenuProps, onSelect, sideMenuRef, defaultSelectedUid }} schema={schema} />
    </SchemaIdContext.Provider>
  );
};

const InternalAdminLayout = (props: any) => {
  const route = useRoute();
  const history = useHistory();
  const match = useRouteMatch<any>();
  const { setTitle } = useDocumentTitle();
  const sideMenuRef = useRef();

  const result = useSystemSettings();
  const { service } = useCollectionManager();
  return (
    <Layout style={{ display: 'flex', height: '100%' }}>
      <Layout.Header
        className={css`
          .ant-menu.ant-menu-dark .ant-menu-item-selected,
          .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {
            background-color: rgba(255, 255, 255, 0.2);
          }
          .ant-menu-dark.ant-menu-horizontal > .ant-menu-item:hover {
            background-color: rgba(255, 255, 255, 0.2);
          }
        `}
        style={{ height: 46, width:'100%',zIndex:'999', lineHeight: '46px', position: 'fixed', paddingLeft: 0 ,background:'#44a85d'}}
      >
        <div style={{ display: 'flex', height: '100%',background:'#44a85d'}}>
          <div style={{ width: 200, display: 'inline-flex', color: '#411777', padding: '0', alignItems: 'center' }}>
            <img
              className={css`
                padding: 0 16px;
                object-fit: contain;
                width: 100%;
                height: 100%;
              `}
              src={result?.data?.data?.logo?.url}
            />
            {/* {result?.data?.data?.title} */}
          </div>
          <div
            style={{
              width: 'calc(100% - 590px)',background:'#44a85d'
            }}
          >
            <MenuEditor sideMenuRef={sideMenuRef}/>
          </div>
        </div>
        <div style={{ position: 'absolute', top: 0, right: 0 ,zIndex:'1',height:'46px',background:'#44a85d'}}>
          <ACLAllowConfigure>
            <RemotePluginManagerToolbar />
          </ACLAllowConfigure>
          <CurrentUser />
        </div>
      </Layout.Header>
      <Layout style={{display:'flex',flexDirection:'row',marginTop:'46px'}}>
        <Layout.Sider style={{ display: 'none', background:'rgb(11,32,51)' }} theme={'light'} ref={sideMenuRef}></Layout.Sider>
        <Layout.Content
          className={css`
            min-height: calc(100vh - 46px);
            position: relative;
            overflow-y: scroll
            padding-bottom: 70px;
            .ant-layout-footer {
              position: absolute;
              bottom: 0;
              text-align: center;
              width: 100%;
            }
          `}
        >
          {service.contentLoading ? <Spin /> : props.children}
          <Layout.Footer>
            <PoweredBy />
          </Layout.Footer>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export const AdminLayout = (props) => {
  return (
    <CurrentUserProvider>
      <RemoteSchemaTemplateManagerProvider>
        <RemoteCollectionManagerProvider>
          <ACLRolesCheckProvider>
            <InternalAdminLayout {...props} />
          </ACLRolesCheckProvider>
        </RemoteCollectionManagerProvider>
      </RemoteSchemaTemplateManagerProvider>
    </CurrentUserProvider>
  );
};

export default AdminLayout;
