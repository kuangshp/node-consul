import * as os from 'os';

/**
 * @Author: 水痕
 * @Date: 2021-10-30 14:47:44
 * @LastEditors: 水痕
 * @Description: 获取电脑本地的ip地址
 * @param {*}
 * @return {*}
 */
export const getIPAddress = () => {
  const interfaces = os.networkInterfaces();
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
};
