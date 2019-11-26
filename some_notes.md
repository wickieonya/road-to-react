# Lifecycle Methods

They are used in the ES6 class components.
Some that we know of candidly so far include:

- the constructor which is called when an instance of the component is created and inserted in the DOM.
- the render() method that is called during the mount process too, but also when the component updates. It is called each time the state of the component changes.

## Other useful methods during the mounting process

- getDerivedStateFromProps()
- componentDidMount()

They are called in this order -> constructor(props) -> getDerivedStateFromProps() -> render() -> componentDidMount()

## Lifecycle methods when the state or props change

- getDerivedStateFromProps()
- shouldComponentUpdate()
- render()
- getSnapshotBeforeUpdate()
- componentDidUpdate()

## Umounting lifecycle

- componentWillUnmount()

### Common usage

1. constructor(props) -> called when the component gets initialized. Useful for setting the initial state and to bind methods to the class.
2. static getDerivedStateFromProps(props, state) -> is called before the render() lifecycle method, both on the initial mount and on the subsequent updates. It should return an object to update the state, or null to update nothing. It is a static method used in rare cases. Has no access to component instance.
3. render() -> a mandatory lifecycle method that returns elements as an output of the component. It gets an input as props and state, and returns an element.
4. componentDidMount() -> is only called once, when the component is mounted. Useful for carrying out asynchronous requests to fetch data from an API. The fetched data can then be stored in the local component state to be displayed in the render() lifecycle method.
5. shouldComponentUpdate(nextProps, nextState) -> is always called when the component updates due to state or props changes. Will cause the component and all its children to render or not to render on update lifecycle depending on the boolean that is returned from it. It can be used to prevent the render lifecycle method of a component. It is especially useful in mature react applications.
6. getSnapshotBeforeUpdate(prevProps, prevState) -> this lifecycle method is invoked before the most recently rendered output is committed to the DOM.
7. componentDidUpdate(prevProps, prevState, snapshot) -> is a lifecycle method that is invoked immediately after updating, but not for the initial render. It is useful to perform DOM operations or asynchronous requests.
8. componentWillUnmount() -> is called before a component is destroyed. Is useful to perform most clean up tasks.
9. componentDidCatch(error, info) -> introduced in React 16 as a way to catch errors in components. 
