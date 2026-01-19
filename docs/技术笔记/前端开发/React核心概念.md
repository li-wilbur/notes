# React 核心概念

## 1. 组件化

React 应用是由组件构建的。组件是 UI 的一部分，具有自己的逻辑和外观。

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

## 2. JSX

JSX 是 JavaScript 的语法扩展，允许你在 JS 中编写 HTML 样式的代码。

```jsx
const element = <h1>Hello, world!</h1>;
```

## 3. Props 和 State

- **Props**: 组件接收的参数，是只读的。
- **State**: 组件内部管理的私有数据，可以随时间变化。

## 4. 生命周期

组件从创建到销毁的过程，包括挂载（Mounting）、更新（Updating）和卸载（Unmounting）。
