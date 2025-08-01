/**
 * 环境判断
 */

export enum NodeEnv {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Preview = 'preview'
}

// dev env
export const NODE_ENV = process.env.NODE_ENV as NodeEnv;

export const isDev = NODE_ENV === NodeEnv.Development;
export const isProd = NODE_ENV === NodeEnv.Production;
