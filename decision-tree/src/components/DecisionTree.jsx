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
              className="px-4 py-2 rounded bg-green-600 text-white"
              onClick={() => handleChoice(idx)}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
      {node.result && <p className="mt-4 font-bold">{node.result}</p>}
    </div>
  );
}
