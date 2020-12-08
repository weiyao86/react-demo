
const model = {
  namespace: 'accountAssociated',

  state: {


    data: {},

    associates: [],
    loading: false,


  },

  reducers: {
    set(state, { payload }) {
      return { ...state, ...payload };
    },
    reset(state) {
      return { ...state, ...model.state };
    },

  },


  effects: {


    /* 编辑服务事业合伙人 */
    * cancelAccount({ payload, callback }, { call }) {
      const res = yield call(() => (setImmediate(() => console.log('setImmediate'))));
      callback && callback(res);
    }
  },
};
export default model;
