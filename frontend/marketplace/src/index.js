import React from 'react';
import ReactDom from 'react-dom';
import './index.css';
import ShoppingList from './ShoppingList';

React.createElement('div', {className: 'shopping-list'},
    React.createElement('h1',),
    React.createElement('ul',)
);


ReactDom.render(<ShoppingList/>, document.getElementById('root'));