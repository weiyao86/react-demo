import resolve from "resolve";

const model = {
  namespace: 'globalModel',
  state: {},
  reducers: {
    set(state, { payload }) {
      return { ...state }
    }
  },

  effects: {

    * init({ payload }, { call, put, select }) {
      let rst = yield call(() => {
        new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve("success");
          }, 3000);
        });
      });

      alert(rst);
    }
  }
};

export default model;