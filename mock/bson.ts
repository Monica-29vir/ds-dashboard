import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { successResp } from './_utils';

const requests: MockMethod[] = [
  {
    url: '/api/v1/bson',
    method: 'post',
    response: ({ query }: { query: any }) => {
      const size = +query.size;
      return successResp({
        data: {
          document: Random.string,
        },
      });
    },
  },
];

export default requests;
