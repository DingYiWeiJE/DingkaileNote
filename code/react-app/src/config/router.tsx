import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import Provider from "../pages/Provider/Provider";
import VirtualListDemo from "../pages/VirtualListDemo/virtualListDemo";
import IndexDb from "../pages/IndexDb/IndexDb";
import Crypto from "../pages/Crypto/Crypto";
import MyState from "../pages/MyState/MyState";
import SelfAdaption from "../pages/SelfAdaption/SelfAdaption";

export const routerArr = [
  {
    path: "/EvayWeb",
    element: <App />,
  },
  {
    path: "/EvayWeb/virtual-list2",
    name: '虚拟列表',
    element: <VirtualListDemo/>,
  },
  {
    path: "/EvayWeb/useContext",
    name: 'Provider',
    element: <Provider/>,
  },
  {
    path: "/EvayWeb/indexDB",
    name: 'indexDB',
    element: <IndexDb/>,
  },
  {
    path: "/EvayWeb/crypto",
    name: '加解密',
    element: <Crypto/>,
  },
  {
    path: "/EvayWeb/myRem",
    name: '自适应',
    element: <SelfAdaption/>,
  },
  {
    path: "/EvayWeb/myState",
    name: '状态管理',
    element: <MyState/>,
  },
]

export default createBrowserRouter(routerArr)