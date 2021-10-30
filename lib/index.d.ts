interface ICheckConfig {
    HTTP: string;
    Timeout: string;
    Interval: string;
    DeregisterCriticalServiceAfter: string;
}
interface IService {
    ID: string;
    Service: string;
    Tags: string[];
    Meta: {};
    Port: number;
    Address: string;
    SocketPath: string;
    TaggedAddresses: Record<string, any>;
    Weights: Record<string, any>;
    EnableTagOverride: boolean;
    Datacenter: string;
}
export declare class NodeConsul {
    private consulAddress;
    private currentAddress;
    constants(consulAddress: string): void;
    /**
     * @Author: 水痕
     * @Date: 2021-10-30 15:04:59
     * @LastEditors: 水痕
     * @Description: 服务注册
     * @param {string} port 端口号
     * @param {string} serviceName 服务名称
     * @param {string} serviceId 服务地址
     * @param {string[]} tags 标签
     * @param {ICheckConfig} check 健康检查
     * @return {*}
     */
    registerService(port: number, serviceName: string, serviceId: string, tags: string[], check?: ICheckConfig): Promise<void>;
    /**
     * @Author: 水痕
     * @Date: 2021-10-30 15:09:19
     * @LastEditors: 水痕
     * @Description: 根据服务id删除服务
     * @param {string} serviceId 服务地址
     * @return {*}
     */
    deregisterServiceById(serviceId: string): Promise<void>;
    /**
     * @Author: 水痕
     * @Date: 2021-10-30 15:12:43
     * @LastEditors: 水痕
     * @Description: 查询全部的服务
     * @return {*}
     */
    serviceList(): Promise<Record<string, IService>>;
    /**
     * @Author: 水痕
     * @Date: 2021-10-30 15:19:12
     * @LastEditors: 水痕
     * @Description: 根据id查询服务
     * @param {string} serviceId 服务地址
     * @return {*}
     */
    findService(serviceId: string): Promise<Record<string, IService>>;
}
export {};
