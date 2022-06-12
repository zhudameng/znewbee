import { useField, useFieldSchema, useForm } from '@formily/react';
import { message, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useCollection } from '../../collection-manager';
import { useRecord } from '../../record-provider';
import { useActionContext, useCompile } from '../../schema-component';
import { useCurrentUserContext } from '../../user';
import { useBlockRequestContext, useFilterByTk } from '../BlockProvider';
import { useDetailsBlockContext } from '../DetailsBlockProvider';
import { TableFieldResource } from '../TableFieldProvider';

export const usePickActionProps = () => {
  const form = useForm();
  return {
    onClick() {
      console.log('usePickActionProps', form.values);
    },
  };
};

function isURL(string) {
  let url;

  try {
    url = new URL(string);
  } catch (e) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
}

const filterValue = (value) => {
  if (typeof value !== 'object') {
    return value;
  }
  if (!value) {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((v) => filterValue(value));
  }
  const obj = {};
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      const val = value[key];
      if (Array.isArray(val) || (val && typeof val === 'object')) {
        continue;
      }
      obj[key] = val;
    }
  }
  return obj;
};

export const useCreateActionProps = () => {
  const form = useForm();
  const { field, resource, __parent } = useBlockRequestContext();
  const { visible, setVisible } = useActionContext();
  const history = useHistory();
  const { t } = useTranslation();
  const actionSchema = useFieldSchema();
  const actionField = useField();
  const { fields, getField } = useCollection();
  const compile = useCompile();
  return {
    async onClick() {
      const fieldNames = fields.map((field) => field.name);
      const { assignedValues, onSuccess, overwriteValues, skipValidator } = actionSchema?.['x-action-settings'] ?? {};

      if (!skipValidator) {
        await form.submit();
      }
      let values = {};
      for (const key in form.values) {
        if (fieldNames.includes(key)) {
          const items = form.values[key];
          const collectionField = getField(key);
          if (collectionField.interface === 'linkTo') {
            const targetKey = collectionField.targetKey || 'id';
            if (resource instanceof TableFieldResource) {
              if (Array.isArray(items)) {
                values[key] = filterValue(items);
              } else if (items && typeof items === 'object') {
                values[key] = filterValue(items);
              } else {
                values[key] = items;
              }
            } else {
              if (Array.isArray(items)) {
                values[key] = items.map((item) => item[targetKey]);
              } else if (items && typeof items === 'object') {
                values[key] = items[targetKey];
              } else {
                values[key] = items;
              }
            }
          } else {
            values[key] = form.values[key];
          }
        } else {
          values[key] = form.values[key];
        }
      }
      actionField.data = field.data || {};
      actionField.data.loading = true;
      await resource.create({
        values: {
          ...values,
          ...overwriteValues,
          ...assignedValues,
        },
      });
      actionField.data.loading = false;
      __parent?.service?.refresh?.();
      setVisible?.(false);
      if (!onSuccess?.successMessage) {
        return;
      }
      if (onSuccess?.manualClose) {
        Modal.success({
          title: compile(onSuccess?.successMessage),
          onOk: async () => {
            await form.reset();
            if (onSuccess?.redirecting && onSuccess?.redirectTo) {
              if (isURL(onSuccess.redirectTo)) {
                window.location.href = onSuccess.redirectTo;
              } else {
                history.push(onSuccess.redirectTo);
              }
            }
          },
        });
      } else {
        message.success(compile(onSuccess?.successMessage));
      }
    },
  };
};

export const useCustomizeUpdateActionProps = () => {
  const { resource, __parent, service } = useBlockRequestContext();
  const filterByTk = useFilterByTk();
  const actionSchema = useFieldSchema();
  const currentRecord = useRecord();
  const ctx = useCurrentUserContext();
  const history = useHistory();
  const compile = useCompile();
  const form = useForm();

  return {
    async onClick() {
      const { assignedValues, onSuccess, skipValidator } = actionSchema?.['x-action-settings'] ?? {};
      if (skipValidator === false) {
        await form.submit();
      }
      await resource.update({
        filterByTk,
        values: { ...assignedValues },
      });
      service?.refresh?.();
      if (!(resource instanceof TableFieldResource)) {
        __parent?.service?.refresh?.();
      }
      if (!onSuccess?.successMessage) {
        return;
      }
      if (onSuccess?.manualClose) {
        Modal.success({
          title: compile(onSuccess?.successMessage),
          onOk: async () => {
            if (onSuccess?.redirecting && onSuccess?.redirectTo) {
              if (isURL(onSuccess.redirectTo)) {
                window.location.href = onSuccess.redirectTo;
              } else {
                history.push(onSuccess.redirectTo);
              }
            }
          },
        });
      } else {
        message.success(compile(onSuccess?.successMessage));
      }
    },
  };
};

