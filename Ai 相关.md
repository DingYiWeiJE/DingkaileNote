# 安装langchain

### 一、安装环境

#### 1. 检查Python环境

```
# 查看预装Python3版本
python3 --version

# 如果没有Python3或版本低于3.8
brew update
brew install python@3.11
```

#### 2. 安装虚拟环境工具（可选但推荐）

```
# 使用venv模块（系统自带）
python3 -m venv langchain-env

# 激活虚拟环境
source langchain-env/bin/activate
```

> 提示：退出虚拟环境用 `deactivate`

------

### 二、核心安装

#### 1. 安装LangChain基础包

```
pip install langchain
```

#### 2. 安装常用扩展组件

```
# 基础AI服务支持
pip install openai huggingface_hub

# 可选组件（按需安装）
pip install langchain-community      # 社区扩展
pip install langchain-core           # 核心接口
pip install langchain-text-splitters # 文本处理
pip install langchain-cli            # 命令行工具
```

------

### 三、向量数据库支持

```
# 安装FAISS（推荐）
pip install faiss-cpu

# 其他选项
pip install chromadb                 # Chroma向量库
```

------

### 四、开发工具整合

#### 1. 前端项目整合建议

```
# 在现有项目根目录创建AI服务目录
mkdir -p ./src/ai-services && cd ./src/ai-services
```

#### 2. 创建requirements.txt

```
langchain==0.2.1
openai>=1.12.0
python-dotenv>=1.0.0
faiss-cpu>=1.7.4
```

------

### 五、环境配置

#### 1. 设置API密钥

```
# 在项目根目录创建.env文件
echo "OPENAI_API_KEY=sk-your-key-here" >> .env
```

#### 2. 安全读取配置

```
# 安装dotenv
pip install python-dotenv

# 在Python中使用
from dotenv import load_dotenv
load_dotenv()
```

------

### 六、验证安装

创建 `test_langchain.py`：

```
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI

prompt = ChatPromptTemplate.from_template(
    "用三个emoji描述：{item}"
)
model = ChatOpenAI()
chain = prompt | model

response = chain.invoke({"item": "程序员的工作日常"})
print(response.content)
```

运行测试：

```
python test_langchain.py
# 预期输出类似：💻🐛☕
```

# 创建一个demo

+ 创建一个项目

+ 在项目中运行

  ```shell
  pip install langchain 
  pip install langchain_openai
  ```

+ 在根目录创建.env文件

  ```json
  OPENAI_API_KEY=秘钥
  ```

  ```shell
  pip install python-dotenv
  ```

+ 创建main.py

  ```python
  import os
  from dotenv import load_dotenv
  from langchain_core.prompts import ChatPromptTemplate
  from langchain_openai import ChatOpenAI
  load_dotenv()
  api_key = os.getenv("OPENAI_API_KEY")
  prompt = ChatPromptTemplate.from_template(
      "用三个emoji描述：{item}"
  )
  model = ChatOpenAI(openai_api_key=api_key)
  chain = prompt | model
  
  response = chain.invoke({"item": "程序员的工作日常"})
  print(response.content)
  ```

# 嵌入本地deepseek大模型

首先下载安装好ollama

```
ollama -v   
```

安装个最小版的deepseek

```
ollama run deepseek-r1:1.5b
```

新建local.py文件

```
from langchain_core.prompts import ChatPromptTemplate
from langchain_ollama import ChatOllama

prompt = ChatPromptTemplate.from_template(
    "用三个emoji描述：{item}"
)

llm = ChatOllama(
    model="deepseek-r1:1.5b",
    temperature=0.7,
    base_url="http://localhost:11434"
)
chain = prompt | llm

response = chain.invoke({"item": "程序员的工作日常"})
print(response.content)
```





# 底层原理

## 特性

+ **LLM和提示（Prompt）**: LangChain 对大模型进行了API抽象，统一了大模型访问API, 同时提供了Prompt提示模板管理机制

+ **链（Chain）：** 链式调用，一步一步的执行

+ **LCEL**:  解决工作流编排问题，通过LCEL表达式，灵活的自定义AI任务处理流程，灵活自定义链

+ **数据增强生成（RAG）：**因为预训练时有截止时间范围的，大模型不了解新的信息，无法回答新的问题，所以我们可以将新的信息导入LLM， 用于增强LLM生成内容的质量；也就是推理。

  除了RAG的方式以外，还有一种途径叫微调

+ **Agents:** 根据用户需求自动调用外部系统，设备共同完成任务；例如用户输入：“明天请假一天” ， 大模型（LLM）自动调用请假系统，发起一个请假申请。

+ **模型记忆（memory）：**让大模型记住之前的对话内容；把内容存到数据库，在后面接入大模型的过程中，把记忆调出来；



## LangChain生态

+ **LangSmith**：链的追踪，相当于运维这一块；可观测性的监控系统，可以了解链的调用你情况

+ **LangServe:** 做部署的；langchain开发的应用；对外暴露REST API，可以通过http去请求langchain的中的API

+ **Templates：**模板的定义的

