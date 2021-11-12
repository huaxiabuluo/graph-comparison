import { notification } from 'antd';
import axios from 'axios';

interface FetchOption {
  method?: 'get' | 'post';
  data?: { [k: string]: any };
}

const fetcher = async (api: string, option: FetchOption = { method: 'get' }) => {
  const io = option.method === 'get' ? axios.get : axios.post;
  try {
    const res = await io(api, option.data);
    return res?.data?.result || null;
  } catch (err) {
    console.error(api, err);
    notification.error({
      message: api,
      description: `${err.message}`,
      placement: 'topRight',
    });
    return null;
  }
};

export const getSceneList = () => fetcher('/api/scene/query/19');
