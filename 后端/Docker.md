# Docker 学习笔记

# 推出docker桌面端

```
taskkill /F /IM "Docker Desktop.exe" /T
taskkill /F /IM "com.docker.backend.exe" /T
taskkill /F /IM "com.docker.service.exe" /T

```



## 一、环境准备（Windows）

### 前置条件
1. **开启 CPU 虚拟化**：进 BIOS 开启 Intel VT-x 或 AMD SVM Mode（必须！否则 Docker 无法启动）
2. **安装 WSL2**：PowerShell 管理员运行 `wsl --install`
3. **安装 Docker Desktop**：从官网下载安装

### 常见问题：Virtualization support not detected

Docker Desktop 启动时提示虚拟化未开启，需要两步修复：

**第一步：在 BIOS 中开启 CPU 虚拟化**
1. 重启电脑，开机按 **F2** 或 **Del** 进入 BIOS
2. 找到 **Intel VT-x** 或 **AMD SVM** 选项，设为 **Enabled**
3. F10 保存退出

**第二步：开启 Windows 虚拟化功能（管理员 PowerShell）**
```powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
dism.exe /online /enable-feature /featurename:Microsoft-Hyper-V-All /all /norestart
```

**重启电脑**后验证：
```powershell
systeminfo
# 找到 Hyper-V Requirements，确认 Virtualization Enabled In Firmware: Yes
```

再打开 Docker Desktop 即可正常使用。

---

### 常见问题：卡在 "Starting the Docker Engine..."

> **亲历排查记录（2026-03-11）**：完整还原了从现象到定位根因的全过程。

#### 排查思路与过程

**第一步：检查 CPU 虚拟化**
```powershell
(Get-CimInstance Win32_Processor).VirtualizationFirmwareEnabled
# True = 已开启，False = 未开启
```
- 如果返回 `False`，需要进 BIOS 开启 Intel VT-x 或 AMD SVM Mode
- **注意**：如果 Hyper-V 已经在运行，这个命令可能误报 False。此时用 `systeminfo` 确认：
```powershell
systeminfo | findstr "Hyper-V"
# 如果显示"已检测到虚拟机监控程序"，说明虚拟化其实是开启的
```

**第二步：检查 Docker 日志（关键！）**

当重启、杀进程等常规手段无效时，**一定要看日志**：
```
日志路径：%LOCALAPPDATA%\Docker\log\host\com.docker.backend.exe.log
```
我们在日志中看到的关键信息：
```
still waiting for init control API to respond after 5m24s
GET /ping: context deadline exceeded
```
说明 Docker 后端在等待 WSL 虚拟机内的 init 进程响应，但 init 一直没有回应。

**第三步：检查 WSL 虚拟机内核**

既然问题出在 WSL 虚拟机内部，就去看看里面跑的是什么内核：
```bash
wsl -d docker-desktop -- cat /proc/version
```
返回结果令人震惊：
```
Linux version 5.10.43-2-windows-subsystem-for-android ...
```
这是一个 **Android 子系统的内核**（2021年），而非正常的 WSL2 Linux 内核（应为 6.x）！
Docker 需要的 cgroups、namespace 等 Linux 特性在这个内核上不完整，所以永远启动不了。

**第四步：找到根因 —— .wslconfig 自定义内核**
```bash
cat ~/.wslconfig
```
发现了罪魁祸首：
```ini
[wsl2]
kernel=D:\\Program Files\\zhaoyi\\kernel_android   # ← 这行！
memory=7GB
swap=0GB
localhostForwarding=true
processors=24
```
之前为了跑某个安卓相关程序，把 WSL 全局内核替换成了 Android 内核。
这导致 **所有** WSL2 发行版（包括 docker-desktop）都在用这个不兼容的内核。

#### 解决方法

**注释掉 .wslconfig 中的 kernel 行：**
```ini
[wsl2]
# kernel=D:\\Program Files\\zhaoyi\\kernel_android   # 注释掉！
memory=7GB
swap=0GB
localhostForwarding=true
processors=24
```

**然后重启 WSL 和 Docker：**
```bash
wsl --shutdown          # 关闭所有 WSL 实例
# 重新打开 Docker Desktop，成功启动！
```

#### 原因排查优先级总结

| 优先级 | 原因 | 检查方法 |
|--------|------|----------|
| 1 | CPU 虚拟化未开启 | `systeminfo \| findstr "Hyper-V"` |
| 2 | `.wslconfig` 配置了不兼容的内核 | `cat ~/.wslconfig` 看 kernel 行 |
| 3 | WSL2 未正常安装 | `wsl --status` |
| 4 | docker-desktop 发行版损坏 | `wsl --unregister docker-desktop` 后重开 Docker |
| 5 | Docker 进程残留 | 杀进程 + `wsl --shutdown` 后重启 |

#### 经验教训

- **看日志**！`%LOCALAPPDATA%\Docker\log\host\com.docker.backend.exe.log` 是排查 Docker Desktop 问题的第一手资料
- `.wslconfig` 是 WSL2 的**全局配置**，修改内核会影响所有发行版，慎改
- `wsl -d docker-desktop -- cat /proc/version` 可以直接进入 Docker 的 WSL 虚拟机查看内核信息
- 遇到"卡住"类问题，不要只反复重启，要**追踪到底层**找根因

