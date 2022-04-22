import axios from "axios";
import qs from "qs";
import { uuid } from "./encrypt";

axios.defaults.withCredentials = true; // 是否允许跨域
axios.defaults.timeout = 20000;
axios.defaults.baseURL =
  import.meta.env.VITE_BASE_URL + import.meta.env.VITE_BASE_PATH;
axios.defaults.validateStatus = (status) => true;
/**
 * 请求工具类
 */
const remote = {
  postForm: async function (option) {
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    option = Object.assign({}, Utils.defaultOption, postOptions, option);
    return await this.request(option);
  },

  postJson: async function (option) {
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      transformRequest: [
        (data) => {
          return JSON.stringify(data);
        },
      ],
    };
    option = Object.assign({}, Utils.defaultOption, postOptions, option);
    return await this.request(option);
  },

  postFile: async function (option) {
    const uploadOptions = {
      method: "POST",
      transformRequest: [],
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    option = Object.assign({}, Utils.defaultOption, uploadOptions, option);
    return await this.request(option);
  },

  exportStream: async function (option) {
    const exportOptions = {
      method: "POST",
      responseType: "blob",
      fileMime: "application/vnd.ms-excel",
      intercept: false,
    };
    option = Object.assign({}, Utils.defaultOption, exportOptions, option);
    return axios.request(option).then((res) => {
      const link = document.createElement("a");
      let blob = new Blob([res.data], { type: option.fileMime });
      link.style.display = "none";
      link.href = URL.createObjectURL(blob);
      let header =
        res.headers["content-disposition"] ||
        res.headers["Content-Disposition"];
      let fileName;
      if (header) {
        try {
          fileName = decodeURIComponent(header.split(";")[1].split("=")[1]);
        } catch (e) {
          console.error(e);
          fileName = `${uuid()}.xlsx`;
        }
      } else {
        fileName = `${uuid()}.xlsx`;
      }
      link.download = fileName || option.fileName; //下载后文件名
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  },

  get: async function (option) {
    const getOptions = {
      method: "GET",
      headers: {},
    };
    option = Object.assign({}, Utils.defaultOption, getOptions, option);
    return await this.request(option);
  },
  request: async function (option) {
    const axiosInstance = axios.create();
    this.interceptors(axiosInstance, option);
    try {
      //首先使用option中的loading拦截
      if (option.startLoading && option.startLoading instanceof Function) {
        option.startLoading(option);
      } else {
        Utils.startLoading(option);
      }
      const cache = Utils.onCacheRetrieve(option);
      if (cache) {
        return cache;
      }
      return await axiosInstance.request({
        ...option,
      });
    } finally {
      //首先使用option中的loading拦截
      if (option.stopLoading && option.stopLoading instanceof Function) {
        option.stopLoading(option);
      } else {
        Utils.stopLoading(option);
      }
    }
  },

  interceptors(instance, option) {
    // 请求拦截
    instance.interceptors.request.use(
      async (config) => {
        //首先使用option中的请求拦截
        if (
          option.onInterceptRequest &&
          option.onInterceptRequest instanceof Function
        ) {
          return option.onInterceptRequest(option);
        }
        return Utils.onInterceptRequest(config, option);
      },
      (error) => {
        let tryGetError =
          option.onInterceptRejectedRequest &&
          option.onInterceptRejectedRequest(error, option);
        return Promise.reject(
          tryGetError || Utils.onInterceptRejectedResponse(error, option)
        );
      }
    );
    // 响应拦截
    instance.interceptors.response.use(
      async (axiosResponse) => {
        //首先使用option中的响应拦截
        if (
          option.onInterceptResponse &&
          option.onInterceptResponse instanceof Function
        ) {
          return option.onInterceptResponse(option);
        }
        return Utils.onInterceptResponse(axiosResponse, option);
      },
      (error) => {
        let tryGetError =
          option.onInterceptRejectedResponse &&
          option.onInterceptRejectedResponse(error, option);
        return Promise.reject(
          tryGetError || Utils.onInterceptRejectedResponse(error, option)
        );
      }
    );
  },

  init({
    onCacheRetrieve,
    onInterceptRequest,
    onInterceptResponse,
    onInterceptRejectedRequest,
    onInterceptRejectedResponse,
    startLoading,
    stopLoading,
    defaultOption,
  }) {
    Utils.onInterceptResponse =
      onInterceptResponse || Utils.onInterceptResponse;
    Utils.onCacheRetrieve = onCacheRetrieve || Utils.onCacheRetrieve;
    Utils.onInterceptRequest = onInterceptRequest || Utils.onInterceptRequest;
    Utils.startLoading = startLoading || Utils.startLoading;
    Utils.stopLoading = stopLoading || Utils.stopLoading;
    Utils.onInterceptRejectedRequest =
      onInterceptRejectedRequest || Utils.onInterceptRejectedRequest;
    Utils.onInterceptRejectedResponse =
      onInterceptRejectedResponse || Utils.onInterceptRejectedResponse;
    Utils.defaultOption = defaultOption || Utils.defaultOption;
  },
};

const Utils = {
  defaultOption: {
    responseType: "json", //类型
    url: "/", //url
    data: {}, //请求参数在此
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    authorizationKey: "Authorization",
    transformRequest: [
      (data) => {
        return qs.stringify(data, { arrayFormat: "indices", allowDots: true });
      },
    ],
    fileName: undefined,
    showSuccessMessage: false,
    showErrorMessage: true,
    tag: "app", //loading指示器的tag(分组)
    taskName: "请求", //loading指示器的名称
    cancelSource: undefined,
    cancelToken: undefined,
    onInterceptRequest: undefined, //Function 拦截请求
    onInterceptResponse: undefined, //Function 拦截响应
    onInterceptRejectedRequest: undefined, //Function 拦截rejected请求
    onInterceptRejectedResponse: undefined, //Function 拦截rejected响应
    startLoading: undefined, //Function 开始加载
    stopLoading: undefined, //Function 结束加载
    invalidateCache: true, //不取缓存
    noCache: false, //不缓存数据,
    expire: undefined, //缓存过期时间 milliseconds
  },
  startLoading(option) { },
  stopLoading(option) { },
  onInterceptRequest(axiosRequestConfig, option) {
    return axiosRequestConfig;
  },
  onInterceptRejectedRequest(error, option) {
    return error;
  },
  onInterceptResponse(axiosRequestConfig, option) {
    return axiosRequestConfig;
  },
  onInterceptRejectedResponse(error, option) {
    return error;
  },
  onCacheRetrieve(option) {
    return null;
  },
};

export { remote };
