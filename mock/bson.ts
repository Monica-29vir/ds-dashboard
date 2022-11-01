import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { successResp } from './_utils';

const requests: MockMethod[] = [
  {
    url: '/api/v1/execute/bson',
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
            };
          }),
      });
    },
  },
];

export default requests;
