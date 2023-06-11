import axiosClient from './axiosClient';
import { UserLoginDto } from '@/types/src';

export const login = async (userInfo: UserLoginDto) => {
  const res = await axiosClient.post('/user/login', userInfo);
  return res.data;
};
