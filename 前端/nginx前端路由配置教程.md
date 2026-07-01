# Nginx 前端路由配置教程

## 问题背景

在部署 React 单页应用（SPA）时，经常会遇到**刷新页面出现 404 错误**的问题。

### 问题现象
- 通过前端路由跳转访问页面：✅ 正常
- 直接在浏览器输入 URL 或刷新页面：❌ 返回 404 或 `{"detail":"Not Found"}`

### 问题原因

**单页应用的路由机制：**
1. React Router 等前端路由使用 HTML5 History API
2. 路由切换时，URL 改变但不会向服务器发送请求
3. 页面内容由前端 JavaScript 动态渲染

**刷新时发生了什么：**
1. 浏览器向服务器请求 `/model/detail/xxx` 这个路径
2. Nginx 尝试在服务器上查找这个实际文件
3. 找不到文件，返回 404 错误
4. 前端 JavaScript 根本没有机会执行

---

## 解决方案

### 核心思路
让 Nginx 在找不到文件时，返回 `index.html`，让前端路由接管。

### 配置方法

#### 1. 静态文件服务器配置

如果直接用 Nginx 托管静态文件：

```nginx
server {
    listen 80;
    server_name example.com;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        # 关键配置：先尝试文件，再尝试目录，最后返回 index.html
        try_files $uri $uri/ /index.html;
        
        # 禁用缓存（开发环境）
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # 静态资源缓存（生产环境推荐）
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### 2. Docker 容器中的配置

**容器内 Nginx 配置** (`/etc/nginx/conf.d/default.conf`)：

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**宿主机 Nginx 反向代理配置**：

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        # 代理到 Docker 容器
        proxy_pass http://localhost:8000;
        
        # 代理头设置
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**⚠️ 注意：不要在宿主机配置中添加 `try_files`，应该在容器内配置！**

---

## 常见错误配置

### ❌ 错误 1：路径冲突

```nginx
# 错误示例
location ^~ /model/ {
    proxy_pass http://some-backend;  # 这会拦截所有 /model/ 请求
}

location / {
    proxy_pass http://localhost:8000;  # 前端应用永远收不到 /model/ 请求
}
```

**问题：** 前端路由 `/model/detail/xxx` 被错误地代理到后端 API。

**解决：** 删除或调整 `/model/` 的 location 配置，让前端路由请求走到 `location /`。

### ❌ 错误 2：在反向代理层使用 try_files

```nginx
# 错误示例
location / {
    try_files $uri $uri/ /index.html;  # ❌ 这在反向代理中不起作用
    proxy_pass http://localhost:8000;
}
```

**问题：** `try_files` 只能查找本地文件，无法作用于代理的后端服务。

**解决：** 在实际托管静态文件的服务器（容器内）配置 `try_files`。

### ❌ 错误 3：API 路由也被 fallback

```nginx
# 可能有问题的配置
location / {
    try_files $uri $uri/ /index.html;  # API 请求也会返回 index.html
}
```

**解决：** 为 API 路由单独配置：

```nginx
# API 路由优先匹配
location ^~ /api/ {
    proxy_pass http://backend-server;
}

# 前端路由 fallback
location / {
    try_files $uri $uri/ /index.html;
}
```

---

## 配置验证步骤

### 1. 测试配置语法

```bash
nginx -t
```

### 2. 重新加载配置

```bash
# 平滑重载（推荐）
nginx -s reload

# 或重启服务
systemctl restart nginx
```

### 3. 查看配置文件

```bash
# 查看当前生效的完整配置
nginx -T

# 查看特定配置文件
cat /etc/nginx/conf.d/default.conf
```

### 4. 测试前端路由

1. 访问首页：`http://example.com/`
2. 通过前端跳转到子路由：`http://example.com/model/detail/xxx`
3. **刷新页面**，检查是否正常加载
4. 直接在浏览器输入子路由 URL，检查是否正常

---

## Docker 环境特殊说明

### 查看容器配置

