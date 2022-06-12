import { css } from '@emotion/css';
import { ISchema, observer } from '@formily/react';
import { Button, Dropdown, Menu, Switch } from 'antd';
import classNames from 'classnames';
import React, { createContext, useContext, useState } from 'react';
import { Icon } from '../icon';
import { useCompile, useDesignable } from '../schema-component/hooks';
import {
  SchemaInitializerButtonProps,
  SchemaInitializerItemComponent,
  SchemaInitializerItemOptions,
  SchemaInitializerItemProps
} from './types';

const defaultWrap = (s: ISchema) => s;

export const SchemaInitializerItemContext = createContext(null);

export const SchemaInitializer = () => null;

SchemaInitializer.Button = observer((props: SchemaInitializerButtonProps) => {
  const {
    title,
    insert,
    wrap = defaultWrap,
    items = [],
    insertPosition = 'beforeEnd',
    dropdown,
    component,
    style,
    icon,
    onSuccess,
    ...others
  } = props;
  const compile = useCompile();
  let { insertAdjacent, findComponent, designable } = useDesignable();
  const [visible, setVisible] = useState(false);
  const insertSchema = (schema) => {
    if (props.insert) {
      props.insert(wrap(schema));
    } else {
      insertAdjacent(insertPosition, wrap(schema), { onSuccess });
    }
  };
  const renderItems = (items: any) => {
    return items?.map((item, indexA) => {
      if (item.type === 'divider') {
        return <Menu.Divider key={item.key || `item-${indexA}`} />;
      }
      if (item.type === 'item' && item.component) {
        const Component = findComponent(item.component);
        return (
          Component && (
            <SchemaInitializerItemContext.Provider
              key={`item-${indexA}`}
              value={{
                index: indexA,
                item,
                info: item,
                insert: insertSchema,
              }}
            >
              <Component
                {...item}
                item={{
                  ...item,
                  title: compile(item.title),
                }}
                insert={insertSchema}
              />
            </SchemaInitializerItemContext.Provider>
          )
        );
      }
      if (item.type === 'itemGroup') {
        return (
          !!item.children?.length && (
            <Menu.ItemGroup key={item.key || `item-group-${indexA}`} title={compile(item.title)}>
              {renderItems(item.children)}
            </Menu.ItemGroup>
          )
        );
      }
      if (item.type === 'subMenu') {
        return (
          !!item.children?.length && (
            <Menu.SubMenu key={item.key || `item-group-${indexA}`} title={compile(item.title)}>
              {renderItems(item.children)}
            </Menu.SubMenu>
          )
        );
      }
    });
  };
  const menu = <Menu>{renderItems(items)}</Menu>;

  if (!designable && props.designable !== true) {
    return null;
  }

  return (
    <Dropdown
      className={classNames('nb-schema-initializer-button')}
      openClassName={`nb-schema-initializer-button-open`}
      overlayClassName={classNames(
        'nb-schema-initializer-button-overlay',
        css`
          .ant-dropdown-menu-item-group-list {
            max-height: 40vh;
            overflow: auto;
          }
        `,
      )}
      visible={visible}
      onVisibleChange={(visible) => {
        setVisible(visible);
      }}
      {...dropdown}
      overlay={menu}
    >
      {component ? (
        component
      ) : (
        <Button
          type={'dashed'}
          style={{
            borderColor: '#f18b62',
            color: '#f18b62',
            ...style,
          }}
          {...others}
          icon={<Icon type={icon as string}/>}
        >
          {compile(props.children || props.title)}
        </Button>
      )}
    </Dropdown>
  );
});

SchemaInitializer.Item = (props: SchemaInitializerItemProps) => {
  const { index, info } = useContext(SchemaInitializerItemContext);
  const compile = useCompile();
  const { items = [], children = info?.title, icon, onClick, ...others } = props;
  if (items?.length > 0) {
    const renderMenuItem = (items: SchemaInitializerItemOptions[]) => {
      if (!items?.length) {
        return null;
      }
      return items.map((item, indexA) => {
        if (item.type === 'divider') {
          return <Menu.Divider key={`divider-${indexA}`} />;
        }
        if (item.type === 'itemGroup') {
          return (
            <Menu.ItemGroup
              // @ts-ignore
              eventKey={item.key || `item-group-${indexA}`}
              key={item.key || `item-group-${indexA}`}
              title={compile(item.title)}
            >
              {renderMenuItem(item.children)}
            </Menu.ItemGroup>
          );
        }
        if (item.type === 'subMenu') {
          return (
            <Menu.SubMenu
              // @ts-ignore
              eventKey={item.key || `sub-menu-${indexA}`}
              key={item.key || `sub-menu-${indexA}`}
              title={compile(item.title)}
            >
              {renderMenuItem(item.children)}
            </Menu.SubMenu>
          );
        }
        return (
          <Menu.Item
            eventKey={item.key}
            key={item.key}
            onClick={(info) => {
              onClick({ ...info, item });
            }}
          >
            {compile(item.title)}
          </Menu.Item>
        );
      });
    };
    return (
      // @ts-ignore
      <Menu.SubMenu eventKey={index} key={index} title={compile(children)} icon={icon}>
        {renderMenuItem(items)}
      </Menu.SubMenu>
    );
  }
  return (
    <Menu.Item
      eventKey={index}
      icon={icon}
      onClick={(opts) => {
        onClick({ ...opts, item: info });
      }}
      {...others}
    >
      {compile(children)}
    </Menu.Item>
  );
};

SchemaInitializer.itemWrap = (component?: SchemaInitializerItemComponent) => {
  return component;
};

SchemaInitializer.SwitchItem = (props) => {
  return (
    <SchemaInitializer.Item onClick={props.onClick}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {props.title} <Switch style={{ marginLeft: 20 }} size={'small'} checked={props.checked} />
      </div>
    </SchemaInitializer.Item>
  );
};
