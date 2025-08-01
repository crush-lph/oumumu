import { Cookies } from 'react-cookie';

import axios, { AxiosRequestConfig } from 'axios';

import { Language, LANGUAGE_HEADER_KEY_MAP } from '@/shared/language';
import type { BASE_RESP } from '@/types';

import { removeEmpty } from './removeEmpty';
import clientCrypt from './cryptParams.client';
import { isDev } from './environment';

const { cookies, headers: serverHeaders } = require('next/headers');
const { myCrypt } = require('./cryptParams.ts');

const isClient = typeof window !== 'undefined';

const baseURL = isClient ? '/' : process.env.NEXT_PUBLIC_BASE_URL || 'https://oumomo.ai';

export const request = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  // baseURL: '/_next',
  timeout: 100000,
  maxRedirects: 1
});

const isModalOpen = false;

// ============================== 请求拦截器 ==============================
request.interceptors.request.use(
  (config) => {
    // if (config.url && config.url.startsWith('api/setting/configs')) {
    //   config.baseURL = 'https://api.test.yoofinds.com';
    // }
    // console.log('config', config);
    const { params, data, headers, url } = config;
    const paramsWithTime = removeEmpty({
      ...params,
      _time: Math.floor(Date.now() / 1000),
      cnonce: Math.floor(10000000 + Math.random() * 90000000)
    });
    const bodyStr = data ? JSON.stringify(data) : '';
    const sign = isClient
      ? clientCrypt.encryptParams({ ...paramsWithTime }, bodyStr)
      : myCrypt.encryptParams({ ...paramsWithTime }, bodyStr);

    if (url?.startsWith('http://') || url?.startsWith('https://')) {
      config.baseURL = ''; // 清空 baseURL
    }

    // 验证请求来源的host
    if (!isClient) {
      const h = serverHeaders();
      const host = h.get('host') || h.get('x-forwarded-host');
      if (host && !host.includes('fastmoss.com') && !isDev) {
        throw new Error('非法请求来源: ' + host);
      }
    }
    // 添加、获取cookie信息
    let locale: Language, region, ssrDebug, ssrDebugAll;
    if (typeof window !== 'undefined') {
      const pathname = window?.location?.pathname ?? '';
      const cookieStore = new Cookies();
      const allCookies = cookieStore.getAll();
      region = cookieStore.get('region');
      const islogin = cookieStore.get('fd_tk');
      locale = cookieStore.get('NEXT_LOCALE');

      if (!islogin) {
        // window.alert('not login');
      }
    } else {
      const h = serverHeaders();
      const cookieStore = cookies();
      const allCookies = cookieStore.getAll();
      region = cookieStore.get('region')?.value;

      locale = cookieStore.get('NEXT_LOCALE')?.value;

      headers['user-agent'] = h.get('user-agent');
      headers['referer'] = h.get('referer');
      if (isDev) {
        headers['referer'] = 'localhost';
      }
      headers['x-forwarded-for'] = h.get('x-forwarded-for');
      headers['x-real-ip'] = h.get('x-real-ip');
      // headers['x-forwarded-proto'] = h.get('x-forwarded-proto');
      headers['x-forwarded-host'] = h.get('x-forwarded-host');

      headers.Cookie = allCookies
        ?.map((item: any) => {
          return `${item.name}=${item.value}`;
        })
        .join('; ');
    }

    headers['region'] = region || 'US';

    headers['lang'] = LANGUAGE_HEADER_KEY_MAP[locale] || 'EN_US';
    headers['source'] = 'pc';

    if (sign && !url?.includes('https://')) {
      headers['fm-sign'] = sign;
    }
    return {
      ...config,
      params: paramsWithTime
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ============================== 响应拦截器 ==============================
request.interceptors.response.use(
  (response) => {
    const { data, config } = response;
    const { code, message } = data;

    const { url } = config;
    return data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ============================ 请求方法 ============================

/**
 *  get请求 第一个泛型参数是返回值类型  第二个泛型参数是参数类型
 * @param url 请求url
 * @param params 请求参数
 * @param config 请求配置  axios
 */
export const get = async <T extends unknown = any, P extends unknown = any>(
  url: string,
  params?: P,
  config?: AxiosRequestConfig
) => {
  return request<T, BASE_RESP<T>>({ method: 'get', url, params, ...config });
};

/**
 * post 请求
 * @param url 请求url
 * @param data 请求参数
 * @param config
 */
export const post = async <T extends unknown, P extends unknown = any>(
  url: string,
  data?: P,
  config?: AxiosRequestConfig
) => {
  return request<any, BASE_RESP<T>, any>({
    method: 'post',
    url,
    data,
    ...config
  });
};

export default {
  get,
  post,
  request
};
