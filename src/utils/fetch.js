import axios from 'axios'
// 从 mint-ui 中导入组件
// import { Indicator } from 'mint-ui'
// import 'mint-ui/lib/style.css'//mintUI样式
// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
     timeout: 10000                  // 请求超时时间
  })
  
  // request拦截器
  service.interceptors.request.use(config => {
    console.log(config,'config')
    if (config.method === 'get') {
      // if (!request.needLoading) {
      // 所有请求发送之前, 都要执行该函数
      // Indicator.open({
      //   text: '数据加载中...',
      //   spinnerType: 'fading-circle'
      // })
    }
    // Do something before request is sent
    store.commit('SET_ONXHR')
    // if (store.getters.token) {
    //   config.headers['Authorization'] = store.getters.token; // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    // }
    return config
  }, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  })
  
  // respone拦截器
  service.interceptors.response.use(
    response => {
      console.log('response;',response)
      if (response.config.method === 'get') {
        // 所有请求完成之后, 都要执行该函数
        // Indicator.close()
      }
      store.commit('SET_NOTXHR')
      return response
    },
    error => {
      store.commit('SET_NOTXHR')
      console.log(process.env.BASE_API)
      console.log('fetch ERR')
      console.log(error)
  
      if (typeof error.response.data.description === 'string') {
        Message({
          message: error.response.data.description,
          type: 'error',
        })
      } else {
        Message({
          message: error.response.data.description[0],
          type: 'error',
        })
      }
      return Promise.reject(error)
    }
  )
  
  export default service
  