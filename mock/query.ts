import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { successResp } from './_utils';

const requests: MockMethod[] = [
  {
    url: '/api/v1/mgdb/query',
    method: 'post',
    response: () => {
      return successResp({
        count: 500,
        data: Array(1)
          .fill(1)
          .map(() => {
            return {
              uuid: Random.uuid(),
              dbName: Random.name(),
              collectionName:Random.name(),
            };
          }),
      });
    },
  },
  {
    url: '/api/v1/mgdb/read',
    method: 'post',
    response: () => {
      return successResp({
        count: 500,
        data: Array(500)
          .fill(1)
          .map(() => {
            return {
              uuid: Random.uuid(),
              dbName: Random.name(),
              collectionName: Random.name(),
            };
          }),
      });
    },
  },
  {
    url: '/api/v1/mgdb/query',
    method: 'put',
    response: ({ query }: { query: any }) => {
      const size = +query.size;
      return successResp({
        count: Random.integer(100, 500),
        data: {
          'array|count': [Random.string],
        },
      });
    },
  },
  {
    url: '/api/v1/mgdb/query',
    method: 'delete',
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