+ **LangChain**：

  + **Chains**： 链式调用

  + **Agents**：智能体

  + **Retrieval Srategies**: 向量数据库的检索的策略；

  + **LangChain-Community**: 

      一下都是开源的社区力量在支持的

    + **Model I/O**
      + Model： 模型参数
      + Prompt： 提示词模板
      + Example Selector： 样例，问大模型的时候提供的示例，聊天的时候会把示例带上去。
      + Output Parser： 格式化，默认是以markdown的形式
    + **Retrieval**（针对RAG组件的设计）
      + Retriever：向量数据库的检索
      + Document Loader：文档加载，给大模型喂数据；把加载的数据转换成向量
      + Vector Store：向量数据库
      + Text Splitter： 文本分割；大文件分片存储
      + Embedding Model：调用大模型的能力去实现的
    + **Agent Tooling**
      + Tool： 
      + Toolkit

  + **LangChain-Core**

    + **LCEL**： 表达式语言，可以让你用一套语法去很方便的做一个
    + **Parallelization**：并行调用
    + **Fallbacks**： 处理可能出现的异常或错误
    + **Tracing**： 跟踪
    + **Batching**：批量调用
    + **Streaming**： 流式调用
    + **Async**：异步调用
    + **Composition**： 组合调用



# LangChain结构组成

+ **LangChain库：**Python和JavaScript库，（用python居多）包含接口和集成多种组件的运行时基础以及现成的链和代理的实现
+ **Langchain模板**： LangChain官方提供的一些AI任务模板，执行AI任务的时候可以使用官方提供的模板库中的模板
+ **LangServe**： 基于FastAPI可以将LangChain定义的Chain发布成REST API
+ **LangSmith**： 开发平台，是个云服务，支持LangChain debug、任务监控；任务耗时，任务报错都可以看到



# LangChain Libraries

+ Langchain-core： 核心库；基础抽象和LangChain表达语言。
+ Langchain-comunity: 第三方的一些集成。主要包括langchain集成的第三方组件
+ langchain：基础的语言知识，主要包括chain、 agent和检索策略



# LangCchain任务处理流程

输入问题，经过提示词模板加工，以为LLM或者Chat Model的形式去与大模型交流；拿到结果后，通过output parse转换成想要的格式 

langchain提供一套提示词模板（prompt template）管理工具，负责处理提示词，然后传递给大模型处理，最后处理大模型返回的结果

Langchain对大模型的封装主要包括LLM和Chat Model两种类型

​	**LLM - 问答模型**： 模型接受一个文本输入，然后返回一个文本结果

​	**Chat Model -对话模型**：接受一组对话消息上下文（包括给AI的角色定义），然后返回对话消息。



## 核心概念

+ **LLMs：** 大模型，接收一个文本输入，然后返回一个文本结果
+ **Chat Models**： 聊天模型，与LLMs不同，这些模型专为对话场景而设计。
+ **Message：**指的是Chat Models的消息内容， 消息类型包括HumanMessage  AIMessage、 SystemMessage、 FunctionMessage和ToolMessage等多种类型消息
+ **prompts：** 提示词管理工具类，方便我们格式化提示词propts内容
+ **Output Parsers：**输出解析器,对大模型输出的内容进行自定义的输出
+ **Retrievers:**检索框架， 方便我们加载文档数据、切割文档数据、存储和检索文档数据
+ **Vector stores：** 支持私有素具的语义相似搜索；向量数据库例如faiss、chroma
+ **Agent：**智能体，以大模型作为决策，根据用户输入的任务，自动调用外部系统、硬件设备共同完成用户的任务，是一种以大模型LLM为核心的应用设计模式



# LangChain提示词模版

其实输入的知识一个参数，真正到LLM的时候是已经被Format过了的。

+ **from_messages**

```python
prompt_template = ChatPromptTemplate.from_messages([
    ("system","你是一个程序员,你的名字叫{name}"),
    ("human", "你好"),
    ("ai", "你好,我叫{name}"),
    ("human", "{user_input}"),
])
message = prompt_template.format_messages(name="张三", user_input="今天天气怎么样？")
print(message)
```

+ **from_template**

```python
prompt_template = ChatPromptTemplate.from_template(
    "你好，我是{name}，请问{user_input}"
)
message = prompt_template.format_messages(name="张三", user_input="今天天气怎么样？")
print(message)
```

Chat Model 聊天模式以聊天消息列表作为输入，每个消息都与角色 role想关联

三种角色分别是：

+ 助手（Assistant）消息指的是当前消息是AI回答的内容
+ 人类（user）消息指的是你发给AI的内容
+ 系统（system）消息通常是用来AI身份进行描述的



## 对象的方式进行定义

如果需要接收参数，就用SystemMessagePromptTemplate.from_template； 不需要接收参数就用SystemMessage

```python
chat_template = ChatPromptTemplate.from_messages([
    SystemMessage(
        content=(
            "你是一个搞笑风趣的智能助手"
        )
    ),
    SystemMessagePromptTemplate.from_template(
        "你的名字叫做{name},请根据用户的问题回答。"
    ),
    HumanMessagePromptTemplate.from_template(
        "用户的问题是：{user_input}"
    ),
])
message = chat_template.format_messages(name="张三", user_input="今天天气怎么样？")
print(message)
```

## MessagesPlaceholder

相当于一个消息的占位符，可以传入一组消息。  可以把一段聊天记录插进去，提供上下文。

```

```
