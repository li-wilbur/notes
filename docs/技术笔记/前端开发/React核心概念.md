# React核心概念

## 1. 组件化思想

React的核心思想是组件化，将UI拆分为独立、可复用的组件。

### 1.1 函数组件

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

### 1.2 类组件

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

## 2. JSX语法

JSX是JavaScript的扩展语法，允许在JavaScript中编写HTML-like代码。

```jsx
const element = <h1>Hello, world!</h1>;
```

## 3. 状态管理

### 3.1 组件状态

```jsx
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

### 3.2 状态更新

- 使用`setState()`方法更新状态
- 状态更新可能是异步的
- 可以接收一个函数作为参数

```jsx
this.setState((prevState, prevProps) => ({
  count: prevState.count + prevProps.increment
}));
```

## 4. 生命周期

### 4.1 挂载阶段

- `constructor()`
- `static getDerivedStateFromProps()`
- `render()`
- `componentDidMount()`

### 4.2 更新阶段

- `static getDerivedStateFromProps()`
- `shouldComponentUpdate()`
- `render()`
- `getSnapshotBeforeUpdate()`
- `componentDidUpdate()`

### 4.3 卸载阶段

- `componentWillUnmount()`

## 5. 虚拟DOM

React使用虚拟DOM来提高性能：

1. 当组件状态变化时，React会构建新的虚拟DOM树
2. 将新树与旧树进行比较（diffing算法）
3. 只更新必要的部分到真实DOM

## 6. 单向数据流

React采用单向数据流：

- 数据从父组件通过props传递给子组件
- 子组件不能直接修改props
- 子组件可以通过回调函数通知父组件更新数据

## 7. Hooks

Hooks是React 16.8引入的新特性，允许在函数组件中使用状态和其他React特性。

### 7.1 useState

```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### 7.2 useEffect

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## 8. 条件渲染

```jsx
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  }
  return <h1>Please sign up.</h1>;
}
```

## 9. 列表渲染

```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```

## 10. 事件处理

```jsx
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```