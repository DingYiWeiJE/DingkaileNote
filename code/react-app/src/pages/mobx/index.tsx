import { observable, autorun } from 'mobx'

// 对于普通类型数据的监听
var observableNumber = observable.box(123);
var observablename = observable.box('丁凯乐');
export const dingkaile = observable.box('丁凯乐');

// 对于复杂类型数据的监听
// var myObject = observable.map({ // 原始写法
//   name: '张三',
//   age: 30,
//   height: 1.76,
//   weight: 60
// });
var myObject = observable({ // 推荐简单写法
	name: '张三',
	age: 30,
})

// 监听复杂类型数据  第一次触发和 只有当这个函数内所涉及到的属性值发生了改变了之后，才会触发
autorun(() => {
	// console.log('myObject.age发生了改变', myObject.get('age')); // 对应的是原始写法
	console.log('myObject.age发生了改变', myObject.age); // 对应的是简单写法
})


// 第一次会执行，之后每次改变都会执行
autorun(() => {
	console.log('observableNumber:', observableNumber.get());
})


setTimeout(() => {
	observableNumber.set(456);
	observablename.set('Evay');
	dingkaile.set('中国蓝翔在山东')
	// myObject.set('age', 31); // 对应的是原始写法
	// myObject.set('name', '丁凯乐');
	myObject.age = 31; // 对应的是简单写法
	myObject.name = '丁凯乐';
}, 2000);

export function MobxDemo() {
	return <div>
		<h1>测试mobx</h1>
		<span>{observablename.get()}</span>
	</div>
}