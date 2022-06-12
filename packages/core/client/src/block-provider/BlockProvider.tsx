import { Field } from '@formily/core';
import { useField } from '@formily/react';
import { useRequest } from 'ahooks';
import template from 'lodash/template';
import React, { createContext, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ACLCollectionProvider, TableFieldResource, useAPIClient, useRecord } from '../';
import { CollectionProvider, useCollection, useCollectionManager } from '../collection-manager';
import { useRecordIndex } from '../record-provider';

export const BlockResourceContext = createContext(null);
export const BlockAssociationContext = createContext(null);
const BlockRequestContext = createContext(null);

export const useBlockResource = () => {
  return useContext(BlockResourceContext);
};

interface UseReousrceProps {
  resource: any;
  association?: any;
  useSourceId?: any;
  block?: any;
}

const useAssociation = (props) => {
  const { association } = props;
  const { getCollectionField } = useCollectionManager();
  if (typeof association === 'string') {
    return getCollectionField(association);
  } else if (association?.collectionName && association?.name) {
    return getCollectionField(`${association?.collectionName}.${association?.name}`);
  }
};

const useReousrce = (props: UseReousrceProps) => {
  const { block, resource, useSourceId } = props;
  const record = useRecord();
  const api = useAPIClient();
  const association = useAssociation(props);
  const sourceId = useSourceId?.();
  const field = useField<Field>();
  if (block === 'TableField') {
    const options = {
      field,
      api,
      resource,
      sourceId: sourceId || record[association?.sourceKey || 'id'],
    };
    return new TableFieldResource(options);
  }
  const __parent = useContext(BlockRequestContext);
  if (__parent?.block === 'TableField' && __parent?.resource instanceof TableFieldResource) {
    return __parent.resource;
  }
  if (!association) {
    return api.resource(resource);
  }
  if (sourceId) {
    return api.resource(resource, sourceId);
  }
  return api.resource(resource, record[association?.sourceKey || 'id']);
};

const useActionParams = (props) => {
  const { useParams } = props;
  const params = useParams?.() || {};
  return { ...props.params, ...params };
};

export const useResourceAction = (props, opts = {}) => {
  const { resource, action } = props;
  const { fields } = useCollection();
  const appends = fields?.filter((field) => field.target).map((field) => field.name);
  const params = useActionParams(props);
  if (appends?.length) {
    params['appends'] = appends;
  }
  const result = useRequest(
    (params) => (action ? resource[action](params).then((res) => res.data) : Promise.resolve({})),
    {
      ...opts,
      defaultParams: [params],
    },
  );
  return result;
};

const MaybeCollectionProvider = (props) => {
  const { collection } = props;
  return collection ? (
    <CollectionProvider collection={collection}>
      <ACLCollectionProvider>{props.children}</ACLCollectionProvider>
    </CollectionProvider>
  ) : (
    <>{props.children}</>
  );
};

const BlockRequestProvider = (props) => {
  const field = useField();
  const resource = useBlockResource();
  const service = useResourceAction(
    { ...props, resource },
    {
      ...props.requestOptions,
    },
  );
  const __parent = useContext(BlockRequestContext);
  return (
    <BlockRequestContext.Provider value={{ block: props.block, props, field, service, resource, __parent }}>
      {props.children}
    </BlockRequestContext.Provider>
  );
};

export const useBlockRequestContext = () => {
  return useContext(BlockRequestContext);
};

export const BlockProvider = (props) => {
  const { collection, association } = props;
  const resource = useReousrce(props);
  return (
    <MaybeCollectionProvider collection={collection}>
      <BlockAssociationContext.Provider value={association}>
        <BlockResourceContext.Provider value={resource}>
          <BlockRequestProvider {...props}>{props.children}</BlockRequestProvider>
        </BlockResourceContext.Provider>
      </BlockAssociationContext.Provider>
    </MaybeCollectionProvider>
  );
};

export const useBlockAssociationContext = () => {
  return useContext(BlockAssociationContext);
};

export const useFilterByTk = () => {
  const { resource, __parent } = useContext(BlockRequestContext);
  const recordIndex = useRecordIndex();
  const record = useRecord();
  const collection = useCollection();
  const { getCollectionField } = useCollectionManager();
  const assoc = useContext(BlockAssociationContext);
  if (resource instanceof TableFieldResource || __parent?.block === 'TableField') {
    return recordIndex;
  }
  if (assoc) {
    const association = getCollectionField(assoc);
    return record?.[association.targetKey || 'id'];
  }
  return record?.[collection.filterTargetKey || 'id'];
};

export const useSourceIdFromRecord = () => {
  const record = useRecord();
  const { getCollectionField } = useCollectionManager();
  const assoc = useContext(BlockAssociationContext);
  if (assoc) {
    const association = getCollectionField(assoc);
    return record?.[association.sourceKey || 'id'];
  }
};

export const useSourceIdFromParentRecord = () => {
  const record = useRecord();
  const { getCollectionField } = useCollectionManager();
  const assoc = useContext(BlockAssociationContext);
  if (assoc) {
    const association = getCollectionField(assoc);
    return record?.__parent?.[association.sourceKey || 'id'];
  }
};

export const useParamsFromRecord = () => {
  const filterByTk = useFilterByTk();
  return {
    filterByTk: filterByTk,
  };
};

export const RecordLink = (props) => {
  const field = useField();
  const record = useRecord();
  const { title, to, ...others } = props;
  const compiled = template(to || '');
  return (
    <Link {...others} to={compiled({ record: record || {} })}>
      {field.title}
    </Link>
  );
};
