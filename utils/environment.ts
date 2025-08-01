/**
 * 环境判断
 */

export enum NodeEnv {
  /** 开发环境 */
  Development = 'dev',
  /** 生产环境 */
  Production = 'prod',
  /** 测试环境 */
  Test = 'test',
  /** 预发环境 */
  Preview = 'preview'
}

// dev env
export const NODE_ENV = process.env.NEXT_PUBLIC_ENV as NodeEnv;

/** 开发环境 */
export const isDev = NODE_ENV === NodeEnv.Development;

/** 生产环境 */
export const isProd = NODE_ENV === NodeEnv.Production;

/** 测试环境 */
export const isTest = NODE_ENV === NodeEnv.Test;
