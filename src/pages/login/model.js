const model = {

  namespace: 'loginModelTest',

  state: {
    loading: false,
    data: {},
  },

  reducers: {
    set(state, {payload}) {
      return {...state, ...payload};
    },
  },

  effects: {
    * login({payload, callback}, {call, select, put}) {
      const submitRst = yield call(() => setTimeout(() => 'test result!', 16));

      if (submitRst.code === 200) {
        // success
        return submitRst;
      }
      return 'error';
    },
  },
};
export default model;
