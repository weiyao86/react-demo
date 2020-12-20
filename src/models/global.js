
const model = {
  namespace: 'globalModel',
  state: {
    globalState: 'globalState',
  },
  reducers: {
    set(state, {payLoad}) {
      return {...state, ...payLoad};
    },

    add(state, {payLoad}) {
      return {
        ...state, ...{globalState: payLoad.n},
      };
    },
  },

  effects: {

    * test({payLoad}, {call, put, select}) {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve('调用==action==成功，返回--success'), 3000);
      });
    },

    * init({payLoad, cb}, {call, put, select}) {
      const rst = yield put.resolve({type: 'test'});
      yield put({type: 'add', payLoad: {n: '通过put改变state'}});
      // eslint-disable-next-line no-alert
      alert(`调用put.resolve返回：${rst}***${payLoad.name}***${payLoad.age}`);
      yield select((state) => {
        typeof cb === 'function' && cb.call(null, state);
      });
      return rst;
    },
  },
};

export default model;
