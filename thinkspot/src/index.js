import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

function tick() {
    const element = 
    <div>
        <h1>Hello, world!</h1>
        <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
ReactDOM.render(element, document.getElementById('root'));
};

//example of component function with a pre-defined props object 
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>
}

// const welcome = <Welcome name="Sara"/>
// ReactDOM.render(
//     welcome, 
//     document.getElementById('root')
// );

//example of nested component can use same component abstraction
function App() {
    return (
        <div>
            <Welcome name="Sara"/>
            <Welcome name="Cahal"/>
            <Welcome name="Edite" />
        </div>
    );
}

setInterval(tick, 1000);

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

registerServiceWorker();
