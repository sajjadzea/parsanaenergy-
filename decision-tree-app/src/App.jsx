import React from 'react';
import './index.css';
import DecisionTree from './components/DecisionTree.jsx';

export default function App() {
  return (
    <div className="App">
      <main>
        <h1>درخت تصمیم مشتری</h1>
        <DecisionTree />
      </main>
    </div>
  );
}
