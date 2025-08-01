import { request } from '@/utils';

// TODO: 请求用户信息
export const fetchUserInfo = async () => {
  // return request('/user/info');
};

export interface UserInfo {
  uid: string;
  //   ...
}
