import { css } from '@emotion/css';
import { createForm, Field, Form } from '@formily/core';
import { observer, useField, useFieldSchema, useForm } from '@formily/react';
import { Button, Popover, Space } from 'antd';
import React, { createContext, useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormProvider, SchemaComponent } from '../../core';
import { useDesignable } from '../../hooks';
import { useProps } from '../../hooks/useProps';
import { Action } from '../action';

export const FilterActionContext = createContext<any>(null);

export const FilterAction = observer((props: any) => {
  const { t } = useTranslation();
  const field = useField<Field>();
  const [visible, setVisible] = useState(false);
  const { designable, dn } = useDesignable();
  const fieldSchema = useFieldSchema();
  const form = useMemo<Form>(() => props.form || createForm(), []);
  const { options, onSubmit, onReset, ...others } = useProps(props);
  return (
    <FilterActionContext.Provider value={{ field, fieldSchema, designable, dn }}>
      <Popover
        destroyTooltipOnHide
        placement={'bottomLeft'}
        visible={visible}
        onVisibleChange={(visible) => {
          setVisible(visible);
        }}
        trigger={'click'}
        content={
          <form>
            <FormProvider form={form}>
              <SchemaComponent
                schema={{
                  type: 'object',
                  properties: {
                    filter: {
                      type: 'string',
                      enum: options || field.dataSource,
                      default: fieldSchema.default,
                      'x-component': 'Filter',
                      'x-component-props': {},
                    },
                  },
                }}
              />
              <div
                className={css`
                  display: flex;
                  justify-content: flex-end;
                  width: 100%;
                `}
              >
                <Space>
                  <SaveConditions />
                  <Button
                    onClick={async () => {
                      await form.reset();
                      onReset?.(form.values);
                      field.title = t('Filter');
                      setVisible(false);
                    }}
                  >
                    {t('Reset')}
                  </Button>
                  <Button
                    type={'primary'}
                    htmlType={'submit'}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onSubmit?.(form.values);
                      setVisible(false);
                    }}
                  >
                    {t('Submit')}
                  </Button>
                </Space>
              </div>
            </FormProvider>
          </form>
        }
      >
        <Action {...others} title={field.title} />
      </Popover>
    </FilterActionContext.Provider>
  );
});

const SaveConditions = () => {
  const { fieldSchema, field, designable, dn } = useContext(FilterActionContext);
  const form = useForm();
  const { t } = useTranslation();
  if (!designable) {
    return null;
  }
  return (
    <Button
      type={'dashed'}
      className={css`
        border-color: rgb(241, 139, 98);
        color: rgb(241, 139, 98);
      `}
      onClick={() => {
        const defaultValue = { ...form.values.filter };
        fieldSchema.default = defaultValue;
        dn.emit('patch', {
          schema: {
            'x-uid': fieldSchema['x-uid'],
            default: defaultValue,
          },
        });
        dn.refresh();
      }}
    >
      {t('Save conditions')}
    </Button>
  );
};
