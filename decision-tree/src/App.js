import React from 'react';
import DecisionTree from './components/DecisionTree';

export default function App() {
  return (
    <div className="max-w-md mx-auto bg-white shadow rounded p-4">
      <h1 className="text-xl font-bold mb-4 text-center">درخت تصمیم</h1>
      <DecisionTree />
    </div>
  );
}
