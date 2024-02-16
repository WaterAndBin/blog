interface HttpRequest {
  url: string;
  params?: any;
  body?: any;
  methods?: any;
}

const request = (obj: HttpRequest): any => {
  const res = new Promise<void>((resolve, reject) => {
    useFetch(obj.url, {
      method: obj.methods ?? 'GET',
      query: obj.params ?? undefined,
      body: obj.body ?? undefined,
      baseURL: '/api',

      onRequestError({ request, options, error }) {
        /* 处理错误请求 */
        console.log('请求失败了');
        reject(error);
      },

      onResponse({ request, response, options }) {
        /* 处理响应数据 */
        console.log('请求成功');
        resolve(response._data);
      },

      onResponseError({ request, response, options }) {
        /* 处理响应错误 */
        console.log('处理响应错误');
        reject(response);
      }
    });
  });
  console.log(res);
  return res;
};

interface Http {
  get: <t>(url: string, params?: any) => Promise<t>;
  post: <t>(url: string, body?: any) => Promise<t>;
}

export const http: Http = {
  async get(url, params) {
    return await new Promise((resolve, reject) => {
      request({ url, params, methods: 'GET' })
        .then((res: any) => {
          resolve(res);
          return res;
        })
        .catch((err: any) => {
          reject(err);
          throw err;
        });
    });
  },
  async post(url, body) {
    return await new Promise((resolve, reject) => {
      request({ url, body, methods: 'POST' })
        .then((res: any) => {
          resolve(res);
          return res;
        })
        .catch((err: any) => {
          reject(err);
          throw err;
        });
    });
  }
};

export default http;