```bash
# 查看运行中的容器
docker ps

# 查看容器内的 nginx 配置
docker exec <container-name> cat /etc/nginx/conf.d/default.conf

# 查看完整配置
docker exec <container-name> nginx -T
```

### 修改容器配置的方法

#### 方法 1：重新构建镜像（推荐）

在 Dockerfile 中添加正确的 nginx 配置：

```dockerfile
FROM nginx:alpine

# 复制构建产物
COPY dist/ /usr/share/nginx/html/

# 复制 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

`nginx.conf` 内容：

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### 方法 2：挂载配置文件

```bash
docker run -d \
  -p 8000:80 \
  -v /path/to/nginx.conf:/etc/nginx/conf.d/default.conf \
  -v /path/to/dist:/usr/share/nginx/html \
  nginx:alpine
```

#### 方法 3：临时修改（不推荐）

```bash
# 进入容器
docker exec -it <container-name> sh

# 编辑配置
vi /etc/nginx/conf.d/default.conf

# 重新加载
nginx -s reload
```

**⚠️ 注意：容器重启后修改会丢失！**

---

## 配置备份与恢复

### 备份配置

```bash
# 备份当前配置
cp /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.backup

# 带时间戳的备份
cp /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.bak.$(date +%Y%m%d%H%M%S)
```

### 查看备份文件

```bash
ls -lah /etc/nginx/conf.d/
```

### 恢复配置

```bash
# 恢复备份
cp /etc/nginx/conf.d/default.conf.backup /etc/nginx/conf.d/default.conf

# 测试配置
nginx -t

# 重新加载
nginx -s reload
```

---

## 调试技巧

### 1. 查看 Nginx 日志

```bash
# 访问日志
tail -f /var/log/nginx/access.log

# 错误日志
tail -f /var/log/nginx/error.log
```

### 2. 查看端口占用

```bash
# 查看 80 端口
netstat -tlnp | grep 80

# 或使用 ss
ss -tlnp | grep 80
```

### 3. 测试代理转发

```bash
# 测试本地服务
curl -I http://localhost:8000

# 测试外部访问
curl -I http://your-server-ip/
```

### 4. 查看 Nginx 进程

```bash
ps aux | grep nginx
```

---

## 完整配置示例

### 场景：React 应用 + 后端 API

```nginx
server {
    listen 80;
    server_name example.com;

    # 代理头设置
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    # 后端 API（优先匹配）
    location ^~ /api/ {
        proxy_pass http://backend-server:3000;
        
        # API 超时设置
        proxy_read_timeout 60s;
        proxy_send_timeout 60s;
    }

    # 前端应用（Docker 容器）
    location / {
        proxy_pass http://localhost:8000;
    }
}
```

**Docker 容器内配置：**

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## 总结

### 关键要点

1. **`try_files $uri $uri/ /index.html;`** 是解决前端路由刷新 404 的核心配置
2. 在**实际托管静态文件的服务器**上配置 `try_files`，不是反向代理层
3. API 路由要优先匹配，避免被前端 fallback 拦截
4. 修改配置后务必 `nginx -t` 测试，然后 `nginx -s reload` 重载
5. Docker 环境中，配置应该在容器内，不是宿主机

### 检查清单

- [ ] 容器内 nginx 配置了 `try_files`
- [ ] 宿主机反向代理配置正确
- [ ] API 路由没有被前端路由拦截
- [ ] 配置语法测试通过 (`nginx -t`)
- [ ] 已重新加载配置 (`nginx -s reload`)
- [ ] 测试刷新页面正常
- [ ] 测试直接输入 URL 正常

---

## 参考资源

- [Nginx 官方文档](http://nginx.org/en/docs/)
- [React Router 部署文档](https://reactrouter.com/en/main/start/concepts#server-rendering)
- [Vue Router HTML5 模式](https://router.vuejs.org/guide/essentials/history-mode.html)

---

**文档创建时间：** 2026-05-01  
**适用场景：** React/Vue/Angular 等单页应用的 Nginx 部署配置
