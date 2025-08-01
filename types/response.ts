export enum RESPONSE_CODE {
  /** 成功 */
  SUCCESS = 200,

  /** 客户端错误 */
  CLIENT_ERROR = 400,

  /** 服务器内部错误 */
  SERVER_ERROR = 500,
}

// TODO: 完善基础类型
export interface BASE_RESP<T> {
  code: RESPONSE_CODE;
  data: T;
  msg: string;
  [key: string]: unknown;
}
