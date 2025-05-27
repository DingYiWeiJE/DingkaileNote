

## 安装

[下载安装包](https://dev.mysql.com/downloads/mysql/)

无脑下一步

Please enter a password for the "root" user

`dd20100304`

**设置环境变量**

**.bash_profile文件**

```
PATH=$PATH:/usr/local/mysql/bin
```

**.zshrc文件**

```
export PATH=$PATH:/usr/local/mysql/bin
```

## 查看数据库中有哪些用户

zMj1me_XdGf9]h:M30}g

```sql
mysql -u root -p
```
```sql
SELECT user, host FROM mysql.user;
```

```
exit   或者  quit
```

## 添加用户

```
CREATE USER 'aiAgent'@'localhost' IDENTIFIED BY 'your_password';
```



## 查看当前拥有的数据库

```sql
SHOW DATABASES;
```

## 创建数据库

```sql
CREATE DATABASE sdingdatabase;

USE sdingdatabase;
```

## 查看自己当前所在的数据库

```sql
SELECT DATABASE();
```

## 创建表

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL
);
```



## 删除表

```sql
DROP TABLE IF EXISTS users;
```





## 插入数据

```sql
INSERT INTO users (name, age) VALUES ('Alice', 30);
```

## 查询数据

```sql
SELECT * FROM users;
```





# 工具

[navicat](https://www.navicat.com/en/products)安装







