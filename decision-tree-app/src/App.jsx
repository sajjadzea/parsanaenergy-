import React from 'react';
import './index.css';
import Header from './components/Header.jsx';
import DecisionTree from './components/DecisionTree.jsx';

export default function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <h1>درخت تصمیم مشتری</h1>
        <DecisionTree />
      </main>
    </div>
  );
}