### 配置国内镜像加速（必做！）

Docker Hub 服务器在国外，国内直连拉镜像极慢甚至超时。必须配置镜像加速器。

**配置文件路径：** `~/.docker/daemon.json`

在 JSON 中添加 `registry-mirrors` 字段：
```json
{
  "registry-mirrors": [
    "https://docker.1ms.run",
    "https://docker.xuanyuan.me",
    "https://docker.ketches.cn"
  ]
}
```

配置后**重启 Docker Desktop** 生效。如果某个加速地址失效，Docker 会自动尝试下一个。

> 也可以在 Docker Desktop → Settings → Docker Engine 中直接编辑这个 JSON。

## 二、Docker 核心概念

| 概念 | 类比 | 说明 |
|------|------|------|
| **镜像 (Image)** | 安装包/模板 | 只读的应用模板，包含运行所需的一切 |
| **容器 (Container)** | 运行中的程序 | 由镜像创建的运行实例，可启停删除 |
| **仓库 (Registry)** | 应用商店 | 存放镜像的地方，默认是 Docker Hub |
| **Dockerfile** | 安装脚本 | 描述如何构建镜像的文本文件 |

## 三、常用命令速查

### 镜像操作
```shell
docker pull nginx          # 拉取镜像
docker images              # 查看本地镜像
docker rmi nginx           # 删除镜像
```

### 容器操作
```shell
docker run -d -p 8080:80 --name my-nginx nginx   # 后台运行容器，映射端口
docker ps                  # 查看运行中的容器
docker ps -a               # 查看所有容器（含已停止）
docker stop my-nginx       # 停止容器
docker start my-nginx      # 启动已停止的容器
docker rm my-nginx         # 删除容器
docker logs my-nginx       # 查看容器日志
docker exec -it my-nginx bash  # 进入容器内部
```

### 关键参数说明
- `-d`：后台运行（detach）
- `-p 宿主机端口:容器端口`：端口映射
- `--name`：给容器起名字
- `-it`：交互模式（进入容器用）
- `-v 宿主机路径:容器路径`：挂载目录（数据持久化）

## 四、新手第一步实践

Docker 启动成功后，运行这个命令验证：
```shell
docker run hello-world
```
看到 "Hello from Docker!" 就说明一切正常！

## 五、实战：打包部署前端项目到 Docker

### 整体思路

前端项目打包后就是一堆静态文件（HTML/CSS/JS），只需要一个 Web 服务器（Nginx）来托管。

**流程：源代码 → npm install → build → 把 dist 目录丢给 Nginx → 完成**

### 需要创建的三个文件

#### 1. Dockerfile（核心，描述如何构建镜像）

采用**多阶段构建**，最终镜像只有 Nginx + 静态文件，体积很小：

```dockerfile
# ============ 阶段一：构建 ============
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
# 直接用 vite build，跳过 tsc 类型检查（类型检查应在 CI 或本地做，不阻塞打包）
RUN npx vite build

# ============ 阶段二：运行 ============
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**多阶段构建的好处：**
- 阶段一（builder）：包含 Node.js、node_modules、源代码，体积很大（~1GB）
- 阶段二（最终镜像）：只有 Nginx + dist 静态文件，体积 ~30MB
- 构建完成后阶段一会被丢弃，不会进入最终镜像

**为什么用 `npx vite build` 而不是 `pnpm build`？**
- `pnpm build` 执行的是 `tsc -b && vite build`，tsc 类型检查失败会中断整个构建
- Docker 构建时只关心能不能产出 dist 文件，类型检查应该在本地开发或 CI 阶段做
- 直接 `npx vite build` 跳过类型检查，只做打包，更稳健

#### 2. nginx.conf（Nginx 配置）

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # 关键！前端路由（如 React Router）刷新时，Nginx 找不到对应文件
    # 必须回退到 index.html，让前端 JS 接管路由
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Vite 打包的文件名带 hash，可以长期缓存
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

> **`try_files` 是最关键的配置**。没有它，用户直接访问 `/login` 这种前端路由会返回 404。

#### 3. .dockerignore（排除不需要的文件）

```
node_modules
dist
.git
*.md
.husky
```

类似 `.gitignore`，避免把 `node_modules`（几百MB）等复制进 Docker 构建上下文。

### 构建和运行命令

```shell
# 在项目根目录执行（有 Dockerfile 的目录）
cd D:/code/hg-front

# 构建镜像（-t 是给镜像起名字:标签）
docker build -t hg-front:latest .

# 运行容器（-p 宿主机端口:容器内Nginx监听端口）
docker run -d -p 9527:9527 --name hg-front hg-front:latest

# 浏览器访问 http://localhost:9527 即可看到页面
```

### 常用操作

```shell
# 查看构建好的镜像
docker images | grep hg-front

# 停止并删除旧容器（重新部署时用）
docker stop hg-front && docker rm hg-front

