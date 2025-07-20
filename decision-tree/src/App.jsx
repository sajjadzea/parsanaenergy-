import React from 'react';
import DecisionTree from './components/DecisionTree';

export default function App() {
  return (
    <div className="decision-tree-container">
      <h1 className="text-xl font-bold mb-4 text-center">درخت تصمیم</h1>
      <DecisionTree />
    </div>
  );
}
