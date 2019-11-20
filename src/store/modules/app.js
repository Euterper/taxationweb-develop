const app = {
    state: {
      
    },
    mutations: {
      SET_ONXHR: state => {
        state.onXHR = true;
      },
      SET_NOTXHR: state => {
        state.onXHR = false;
      },
    }
  };
  
  export default app;