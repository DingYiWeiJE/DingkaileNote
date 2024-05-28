import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import Provider from "../pages/Provider/Provider";
import VirtualListDemo from "../pages/VirtualListDemo/virtualListDemo";
import IndexDb from "../pages/IndexDb/IndexDb";
import Crypto from "../pages/Crypto/Crypto";

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
    name: 'useContext',
    element: <Provider/>,
  },
  {
    path: "/EvayWeb/indexDB",
    name: 'indexDB',
    element: <IndexDb/>,
  },
  {
    path: "/EvayWeb/crypto",
    name: 'crypto',
    element: <Crypto/>,
  },
]

export default createBrowserRouter(routerArr)