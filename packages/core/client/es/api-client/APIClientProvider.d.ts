import React from 'react';
import { APIClient } from './APIClient';
export interface APIClientProviderProps {
    apiClient: APIClient;
}
export declare const APIClientProvider: React.FC<APIClientProviderProps>;
