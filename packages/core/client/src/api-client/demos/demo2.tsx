import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import { APIClient, APIClientProvider, useRequest, compose } from '@znewbee/client';

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
    url: 'users:get',
    method: 'get',
  });
  return <div>{data?.data?.name}</div>;
});