# 重新构建并运行（代码更新后）
docker build -t hg-front:latest .
docker run -d -p 9527:9527 --name hg-front hg-front:latest

# 查看 Nginx 日志（排查问题）
docker logs hg-front
```

### 容器生命周期管理

```shell
# 查看正在运行的容器
docker ps

# 停止容器（服务停止，但容器还在，可以再 start）
docker stop hg-front

# 重新启动已停止的容器
docker start hg-front

# 停止并彻底删除容器（下次需要重新 docker run）
docker stop hg-front && docker rm hg-front

# 删除镜像（容器删除后才能删镜像）
docker rmi hg-front:latest
```

**stop vs rm 的区别：**
- `docker stop`：只是停掉服务，容器还保留着，`docker start` 可以再启动
- `docker rm`：彻底删除容器，需要重新 `docker run` 创建
- 类比：stop = 关机，rm = 把电脑扔了

### 踩坑记录

- **TypeScript 类型检查阻塞构建**：`pnpm build` 里 `tsc -b` 报错会中断打包。解决：Dockerfile 中直接用 `npx vite build` 跳过类型检查
- **本地路径别名**：vite.config 里 alias 指向项目外部路径（如 `../some-lib/src`），Docker 构建时访问不到。解决：确保依赖通过 npm 安装，在 Dockerfile 中 `pnpm add <包名>`
- **环境变量**：Vite 在 build 时会把 `.env` 中的环境变量打包进静态文件，需要在构建前设置好
- **端口映射**：`-p 宿主机端口:容器端口`，注意 nginx.conf 中 listen 的端口要和 EXPOSE/映射的容器端口一致
- **端口三者必须对齐**：改端口时容易漏改，必须同时检查这三个地方：
  ```
  nginx.conf  → listen 80;
  Dockerfile  → EXPOSE 80
  docker run  → -p 80:80
  ```
  如果 nginx listen 9527 但 docker run 映射的是 80:80，请求到了容器的 80 端口但没人监听，就会 connection reset
- **改了配置必须重新构建镜像**：nginx.conf 等文件是在 `docker build` 时打包进镜像的，改了本地文件不会自动生效，必须重新 `docker build` → `docker save` → 上传 → `docker load` → 重新 `docker run`

### 交付部署

#### 方式一：导出镜像文件（适合内网/离线环境）

```shell
# 开发者：导出镜像为 tar 文件
docker save hg-front:latest -o hg-front.tar

# 运维：导入镜像并运行
docker load -i hg-front.tar
docker run -d -p 9527:9527 --name hg-front hg-front:latest
```

#### 方式二：推送到镜像仓库（适合团队协作/CI/CD）

```shell
# 打标签（推送到私有仓库时需要加仓库地址前缀）
docker tag hg-front:latest registry.company.com/hg-front:latest

# 推送
docker push registry.company.com/hg-front:latest

# 运维：直接拉取运行
docker pull registry.company.com/hg-front:latest
docker run -d -p 9527:9527 --name hg-front registry.company.com/hg-front:latest
```

## 六、部署到远程服务器

### 完整流程（以 hg-front 为例）

#### 1. 连接服务器
```shell
ssh 用户名@服务器IP
# 输入密码
```

#### 2. 检查服务器是否已安装 Docker
```shell
docker version
# 有输出 → 已安装，跳到第 4 步
# command not found → 需要安装，看第 3 步
```

#### 3. 安装 Docker（如果没装）
```shell
curl -fsSL https://get.docker.com | sh
sudo systemctl start docker
sudo systemctl enable docker    # 开机自启
```

#### 4. 上传镜像到服务器
在**本地电脑**终端执行（不是服务器）：
```shell
scp D:/code/hg-front/hg-front.tar root@115.191.79.32:/root/
```

```js
9sK7#pR2!zQ5
```

```
docker stop hg-front && docker rm hg-front
```

```
docker load -i ~/hg-front.tar
```

```
docker run -d -p 80:80 --name hg-front hg-front:latest
```



#### 5. 在服务器上导入并运行

回到**服务器** SSH 终端：
```shell
docker load -i ~/hg-front.tar
docker run -d -p 80:80 --name hg-front hg-front:latest
docker ps   # 确认正在运行
```

#### 6. 验证
浏览器访问 `http://服务器IP:9527`

#### 访问不了？
- **防火墙没开端口**：让运维开放 9527 端口，或自行执行：
  ```shell
  # CentOS/firewalld
  sudo firewall-cmd --add-port=9527/tcp --permanent && sudo firewall-cmd --reload
  # Ubuntu/ufw
  sudo ufw allow 9527
  ```
- **云服务器安全组**：去云平台控制台（阿里云/腾讯云等）的安全组规则里放行 9527 端口

### 更新部署（代码改了重新发版）

```shell
# 本地：重新构建 + 导出
docker build -t hg-front:latest .
docker save hg-front:latest -o hg-front.tar
scp hg-front.tar 用户名@服务器IP:/home/用户名/

# 服务器：停旧的 → 导入新的 → 启动
docker stop hg-front && docker rm hg-front
docker load -i ~/hg-front.tar
docker run -d -p 9527:9527 --name hg-front hg-front:latest
```
