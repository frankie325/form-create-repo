import axios from "axios";
import { is } from "@/utils";
import { err } from "@/utils/console";

const defaultConfig = {
    baseURL: "",
    timeout: 10000,
    headers: {},
};

export default function createRequestInstance(config) {
    let request = null;
    // 传入了axios实例则直接返回
    if (is.Function(config) && config.interceptors) request = config;
    else if (is.Object(config)) {
        request = axios.create({
            ...defaultConfig,
            ...config,
        });

        // 添加请求拦截器
        request.interceptors.request.use(
            function (config) {
                return config;
            },
            function (error) {
                return Promise.reject(error);
            }
        );

        // 添加响应拦截器
        request.interceptors.response.use(
            function (response) {
                return response;
            },
            function (error) {
                return Promise.reject(error);
            }
        );
    } else {
        err("axios实例配置必须为对象");
    }

    return request;
}
