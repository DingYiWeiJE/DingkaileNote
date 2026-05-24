# 打通WSL服务

在wsl中

```
sudo apt update
sudo apt install -y openssh-server
```

启动ssh

```
sudo mkdir -p /run/sshd
sudo service ssh start
```

查看是否启动成功

```
sudo service ssh status
```

因为之前把wsl的网络环境配置坏了， 所以导致发布到 inet 172.28.209.255/20 上

.255一般是广播地址， 不是正常的主机IP，所以需要修复

在windows中

删除WSL网络

```
wsl --shutdown
```

```
Get-HnsNetwork | Where-Object Name -Like "WSL*" | Remove-HnsNetwork
```

充值网络栈  管理员PowerShell

```
netsh winsock reset
netsh int ip reset
```

重启电脑

配置.wslconfig文件  添加上以下内容

```
networkingMode=mirrored
dnsTunneling=true
autoProxy=true
firewall=true
```

运行

```
wsl --shutdown
```

重新打开wsl

```
ip a
```

打开windows防火墙放行  管理员PowerShell

```
New-NetFirewallRule `
-DisplayName "WSL SSH" `
-Direction Inbound `
-LocalPort 22 `
-Protocol TCP `
-Action Allow
```

```
Set-NetFirewallHyperVVMSetting `
-Name '{40E0AC32-46A5-438A-A0B2-2B479E8F2E90}' `
-DefaultInboundAction Allow
```

设置用户名密码 在wsl中

```
password
```



然后在别的电脑中运行

```
ssh dzp@192.168.110.53
```

再输入密码， 就搞定了



