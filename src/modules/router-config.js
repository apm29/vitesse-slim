const routeWhiteList = ["/login", "/register"];
import { useAppStore } from '~/store'
//路由拦截,根据token查询是否为合法登录人
/**
 * return undefined 或返回 true，则导航是有效的，
 * 并调用下一个导航守卫,false: 取消当前的导航。
 * 如果浏览器的 URL 改变了(可能是用户手动或者浏览器后退按钮)，
 * 那么 URL 地址会重置到 from 路由对应的地址。
 */
export const install = ({ router }) => {
  router?.beforeEach(async (to, from) => {
    //1.如果在路由白名单中直接放行
    if (routeWhiteList.includes(to.path)) {
      return true;
    }
    //2.token为空时重定向到/login
    const appStore = useAppStore()
    if (!appStore.token) {
      return {
        path: "/login",
      };
    }
    return true;
  })
}
