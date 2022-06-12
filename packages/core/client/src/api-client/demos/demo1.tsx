import { APIClient, APIClientProvider, compose, useRequest } from '@znewbee/client';
import MockAdapter from 'axios-mock-adapter';
import React from 'react';

const apiClient = new APIClient();

const mock = new MockAdapter(apiClient.axios);

mock.onGet('/users:get').reply(200, {
  data: { id: 1, name: 'John Smith' },
});

const providers = [
  [APIClientProvider, { apiClient }]
];

export default compose(...providers)(() => {
  const { data } = useRequest({
    resource: 'users',
    action: 'get',
    params: {},
  });
  return <div>{data?.data?.name}</div>;
});
