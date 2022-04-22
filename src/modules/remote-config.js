import { remote } from "~/composables";
import { localToken } from "~/composables";
import { Notify, Toast } from "vant";
const JAVA_SUCCESS_CODE = "1";

const loadingInstance = ref(null);
const loadingCount = ref(0);

export const install = () => {
  remote.init({
    //缓存获取相关
    onCacheRetrieve(option) {
      return null;
    },

    //设置token
    onInterceptRequest(axiosRequest, option) {
      axiosRequest.headers.Authorization = option.token || unref(localToken) || "";
      return axiosRequest;
    },
    //响应处理
    onInterceptResponse(axiosResponse, option) {
      return new Promise((resolve, reject) => {
        if (axiosResponse.status === 200) {
          //在此处进行响应拦截
          if (axiosResponse.data.status === JAVA_SUCCESS_CODE) {
            if (option.showSuccessMessage) {
              Notify({
                message:
                  axiosResponse.data.msg || axiosResponse.data.text || "操作成功",
                type: "success",
                duration: 5000,
              });
            }
            resolve(axiosResponse.data);
          } else {
            Notify({
              message: axiosResponse.data.msg || axiosResponse.data.text,
              type: "danger",
            });
            reject(axiosResponse.data.msg);
          }
        } else {
          Notify({
            message: axiosResponse.data.msg || axiosResponse.statusText,
            type: "danger",
          });
          reject(axiosResponse);
        }
      });
    },

    onInterceptRejectedRequest(error, option) {
      if (option.showErrorMessage && error) {
        Notify({
          message: error.message || String(error),
          type: "danger",
        });
      }
      return error;
    },
    onInterceptRejectedResponse(error, option) {
      if (option.showErrorMessage && error) {
        Notify({
          message: error.message || String(error),
          type: "danger",
        });
      }
      return error;
    },

    startLoading(option) {
      if (!option.silent) {
        loadingCount.value += 1;
        if (unref(loadingCount) > 0) {
          loadingInstance.value = Toast.loading({
            message: "加载中...",
            duration: 0,
            forbidClick: true,
            overlay: true,
          });
        }
      }
    },
    stopLoading(option) {
      if (!option.silent) {
        loadingCount.value -= 1;
        if (unref(loadingCount) <= 0) {
          unref(loadingInstance).clear();
        }
      }
    },
  });
}
