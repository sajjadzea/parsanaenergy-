import React from 'react';
import './index.css';
import Header from './components/Header';
import DecisionTree from './components/DecisionTree';

function App() {
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

export default App;
