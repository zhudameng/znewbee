import { useContext } from 'react';
import { APIClientContext } from '../context';
export function useResource(name, of) {
  var apiClient = useContext(APIClientContext);
  return apiClient.resource(name, of);
}