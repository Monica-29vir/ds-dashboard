import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { successResp } from './_utils';

const requests: MockMethod[] = [
  {
    url: '/api/v1/mgdb/meta/db',
    method: 'get',
    response: () => {
      return successResp({
        count: 500,
        //自定义-可修改
        data: Array(500)
          .fill(1)
          .map(() => {
            return {
              uuid: '@uuid',
              ip: Random.ip(),
              port: Random.integer(1000, 50000),
              username: Random.name(),
              export_port: Random.integer(1000, 50000),
              export_ip: Random.integer(1000, 50000),
            };
          }),
      });
    },
  },
  {
    url: '/api/v1/mgdb/meta/collection',
    method: 'get',
    response: () => {
      return successResp({
        count: Random.integer(100, 500),
        data: {
          'array|count': [Random.string],
        },
      });
    },
  },
  {
    url: '/api/v1/mgdb/meta/doc',
    method: 'get',
    response: () => {
      return successResp({
        count: Random.integer(100, 500),
        data: {
          'array|count': [Random.string],
        },
      });
    },
  },
  {
    url: '/api/v1/mgdb/meta/index',
    method: 'get',
    response: () => {
      return successResp({
        count: Random.integer(100, 500),
        data: {
          'array|count': [Random.string],
        },
      });
    },
  },
  {
    url: '/api/v1/mgdb/meta/attr',
    method: 'get',
    response: () => {
      return successResp({
        count: Random.integer(100, 500),
        data: {
          'array|count': [Random.string],
        },
      });
    },
  },
];

export default requests;
