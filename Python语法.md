# Python语法

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

### 使用环境变量

```
pip install python-dotenv
```

```python
import os
from dotenv import load_dotenv
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
```



## pydantic

### Field

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



### 安装依赖

```
pip install -r requirements.txt
```





# 新建项目

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

生成依赖文件：

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