export const useUpdateActionProps = () => {
  const form = useForm();
  const filterByTk = useFilterByTk();
  const { field, resource, __parent } = useBlockRequestContext();
  const { setVisible } = useActionContext();
  const actionSchema = useFieldSchema();
  const history = useHistory();
  const { fields, getField } = useCollection();
  const compile = useCompile();
  const actionField = useField();
  return {
    async onClick() {
      const { assignedValues, onSuccess, overwriteValues, skipValidator } = actionSchema?.['x-action-settings'] ?? {};

      if (!skipValidator) {
        await form.submit();
      }
      const fieldNames = fields.map((field) => field.name);
      let values = {};
      for (const key in form.values) {
        if (fieldNames.includes(key)) {
          const collectionField = getField(key);
          if (collectionField.interface === 'subTable') {
            values[key] = form.values[key];
            continue;
          }
          if (field.added && !field.added.has(key)) {
            continue;
          }
          const items = form.values[key];
          if (collectionField.interface === 'linkTo') {
            const targetKey = collectionField.targetKey || 'id';
            if (resource instanceof TableFieldResource) {
              if (Array.isArray(items)) {
                values[key] = filterValue(items);
              } else if (items && typeof items === 'object') {
                values[key] = filterValue(items);
              } else {
                values[key] = items;
              }
            } else {
              if (Array.isArray(items)) {
                values[key] = items.map((item) => item[targetKey]);
              } else if (items && typeof items === 'object') {
                values[key] = items[targetKey];
              } else {
                values[key] = items;
              }
            }
          } else {
            values[key] = form.values[key];
          }
        } else {
          values[key] = form.values[key];
        }
      }
      actionField.data = field.data || {};
      actionField.data.loading = true;
      await resource.update({
        filterByTk,
        values: {
          ...values,
          ...overwriteValues,
          ...assignedValues,
        },
      });
      actionField.data.loading = false;
      __parent?.service?.refresh?.();
      if (!(resource instanceof TableFieldResource)) {
        __parent?.__parent?.service?.refresh?.();
      }
      setVisible?.(false);
      if (!onSuccess?.successMessage) {
        return;
      }
      if (onSuccess?.manualClose) {
        Modal.success({
          title: compile(onSuccess?.successMessage),
          onOk: async () => {
            await form.reset();
            if (onSuccess?.redirecting && onSuccess?.redirectTo) {
              if (isURL(onSuccess.redirectTo)) {
                window.location.href = onSuccess.redirectTo;
              } else {
                history.push(onSuccess.redirectTo);
              }
            }
          },
        });
      } else {
        message.success(compile(onSuccess?.successMessage));
      }
    },
  };
};

export const useDestroyActionProps = () => {
  const filterByTk = useFilterByTk();
  const { resource, service } = useBlockRequestContext();
  return {
    async onClick() {
      await resource.destroy({
        filterByTk,
      });
      service?.refresh?.();
    },
  };
};

export const useBulkDestroyActionProps = () => {
  const { field } = useBlockRequestContext();
  const { resource, service } = useBlockRequestContext();
  return {
    async onClick() {
      if (!field?.data?.selectedRowKeys?.length) {
        return;
      }
      await resource.destroy({
        filterByTk: field.data?.selectedRowKeys,
      });
      field.data.selectedRowKeys = [];
      service?.refresh?.();
    },
  };
};

export const useDetailsPaginationProps = () => {
  const ctx = useDetailsBlockContext();
  const count = ctx.service?.data?.meta?.count || 0;
  return {
    simple: true,
    hidden: count <= 1,
    current: ctx.service?.data?.meta?.page || 1,
    total: count,
    pageSize: 1,
    async onChange(page) {
      const params = ctx.service?.params?.[0];
      ctx.service.run({ ...params, page });
    },
    style: {
      marginTop: 24,
      textAlign: 'center',
    },
  };
};
