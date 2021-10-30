import axios from 'axios';
import { ALL_SERVICE_URL, DEREGISTER_URL, REGISTER_URL, SERVICE_ID_URL } from './constants';
import { getIPAddress } from './utils';

export const computerIPAddress = () => getIPAddress();

export interface ICheckConfig {
  HTTP: string;
  Timeout: string;
  Interval: string;
  DeregisterCriticalServiceAfter: string;
}

export interface IService {
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

export default class NodeConsul {
  private consulAddress: string | undefined;
  private currentAddress: string | undefined;

  constructor(consulAddress: string) {
    this.consulAddress = consulAddress;
    this.currentAddress = getIPAddress();
  }

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
  async registerService(
    port: number,
    serviceName: string,
    serviceId: string,
    tags: string[],
    check?: ICheckConfig,
  ): Promise<void> {
    const url: string = `http://${this.consulAddress}${REGISTER_URL}`;
    const currentAddress: string = this.currentAddress as string;
    const data = {
      Address: currentAddress,
      Port: port,
      Name: serviceName,
      id: serviceId,
      Tags: tags,
      Check: check,
    };
    await axios.put(url, data);
  }

  /**
   * @Author: 水痕
   * @Date: 2021-10-30 15:09:19
   * @LastEditors: 水痕
   * @Description: 根据服务id删除服务
   * @param {string} serviceId 服务地址
   * @return {*}
   */
  async deregisterServiceById(serviceId: string): Promise<void> {
    const url: string = `http://${this.consulAddress}${DEREGISTER_URL}/${serviceId}`;
    await axios.put(url);
  }

  /**
   * @Author: 水痕
   * @Date: 2021-10-30 15:12:43
   * @LastEditors: 水痕
   * @Description: 查询全部的服务
   * @return {*}
   */
  async serviceList(): Promise<Record<string, IService>> {
    const url: string = `http://${this.consulAddress}${ALL_SERVICE_URL}`;
    const response = await axios.get(url);
    return response.data;
  }

  /**
   * @Author: 水痕
   * @Date: 2021-10-30 15:19:12
   * @LastEditors: 水痕
   * @Description: 根据id查询服务
   * @param {string} serviceId 服务地址
   * @return {*}
   */
  async findService(serviceId: string): Promise<Record<string, IService>> {
    const url: string = `http://${this.consulAddress}${SERVICE_ID_URL}/${serviceId}`;
    const response = await axios.get(url);
    return response.data;
  }
}
