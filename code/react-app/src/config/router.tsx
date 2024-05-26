import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import Provider from "../pages/Provider/Provider";
import VirtualListDemo from "../pages/VirtualListDemo/virtualListDemo";

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
  }
]

export default createBrowserRouter(routerArr)