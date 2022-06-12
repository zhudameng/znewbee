import { createContext } from 'react';
import { APIClient } from './APIClient';
export var APIClientContext = /*#__PURE__*/createContext(new APIClient());