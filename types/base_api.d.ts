import { RESPONSE_CODE } from '../enums';

export interface BASE_RESP<T> {
  code: RESPONSE_CODE;
  data: T;
  msg: string;
  [key: string]: unknown;
}
