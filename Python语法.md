## IO操作

```python
# 写入文件
with open('example.txt', 'w', encoding='utf-8') as file:
    file.write("这是一个文件写入示例。\n")
    file.write("你可以在这里写入多行文本。\n")
    file.write("每次写入都会覆盖之前的内容。\n")

# 读取文件
with open('example.txt', 'r', encoding='utf-8') as file:
    content = file.read()
    print("文件内容如下：")
    print(content)

```



## Json操作

```python
import json

data = {"name": "Alice", "age": 30, "city": "New York"}

with open("data.json", "w") as file:
    json.dump(data, file, indent=4)  # indent=4 表示格式化输出，使用4个空格缩进
```

```python
json.dump(obj, file, **kwargs)
```

- `obj`: 要转换为 JSON 格式的 Python 对象（如字典、列表、元组等）。
- `file`: 一个类文件对象，表示数据写入的目标文件。
- `**kwargs`: 可选的其他参数，可以用来控制 JSON 的编码方式（例如缩进、分隔符等）。



**读取**

```python
with open("data.json", "r") as file:
    data = json.load(file)

# 获取 "name" 键对应的值
name = data["name"]
print(name)  # 输出 "Alice"
```



## 截取数组

```python
dingkaile = [-0.0020512184, -0.021894801, -0.013669145, 0.0059205955, 0.023970932]
print(dingkaile[:2])
```

## 遍历数组

### for in

```python
arrays = ["昨天", "今天", "明天"]  
for item in arrays:  
    print(item)  
```

### for-in-range结合len()

```python
arrays = ["昨天", "今天", "明天"]  
for i in range(len(arrays)):  
    print(i, arrays[i])  
```

### enumerate

```python
arrays = ["昨天", "今天", "明天"]  
for index, value in enumerate(arrays):  
    print(index, value)  
```

## 虚拟环境

### 创建

```shell
python -m venv dbtest
```

```
dingyiwei@MacBook-Pro db % source dbtest/bin/activate
(dbtest) dingyiwei@MacBook-Pro db % 
```

### 退出

```
deactivate
```



## 使用环境变量

```
pip install python-dotenv
```

```python
import os
from dotenv import load_dotenv
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
```

```python
os.environ["OPENAI_API_KEY"] = "cccccccccccccccccc"

```



## pydantic

## Field

`Field` 是 `pydantic` 库中的一个函数，用于对模型字段进行更精细的控制和配置。它允许您为字段添加额外的元数据或约束条件，比如默认值、描述、验证规则等。

````python
class User(BaseModel):
    name: str = Field(default="Unknown", description="用户的姓名")
    age: int = Field(gt=0, lt=150, description="用户的年龄")
    items: list = Field(default_factory=list, description="用户的物品列表")
    nickname: str = Field(default=None, required=False, description="用户的昵称")
````

**提高代码的可读性**：通过 `description` 等参数，字段的用途一目了然

**数据验证**：通过 `gt`、`lt` 等参数，确保字段值符合预期。



## 安装依赖

```
pip install -r requirements.txt
```





## 新建项目

创建虚拟环境：

```
python3 -m venv digi_twin
source digi_twin/bin/activate # macOS
myenv\Scripts\activate     # Windows
```

​	退出虚拟环境运行：`deactivate`

初始化项目

```
pip install poetry
poetry self add poetry-plugin-export
```

```
poetry init  # 初始化依赖管理
poetry add fastapi langchain-ollama
```

### 生成依赖文件：

```
poetry export --without-hashes -f requirements.txt > requirements.txt
```

main.py:

```python
from fastapi import FastAPI
from langchain_ollama import ChatOllama

app = FastAPI(
    title="AI Service API",
    version="1.0",
    description="LangChain API Deployment"
)

llm = ChatOllama(
    model="deepseek-r1:1.5b",
    temperature=0.7,
    base_url="http://localhost:11434"
)

@app.get("/",summary="welcome page",
          description="Tests the current running status of the service")
async def health():
    return "DigiTwin Server is running"


@app.post("/chat",summary="Chat with AI", description="Chat with AI")
async def chat(message: str):
    result = await llm.ainvoke(message)
    return {
        "message": result.content
    }
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=9527)
```



生成当前项目的干净的依赖文件：

```
pip install pipreqs
pipreqs ./ --encoding=utf8 --force
```

# Flask框架

## ✅ 步骤 1：创建基本目录结构

在你的空文件夹中创建如下结构：

```
bash


复制编辑
mkdir -p app
touch app/__init__.py
touch app/models.py
touch config.py
touch manage.py
```

最终结构应该长这样：

```
arduino


复制编辑
你的项目/
├── app/
│   ├── __init__.py
│   └── models.py
├── config.py
├── manage.py
```

------

## ✅ 步骤 2：创建虚拟环境并安装依赖

```
bash


复制编辑
python -m venv venv
source venv/bin/activate  # Windows 用 venv\Scripts\activate
pip install flask flask-sqlalchemy flask-migrate
```

然后生成 `requirements.txt`：

```
bash


复制编辑
pip freeze > requirements.txt
```

------

## ✅ 步骤 3：配置 Flask 应用

### `config.py`

```
python


复制编辑
import os

class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///app.db'  # SQLite 数据库
    SQLALCHEMY_TRACK_MODIFICATIONS = False
```

------

### `app/__init__.py`

```
python


复制编辑
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    db.init_app(app)
    migrate.init_app(app, db)

    from app import models  # 确保导入模型

    return app
```

------

### `app/models.py`

```
python


复制编辑
from app import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(128), unique=True, nullable=False)
```

------

### `manage.py`

```
python


复制编辑
from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
```

------

## ✅ 步骤 4：初始化数据库迁移系统

现在开始做数据库迁移操作：

```
bash


复制编辑
export FLASK_APP=manage.py  # Windows 用 set FLASK_APP=manage.py
flask db init
flask db migrate -m "create user table"
flask db upgrade
```

执行完后，你会看到：

- `migrations/` 文件夹被自动创建
- `app.db` 数据库文件被创建，包含一个 `user` 表

## ✅ 步骤 1：安装 PostgreSQL 驱动

PostgreSQL 需要额外安装 `psycopg2`：

```
bash


复制编辑
pip install psycopg2-binary
```

------

## ✅ 步骤 2：修改数据库配置

打开 `config.py`，把原来的 SQLite URI 改成 PostgreSQL 连接字符串：

```
python


复制编辑
class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:123456@localhost/dify_test'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
```

------

## ✅ 步骤 3：确认 PostgreSQL 数据库已启动并可连接

请确保你在本地已经启动了 PostgreSQL，且这个用户和数据库都能访问：

你可以使用命令确认：

```
bash


复制编辑
psql -h localhost -U postgres -d postgres
```

输入密码 `123456` 后能连接就说明一切正常。

------

## ✅ 步骤 4：重新初始化数据库迁移（如果上一步你已经完成）

你现在可以继续运行迁移命令，把模型同步到 PostgreSQL 中：

```
bash


复制编辑
# 确保你在虚拟环境中并且 FLASK_APP 设置了：
export FLASK_APP=manage.py  # Windows 用 set FLASK_APP=manage.py

# 如果还没 init
flask db init

# 如果已经 init 过就跳过 init，继续
flask db migrate -m "Initial migration"
flask db upgrade
```

------

完成后你就可以打开 PostgreSQL 数据库，看到 `user` 表已经被创建。
