interface HttpRequest {
  url: string;
  params?: unknown;
  body?: null;
  methods?: any;
}

const request = async (obj: HttpRequest): Promise<void> => {
  const res = new Promise<void>((resolve, reject): void => {
    void useFetch(obj.url, {
      method: obj.methods ?? 'GET',
      query: obj.params ?? undefined,
      body: obj.body ?? undefined,
      baseURL: '/api', // 跨域处理用

      onRequest({ request, options }) {
        /* 设置请求头 */
        const userStore = useUserStore();
        const token = userStore.token;

        if (token !== '') {
          options.headers = {
            ...options.headers,
            Authorization: token
          };
        } else {
          options.headers = {
            ...options.headers
          };
        }
      },

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

  await res;
};

interface Http {
  get: <t>(url: string, params?: any) => Promise<t>;
  post: <t>(url: string, body?: any) => Promise<t>;
}

export const http: Http = {
  async get(url, params) {
    return await new Promise((resolve, reject) => {
      request({ url, params, methods: 'GET' })
        .then((res) => {
          resolve(res as any);
          return res;
        })
        .catch((err) => {
          reject(err);
          throw err;
        });
    });
  },
  async post(url, body) {
    return await new Promise((resolve, reject) => {
      request({ url, body, methods: 'POST' })
        .then((res) => {
          resolve(res as any);
          return res;
        })
        .catch((err) => {
          reject(err);
          throw err;
        });
    });
  }
};

export default http;
