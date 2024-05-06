# HOC

+ **抽离重复的代码，提升代码的复用性**

  + 比方说有一些公用的方法

    ```tsx
    function HOC (WrappedComponent) {
    	// 这里放一些公共会执行到的方法
      return <WrappedComponent/>
    }
    ```

+ **条件渲染**

  + 权限管理

  	```tsx
  function HOC (WrappedComponent){
    if (XXX) {
      return <p>error handler</p>
    }
    return <WrappedComponent/>
  }
  
+ **劫持、捕获  组件本身的属性  生命周期**

  + 属性代理

    ```jsx
    // 比方说想要给一个多个组件页面传入一些相同的属性
    function HOC (WrappedComponent) {
      const newProps = {
        name: 'dingkaile'
      }
    	// 这里的props指的是使用<HOC/> 时传入的参数  
      return props => <WrappedComponent {...props, ...newProps}/>
    }
    ```
		```tsx
    function HOC (WrappedComponent) {
      return class extend React.Component {
        render () {
          const newProps = {
            name : 'dingkaile' 
          }
          return <WrappedComponent {...this.props, ...newProps}/>
        }
      }
    }
    ```
    
  + 抽象state
  
    比方说有多个页面组件，它们所用到的某个state和设置这个state的值的方法都是需要通过外部去统一传入的。就可以使用抽象Sate
    
    ```tsx
    function HOC (WrappedComponent) {
      return class extends React.Component {
        
        constructor(props) {
          super(props){
            this.state = {
              name: 'dingkaile'
  	        }
            
            this.onChange = this.onChange.bind(this)
          }
        }
        
        onChange = event => {
    			this.setState({
            name: event.target.value
          })
        }
        
        render() {
           const newProps = {
             name: {
               value: this.state.name,
               onChange: this.onChange
             }
           }
           return <WrappedComponent {...this.props, ...newProps}/>
        }
        
      }
    }
    ```

   + 反向继承
  
     ```tsx
     // 劫持原本的生命周期
     function HOC(WrappedComponent) {
       const didMount = WrappedComponent.props.prototype.componentDidMount
       
       return class extends WrappedComponent {
          if (didMount) { // 如果是组件定义了这个钩子了的，就执行它
            didMount.apply(this)
          }
         // 然后在这个地方写你想要额外拓展的行为
       }
       
       render () {
         return super.render()
       }
     }
     ```
  
     ```tsx
     // 处理state 利用劫持声明周期的方式初始化state  
     function HOC(WrappedComponent) {
       const didMount = WrappedComponent.props.prototype.componentDidMount
       
       return class extends WrappedComponent {
          if (didMount) { // 如果是组件定义了这个钩子了的，就执行它
            didMount.apply(this)
          }
         // 处理state
         this.setState({
           name: 'dingkaile'
         })
       }
       
       render () {
         return super.render()
       }
     }
     ```
  
     