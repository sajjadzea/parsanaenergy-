import React, { useState } from 'react';
import tree from '../data/tree.json';

export default function DecisionTree() {
  const [node, setNode] = useState(tree);

  function handleChoice(choice) {
    setNode(node.children[choice]);
  }

  if (!node) return null;

  return (
    <div className="space-y-4">
      {node.question && <p className="text-lg font-medium">{node.question}</p>}
      {node.options && (
        <div className="flex flex-col space-y-2">
          {node.options.map((opt, idx) => (
            <button
              key={idx}
              className="decision-btn"
              onClick={() => handleChoice(idx)}
            >
              <span>{opt}</span>
              <span className="arrow">←</span>
            </button>
          ))}
        </div>
      )}
      {node.result && <p className="mt-4 font-bold">{node.result}</p>}
    </div>
  );
}
